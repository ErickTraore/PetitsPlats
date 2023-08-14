import { getItems } from "./index.js";

// récupération des données pour le traitement de la page.
const dataIngredients = await getItems();
const recipes = dataIngredients.items.recipes;
const AllUstensils = [];
let test = false;


// Céation de la liste des ustensils pour la création de la fonctionnalité :RECHERCHE.
function  listUstensils() {
recipes.forEach((data) => {
    data.ustensils.forEach((dataUstensils) => {
    let myUstensils = dataUstensils;
    let theUstensils = myUstensils.toLowerCase();
    if(AllUstensils.includes(theUstensils)==false){
            AllUstensils.push(theUstensils);
        }
    console.log(theUstensils);

    })

   
})
}

function  goToTheDOM() {

// hydratation de la vue avec les éléments de la liste des ustensils.
const navingSection = document.querySelector(".card__header__naving__columnThree__header__modal__list");
AllUstensils.forEach((element) => {
    const navingModel = navingFactory(element);
    const makeNavingDOM = navingModel.makeNavingDOM();
    navingSection.appendChild(makeNavingDOM);
});
}

// Mise en place du click d'ouverture ou de fermeture de la modal: Ustensils.
const icon = document.querySelector(".card__header__naving__columnThree__header__title");
icon.addEventListener('click', function() {
    test = !test;

    const iconup = document.querySelector(".card__header__naving__columnThree__header__title__img");
    iconup.classList.toggle("myicon");
    
    const activeDisplay = document.querySelector(".card__header__naving__columnThree__header__content");
    const valuehtml ="<div class='card__header__naving__columnThree__header__modal__input'><input type='text' class='card__header__naving__columnThree__header__modal__input'/><span class='glyphicon glyphicon-search'></span></div><div class='card__header__naving__columnThree__header__modal__list'></div>"

    console.log(test);
    if(test) {
        console.log("Je suis un yankee true");
        activeDisplay.innerHTML = valuehtml;
        listUstensils(); 
        console.log(AllUstensils);
        goToTheDOM();
    }
    else { 
        console.log("Je suis un yankee false");
        activeDisplay.innerHTML = '';
    }


});

