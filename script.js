//ПЛАВНАЯ ПРОКРУТКА СТРАНИЦЫ
const btnMain = document.getElementById("btnMain"),
    main = document.getElementById("main"),
    btnSkills = document.getElementById("btnSkills"),
    skills = document.getElementById("skills"),
    btnExp = document.getElementById("btnExp"),
    exp = document.getElementById("exp"),
    btnEducation = document.getElementById("btnEducation"),
    education = document.getElementById("education"),
    btnPortfolio = document.getElementById("btnPortfolio"),
    portfolio = document.getElementById("portfolio"),
    btnContacts = document.getElementById("btnContacts"),
    contacts = document.getElementById("contacts"),
    btnsContainer = document.getElementById("btns");
function scroll(elem) {
    elem.scrollIntoView({block: "center", behavior: "smooth"});
}
btnsContainer.addEventListener('click', (event) => {
    const target = event.target;
    if (target === btnMain) {
        scroll(main);
    } else if (target === btnSkills) {
        scroll(skills) ;
    } else if (target === btnExp) {
        scroll(exp);
    } else if (target === btnEducation) {
        scroll(education);
    } else if (target === btnPortfolio) {
        scroll(portfolio);
    } else if (target === btnContacts) {
        scroll(contacts);
    }
})

//____________________________________________________________________________
//СУЖЕНИЕ МЕНЮ
window.addEventListener('resize', (e) => {
    const menu = document.querySelector("menu");
    let hello = document.getElementById("hello");
    let width = menu.offsetWidth;
    // console.log(width);
    if (width < 1030) {
        hello.style.display = "none";
        // console.log('smaller');
    } else {
        hello.style.display = "block";
        // console.log('bigger');
    }
})

