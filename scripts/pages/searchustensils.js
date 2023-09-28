import { displayRecipes } from "./DisplayRecipes.js"
import { getItems } from "./getData.js";
import { goToTheDOM } from "./DisplayNaving.js";
let dataElement = ".card__header__naving__columnThree__header__modal__list"
let dataItem = "card__header__naving__columnThree__header__modal__list__button"
let tableList = [];
let recipes = [];

// récupération des données pour le traitement de la page.
const dataRecipes = await getItems ();
recipes = dataRecipes.items.recipes;

function displayUstensils(data1, data2){
    let recipesWithUstensils = [];
    data2.forEach(recipe => {
        if (data1.every(element => recipe.ustensils.includes(element))) {
           recipesWithUstensils.push(recipe);
        }
    })
    document.querySelector ('.card__all').innerHTML = '';
    displayRecipes(recipesWithUstensils);               
    }



function executeClick (data) {
    function removeItemTableList(dataIndex){
       tableList.splice(dataIndex, 1);
    }
    if (tableList.includes (data.innerHTML) === false) {
      console.log ('click', data.innerHTML);
      tableList.push (data.innerHTML);
      console.log (data);
      data.classList.add ('active');
      const todoList = document.querySelector ('.card__header__todolist');
      console.log (todoList);
      todoList.innerHTML  = tableList
      .map (element => {
        return `<div class="card__header__todolist__content"> 
                     <div class="card__header__todolist__content__list"> ${element} </div>
                     <button class="card__header__todolist__content__delete" data-name="${element}"> x </button>
               </div>`;
      })
      .join (' ');

      displayUstensils(tableList, recipes);

    }


    const listContent = document.querySelectorAll (".card__header__todolist__content");
    const listContentArray = [...listContent];
    // 01 => btns = élement sélectionné par l'utilisateur
    const btns = document.querySelectorAll (".card__header__todolist__content__delete");
    const btnsArray = [...btns];
    btnsArray.forEach ((item, index) => {    //1ére boucle pour énumérer les élements choisis afin de repérer celui qui sera clicqué.
      item.addEventListener ('click', function () {
        let dataDelete = `${index}`;
        console.log(item);
        console.log(item.dataset.name);
        let nameSelected = item.dataset.name
        listContentArray.forEach((list,  index) => { //Boucle pour trouver l'élement à effacer.
            list.setAttribute('id', `${index}` )
            if(`${index}` === dataDelete ){
            const element = document.getElementById(`${index}`); // Il s'agit de l'id des élements sélectionnés par l'utilisateur.
            console.log(element);
            console.log(element.childNodes[1].innerHTML);
            let itemDelete = element.childNodes[1].innerHTML; // élement déjà effacer
            console.log(('itemDelete'), itemDelete);
            element.remove(); // supprime le div avec l'identifiant 'id'
            removeItemTableList(`${index}`)
            const buttons = document.querySelectorAll (  // on doit rechercher itemDelete dans la liste générale des ustensils.
                '.card__header__naving__columnThree__header__modal__list__button'
                );
                const buttonsArray = [...buttons];  // Liste des ustensils proposés.
                buttonsArray.forEach ((item) => {
                   if(nameSelected == item.innerHTML){
                    console.log("Bravo");
                    item.classList.remove('active')
                   }
                    else{
                    console.log("Pas de Bravo");
                    }
                })
            }
            else{
                console.log("Bravo cas non gérable");
            }
        })
      });
    });
  }
  displayUstensils(recipes, tableList);




// Mise en place de la fonctionnalité USTENSILS
export function reqInputUstensil(data) {
    let test = false;

// Mise en place du click d'ouverture ou de fermeture de la modal: Ustensils.
const icon = document.querySelector(".card__header__naving__columnThree__header__title");
icon.addEventListener('click', function() {
    test = !test;
    const iconup = document.querySelector(".card__header__naving__columnThree__header__title__img");
    iconup.classList.toggle("myicon");
    
    const activeDisplay = document.querySelector(".card__header__naving__columnThree__header__modal");
    const valuehtml =`
    <div class='card__header__naving__columnThree__header__modal__input'>
        <input type='text' id='searchUstensils' class='card__header__naving__columnThree__header__modal__input__content'/>
        <span class='glyphicon glyphicon-search'>
        </span>
    </div>
    <div class='card__header__naving__columnThree__header__modal__list'>
    </div>`

    if(test) {
        console.log("Ouverture de la modale");
        activeDisplay.innerHTML = valuehtml;
        listUstensils(data); 
      
        const inputUstensils = document.getElementById ('searchUstensils');
        inputUstensils.addEventListener ('input', event => {
        let dataInput = event.target.value.toLowerCase ();
        console.log ('dataInput', dataInput);
        });
        const buttons = document.querySelectorAll (
        '.card__header__naving__columnThree__header__modal__list__button'
        );
        const buttonsArray = [...buttons];
        buttonsArray.forEach ((item, index) => {
        item.setAttribute('id', "a"+`${index}`)
        item.addEventListener ('click', function () {
        executeClick (item);
        });
        });
        console.log(buttons);

    } else {
        console.log ('test non actif');
        activeDisplay.innerHTML = '';
        const todoList = document.querySelector ('.card__header__todolist');
        console.log (todoList);
        todoList.innerHTML = "";
        tableList = [];
    }

        // tableList regroupe les ingredients sélectionné manuellement par l'utilisateur à partir de la liste générale des ingredients.
        const inputUstensils = document.getElementById('searchUstensils');
    if(inputUstensils){
        inputUstensils.addEventListener('input', (event) => {
        let dataInput = event.target.value.toLowerCase();
        console.log(dataInput);
        let vCardUstensils = [];
        let myAllUstensils = listUstensils(data);
        console.log(myAllUstensils);
        let cardUstensils = document.querySelector('.card__header__naving__columnThree__header__modal__list')
        cardUstensils.innerHTML = "";
        myAllUstensils.forEach((dataUstensil => { 
        let tableUstensils = "";
        tableUstensils = dataUstensil;
        console.log(tableUstensils);
        console.log(tableList);

    if( tableUstensils.toLowerCase().includes(dataInput)) {
        vCardUstensils.push(dataUstensil); 
        console.log("item identique");
    }
}));
        console.log(vCardUstensils);
        goToTheDOM(vCardUstensils, dataElement, dataItem);
        // vCardIngredients = liste brute des ingrédients préselectionnés.
        // buttons(table) = liste brute des ingrédients préselectionnés automatiquement, introduit dans le html.
        // tableList = liste des ingrédients sélectionés manuellement par l'utilisateur.
        const buttons = document.querySelectorAll ('.card__header__naving__columnThree__header__modal__list__button' );
        const buttonsArray = [...buttons];
    buttonsArray.forEach (item => {
    item.addEventListener ('click', function () {
        executeClick (item);
    });
    });
    })
}
});
}


reqInputUstensil(recipes);

// Céation de la liste des ustensils pour la création de la fonctionnalité :RECHERCHE.
function  listUstensils(data) {
    const AllUstensils = [];
    data.forEach((dataItem) => {
        dataItem.ustensils.forEach((dataUstensils) => {
        let myUstensils = dataUstensils;
        let theUstensils = myUstensils.toLowerCase();
        if(AllUstensils.includes(theUstensils)==false){
                AllUstensils.push(theUstensils);
            }
        console.log(theUstensils);
        })
    })
    goToTheDOM(AllUstensils, dataElement, dataItem);
    return  AllUstensils;
}
