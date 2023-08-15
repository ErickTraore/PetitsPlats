import { getItems } from "./index.js";

// récupération des données pour le traitement de la page.
const dataIngredients = await getItems();
const recipes = dataIngredients.items.recipes;
const AllAppareils = [];
let test = false;


// Céation de la liste des appareils pour la création de la fonctionnalité :RECHERCHE.
function  listAppareils() {
recipes.forEach((data) => {
    let myAppliance = data.appliance;
    let theAppliance = myAppliance.toLowerCase();
    console.log(theAppliance);

    if(AllAppareils.includes(theAppliance)==false){
        AllAppareils.push(theAppliance);
    }
})
}

function  goToTheDOM() {

// hydratation de la vue avec les éléments de la liste des appareils.
const navingSection = document.querySelector(".card__header__naving__columnTwo__header__modal__list__ul");
AllAppareils.forEach((element) => {
    const navingModel = navingFactory(element);
    const makeNavingDOM = navingModel.makeNavingDOM();
    navingSection.appendChild(makeNavingDOM);
});
}

// Mise en place du click d'ouverture ou de fermeture de la modal: Appareils.
const icon = document.querySelector(".card__header__naving__columnTwo__header__title");
icon.addEventListener('click', function() {
    test = !test;

    const iconup = document.querySelector(".card__header__naving__columnTwo__header__title__img");
    iconup.classList.toggle("myicon");
    
    const activeDisplay = document.querySelector(".card__header__naving__columnTwo__header__content");
    const valuehtml ="<div class='card__header__naving__columnTwo__header__modal__input'><input type='text' id='searchAppareils' class='card__header__naving__columnTwo__header__modal__input'/><span class='glyphicon glyphicon-search'></span></div><div class='card__header__naving__columnTwo__header__modal__list'><ul class='card__header__naving__columnTwo__header__modal__list__ul' id='myUL'></ul></div>"

    console.log(test);
    if(test) {
        console.log("Je suis un yankee true");
        activeDisplay.innerHTML = valuehtml;
        listAppareils(); 
        // console.log(AllAppareils);
        goToTheDOM();
         const inputSearch = document.getElementById('searchAppareils');
        inputSearch.addEventListener ('input', event => {
            // let dataInput = event.target.value.toLowerCase ();
            // console.log (dataInput);
            // console.log(allIngredients);

            var input, filter, ul, li, a, i, txtValue;
            input = document.getElementById("searchAppareils");
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
    else { 
        console.log("Je suis un yankee false");
        activeDisplay.innerHTML = '';
    }


});

