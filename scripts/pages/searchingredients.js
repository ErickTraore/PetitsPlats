import {displayRecipes} from './DisplayRecipes.js';
import {getItems} from './getData.js';
import {goToTheDOM} from './DisplayNaving.js';
import {filterByIngredient} from "./index.js"
let dataElement = '.card__header__naving__columnOne__header__modal__list';
let dataItem = 'card__header__naving__columnOne__header__modal__list__button';

let tableList = [];
let recipes = [];

// récupération des données(toutes les recttes) pour le traitement de la page.
// tableList = tableList.filter(list => list !== nameSelected)

const dataRecipes = await getItems ();
recipes = dataRecipes.items.recipes;

function executeClick (data) { 
 

  if (tableList.includes (data.innerHTML) === false) {
    tableList.push (data.innerHTML);
   
    // affichage de la tableList.
    const todoListHTML = document.querySelector ('.card__header__todolist');
    console.log (todoListHTML);
    todoListHTML.innerHTML = tableList
      .map (element => {
        return `<div class="card__header__todolist__content"> 
                         <div class="card__header__todolist__content__list"> ${element} </div>
                         <div class="card__header__todolist__content__delete" data-name="${element}"> x </div>
                   </div>`;
      })
      .join (' ');
      filterByIngredient(tableList);
    }

    const listContent = document.querySelectorAll (".card__header__todolist__content");
    const listContentArray = [...listContent];
    // 01 => btns = élement sélectionné par l'utilisateur
    const btns = document.querySelectorAll (".card__header__todolist__content__delete");
    const btnsArray = [...btns];
    btnsArray.forEach ((item, index) => {    //1ére boucle pour énumérer les élements choisis afin de repérer celui qui sera clicqué.
      item.addEventListener ('click', function (event) {
        let dataDelete = `${index}`;
        console.log(item);
        let nameSelected = item.dataset.name
        listContentArray.forEach((list,  index) => { //Boucle pour trouver l'élement à effacer.
            list.setAttribute('id', `${index}` )
            if(`${index}` === dataDelete ){
            const element = document.getElementById(`${index}`); // Il s'agit de l'id des élements sélectionnés par l'utilisateur.
            element.remove(); // supprime le div avec l'identifiant 'id'
            console.log(tableList);
        tableList = tableList.filter(list => list !== nameSelected)
            const buttons = document.querySelectorAll (  // on doit rechercher itemDelete dans la liste générale des ingredients.
                '.card__header__naving__columnOne__header__modal__list__button'
                );
                const buttonsArray = [...buttons];  // Liste des ingredients proposés.
                buttonsArray.forEach ((item) => {
                   if(nameSelected == item.innerHTML){
                    console.log("Bravo");
                    item.classList.remove('active')
                   }
                })
            }
        
  filterByIngredient(tableList);

        })
      });
    });
}
// Mise en place du click d'ouverture ou de fermeture de la modal "Ingredients", avec création de l'input et de ses enfants

const icon = document.querySelector ('.card__header__naving__columnOne__header__title');
const activeDisplay = document.querySelector ('.card__header__naving__columnOne__header__modal');
const iconup = document.querySelector ('.card__header__naving__columnOne__header__title__img');
icon.addEventListener ('click', function () {
  activeDisplay.classList.contains("active") ? activeDisplay.classList.remove("active")  : activeDisplay.classList.add("active");
  iconup.classList.toggle ('myicon');

})
// // Mise en place de la fonctionnalité INGREDIENTS
export function reqInputIngredient (vCardData) {
  // Mise en place du click d'ouverture ou de fermeture de la modal "Ingredients", avec création de l'input et de ses enfants
  const valuehtml = `
    <div class='card__header__naving__columnOne__header__modal__input'>
      <input type='text' id='searchIngredients' class='card__header__naving__columnOne__header__modal__input__content'/>
      <span class='glyphicon glyphicon-search'></span>
      </div>
      <div class='card__header__naving__columnOne__header__modal__list'>
      </div>`;
    activeDisplay.innerHTML = valuehtml;
    listIngredients (vCardData);
    const inputIngredients = document.getElementById ('searchIngredients');
    inputIngredients.addEventListener ('input', event => {
      let dataInput = event.target.value.toLowerCase ();
      console.log (dataInput);
    });
    const buttons = document.querySelectorAll (
      '.card__header__naving__columnOne__header__modal__list__button'
    );
    const buttonsArray = [...buttons];
    buttonsArray.forEach ((item) => {
      item.addEventListener ('click', function () {
        executeClick (item);
      });
    });
    const todoListModal = document.querySelectorAll ('.card__header__naving__columnOne__header__modal__list__button');
    const todoListModalArray = [...todoListModal];
    console.log(tableList);
    todoListModalArray.forEach (itemElt => {
      tableList.forEach( itemTodolist => {
        if(itemElt.innerHTML == itemTodolist){
            itemElt.classList.add('active');
        }
      })
    })
  if (inputIngredients) {
    inputIngredients.addEventListener ('input', event => {
      let dataInput = event.target.value.toLowerCase ();
      console.log (dataInput);

      // "vCardIngredients " = liste de tous les ingredients qui matchent avec la selection de l'utilisateur.
      let vCardIngredients = [];
      // "myAllIngredients " = liste de tous les ingredients de toutes les recettes.
      let myAllIngredients = listIngredients (vCardData);

      let cardIngredients = document.querySelector (
        '.card__header__naving__columnOne__header__modal__list'
      );
      cardIngredients.innerHTML = '';
      myAllIngredients.forEach (dataIngredient => {
        let tableIngredients = '';
        tableIngredients = dataIngredient;

        if (tableIngredients.toLowerCase ().includes (dataInput)) {
          vCardIngredients.push (dataIngredient);
        }
      });
      console.log (vCardIngredients);
      // reqInputIngredient (vCardIngredients)

      goToTheDOM (vCardIngredients, dataElement, dataItem);
      const inputIngredients = document.getElementById ('searchIngredients');
      inputIngredients.addEventListener ('input', event => {
        let dataInput = event.target.value.toLowerCase ();
        console.log (dataInput);
      });
      const buttons = document.querySelectorAll (
        '.card__header__naving__columnOne__header__modal__list__button'
      );
      const buttonsArray = [...buttons];
      buttonsArray.forEach ((item) => {
        item.addEventListener ('click', function () {
          executeClick (item);
        });
      });
    });
  }
}

// ExécUtion de la fonctionnalité INGREDIENTS pour la totalité des recettes.
reqInputIngredient (recipes);

// // Céation de la liste des ingrediens pour la création de la fonctionnalité :RECHERCHE.
export function listIngredients (data) {
  console.log(data);

  const allIngredients = [];
  data.forEach (dataItem => {
    dataItem.ingredients.forEach (ingredient => {
      let myIngredient = ingredient.ingredient;
      let theIngredient = myIngredient.toLowerCase ();
      if (allIngredients.includes (theIngredient) == false) {
        allIngredients.push (theIngredient);
      }
    });
  });
  // tableList = allIngredients;
console.log(allIngredients);
  goToTheDOM (allIngredients, dataElement, dataItem);
  return allIngredients;
}
