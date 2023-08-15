import { getItems } from "./index.js";

// récupération des données pour le traitement de la page.
const dataIngredients = await getItems();
const recipes = dataIngredients.items.recipes;
const allIngredients = [];
let test = false;


// Céation de la liste des ingrediens pour la création de la fonctionnalité :RECHERCHE.
function  listIngredients() {
recipes.forEach((data) => {
data.ingredients.forEach(ingredient =>{
    let myIngredient = ingredient.ingredient;
    let theIngredient = myIngredient.toLowerCase();
    if(allIngredients.includes(theIngredient)==false){
        allIngredients.push(theIngredient);
    }
})
})

// hydratation de la vue avec les éléments de la liste des ingredients.
// const navingSection = document.querySelector(".card__header__naving__columnOne__header__modal__list__ul");
const navingSection = document.querySelector(".card__header__naving__columnOne__header__modal__list__ul");
allIngredients.forEach((element) => {
    const navingModel = navingFactory(element);
    const makeNavingDOM = navingModel.makeNavingDOM();
    navingSection.appendChild(makeNavingDOM);
});
}

// Mise en place du click d'ouverture ou de fermeture de la modal: Ingredients.
const icon = document.querySelector(".card__header__naving__columnOne__header__title");
icon.addEventListener('click', function() {
    test = !test;

    const iconup = document.querySelector(".card__header__naving__columnOne__header__title__img");
    iconup.classList.toggle("myicon");
    
    const activeDisplay = document.querySelector(".card__header__naving__columnOne__header__content");
    const valuehtml ="<div class='card__header__naving__columnOne__header__modal__input'><input type='text' id='searchIngredients' class='card__header__naving__columnOne__header__modal__input'/><span class='glyphicon glyphicon-search'></span></div><div class='card__header__naving__columnOne__header__modal__list'><ul class='card__header__naving__columnOne__header__modal__list__ul' id='myUL'></ul></div>"

    console.log(test);
    if(test){
        console.log(allIngredients);
        console.log("Je suis un yankee true");
        activeDisplay.innerHTML = valuehtml;
        listIngredients(); 

        const inputSearch = document.getElementById('searchIngredients');
        inputSearch.addEventListener ('input', event => {
            // let dataInput = event.target.value.toLowerCase ();
            // console.log (dataInput);
            // console.log(allIngredients);

            var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById("searchIngredients");
            console.log(input);
            filter = input.value.toUpperCase();
            ul = document.getElementById("myUL");
            li = ul.getElementsByTagName("li");
            for (i = 0; i < li.length; i++) {
                a = li[i].getElementsByTagName("a")[0];
                txtValue = a.textContent || a.innerText;
                if (txtValue.toUpperCase().indexOf(filter) > -1) {
                    li[i].style.display = "";
                } else {
                    li[i].style.display = "none";
                }
            }

        })
    }
    else{
        console.log("Je suis un yankee false");
        activeDisplay.innerHTML = '';


    }


});