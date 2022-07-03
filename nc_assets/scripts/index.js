/**
 * Global Variables
 */
const 
    props =  getComputedStyle(document.documentElement),
    cities = document.querySelector("#cities"),
    btnSection = document.querySelector(".btns"),
    buttons = document.querySelectorAll(".btn"),
    body = document.querySelector("#menu"),
    header = document.querySelector("#header"),
    backButton = document.querySelector("#back");
/////////////////////////////////////////////////////
let 
    buttonSlide = props.getPropertyValue('--buttons-slide'),
    pageFade = props.getPropertyValue('--page-fade'),
    targetFade = props.getPropertyValue('--target-fade'),
    siblingsFade = props.getPropertyValue('--siblings-fade'),
    backButtonSlide = props.getPropertyValue('--back-btn-slide'),
    animationDuration = siblingsFade + buttonSlide;


const selectCity = () => {
    
    let titles = [
        "Single Chicken Meals",
        "Family Chicken Meals",
        "Chicken Sandwich 1",
        "Chicken Sandwich 2",
        "Beff Sandwich 1",
        "Beff Sandwich 2",
        "Wings Sandwich",
        "Kids Meals",
        "Wings Boxes 1",
        "Wings Boxes 2",
        "Appetizers",
        "Salads & Sauces",
        "Drinks & Desserts",
        "Wings Torta"
    ]

    window.addEventListener("load", () => {

        buttons.forEach((button)=>{
            button.addEventListener("click",showMenu);
        })
    })

    /**
     * 
     * @param {*} e 
     */
    const showMenu = (e)=>{
        let id = e.target.id;
        let target = e.target;
        let page = document.getElementById(`${id}_B`);

        if(page != null){

            let selected = document.querySelector(".selected");
            if(selected != null){
                if(selected.id != `${id}_B`){
                    selected.classList.remove("selected");
                }
            }
            page.classList.add("selected");
                
        }else{

            let selected = document.querySelector(".selected");
            if(selected != null){
                let str = `:not([id="${target.id}_B"])`
                let sibling = body.querySelector(str);
                sibling.classList.remove("selected");
            }

            let container = document.createElement("div");
            container.setAttribute("id", `${id}_B`);
            container.classList.add("image");

            setTimeout(()=>{
                container.classList.add("selected");
            }, animationDuration)

            
            let nav = document.createElement("nav");
            setTimeout(()=>{
                nav.classList.add("slideUp");
            }, animationDuration)

            let scrollmenu = document.createElement("div");
            scrollmenu.setAttribute("id", "scrollmenu");
            scrollmenu.setAttribute("class", "scrollmenu");
            

            for(let i=1;i<15;i++){

                let img = document.createElement("img");
                img.setAttribute("id", `${id}_${i}`);
                img.setAttribute("src", `/nc_assets/images/${id}/${i < 10 ? "0"+i : i}.jpg`);
                img.setAttribute("alt", `${titles[i-1]}`);
                container.appendChild(img);
                
                let a = document.createElement("a");
                a.setAttribute("href", `#${id}_${i}`);
                a.setAttribute("rel", "tag");
                a.setAttribute("target", "_self");
                a.innerText = titles[i-1];
                scrollmenu.appendChild(a);
                
            }

            
            nav.appendChild(scrollmenu);
            

            body.appendChild(container);
            
            body.appendChild(nav);

            
            if (typeof body.scrollIntoView == 'function') { 
                smoothScroll();
            }
            
        }
        
        showPage(target);
        

    }
}
//////////* USED FUNCTIONS */
const showPage = (target) => {

    let str = `.btn:not([id="${target.id}"])`;
    let tgt = cities.querySelector("#"+target.id);
    let sibling = cities.querySelector(str);
    
    let nav = body.querySelector(`#${target.id}_B + nav`);

    setTimeout(()=>{
        nav.classList.add("slideUp");
    }, animationDuration)

    tgt.classList.remove("targetIn");
    tgt.classList.add("targetOut");
    
    sibling.classList.remove("siblingIn");
    sibling.classList.add("siblingOut");

    btnSection.classList.remove("slideIn");
    btnSection.classList.add("slideOut");
    cities.classList.add("shrink");

    backButton.classList.remove("slideOut");
    backButton.classList.add("slideIn");
    header.classList.add("shrink");
    
    body.classList.remove("hide");
    body.classList.add("show");
} 

const smoothScroll = () => {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            
            let id = this.getAttribute('href').split("#")[1];
            document.getElementById(id).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });
}

/////////////////////////////////////////////////


/**
 * 
 */
const resetSelection = () => {

    window.addEventListener("load", () => {
        backButton.addEventListener("click",hideMenu);        
    })

    const hideMenu = (e)=>{

        hidePage();

        setTimeout( ()=>{
            let selected = document.querySelector(".selected");
            selected.classList.remove("selected");
        }, pageFade)

    }

}
//////////* USED FUNCTIONS */
const hidePage = () => {

    let selected = document.querySelector(".selected");
    let id = selected.id.split("_")[0];
    let target = document.getElementById(id);

    let str = `.btn:not([id="${target.id}"])`;
    let sibling = cities.querySelector(str);

    let nav = body.querySelector(".slideUp");

    nav.classList.remove("slideUp");

    target.classList.remove("targetOut");
    target.classList.add("targetIn");
    
    sibling.classList.remove("siblingOut");
    sibling.classList.add("siblingIn");

    btnSection.classList.remove("slideOut");
    btnSection.classList.add("slideIn");
    cities.classList.remove("shrink");

    backButton.classList.remove("slideIn");
    backButton.classList.add("slideOut");
    header.classList.remove("shrink");

    setTimeout( ()=>{
        body.classList.remove("show");
        body.classList.add("hide");
    }, targetFade + buttonSlide)

    setTimeout( ()=>{
        target.classList.remove("targetIn");
        sibling.classList.remove("siblingIn");
    }, targetFade + pageFade + buttonSlide)

}
/////////////////////////////


/**
 * Main Function
 * @param  {...any} Funcs 
 */
 const Main = (...Funcs) =>{
    Funcs.forEach(Func=>{
        Func();
    })
}

Main(selectCity, resetSelection);

