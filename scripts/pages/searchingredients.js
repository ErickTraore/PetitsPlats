import {displayRecipes} from './DisplayRecipes.js';
import {getItems} from './getData.js';
import {goToTheDOM} from './DisplayNaving.js';
import {filterByIngredient} from "./index.js"
let dataElement = '.card__header__naving__columnOne__header__modal__list';
let dataItem = 'card__header__naving__columnOne__header__modal__list__button';
let todoList = [];
console.log ('Voici mon point de départ');
let recipes = [];
let allIngredients;

// //-------1
// // récupération des données(toutes les recttes) pour le traitement de la page.

const dataRecipes = await getItems ();
recipes = dataRecipes.items.recipes;


function executeClick (data) { 
    console.log (data);

  if (todoList.includes (data.innerHTML) === false) {
    console.log ('click', data.innerHTML);
    todoList.push (data.innerHTML);
    filterByIngredient(todoList);
    data.classList.add ('active');
    // affichage de la todoList.
    const todoListHTML = document.querySelector ('.card__header__todolist');
    console.log (todoListHTML);
    todoListHTML.innerHTML = todoList
      .map (element => {
        return `<div class="card__header__todolist__content"> 
                         <div class="card__header__todolist__content__list"> ${element} </div>
                         <div class="card__header__todolist__content__delete"> x </div>
                   </div>`;
      })
      .join (' ');
      console.log(todoList);

  }

}
// Mise en place du click d'ouverture ou de fermeture de la modal "Ingredients", avec création de l'input et de ses enfants

const icon = document.querySelector ('.card__header__naving__columnOne__header__title');
const activeDisplay = document.querySelector ('.card__header__naving__columnOne__header__modal');
const iconup = document.querySelector ('.card__header__naving__columnOne__header__title__img');
icon.addEventListener ('click', function () {
  let allIngredients;
  activeDisplay.classList.contains("active") ? activeDisplay.classList.remove("active")  : activeDisplay.classList.add("active");
  iconup.classList.toggle ('myicon');
})
// //-------2
// // Mise en place de la fonctionnalité INGREDIENTS
export function reqInputIngredient (data) {
  let test = false;
  // Mise en place du click d'ouverture ou de fermeture de la modal "Ingredients", avec création de l'input et de ses enfants

  console.log(icon)
    const valuehtml = `
      <div class='card__header__naving__columnOne__header__modal__input'>
        <input type='text' id='searchIngredients' class='card__header__naving__columnOne__header__modal__input__content'/>
        <span class='glyphicon glyphicon-search'></span>
       </div>
       <div class='card__header__naving__columnOne__header__modal__list'>
       </div>`;
      activeDisplay.innerHTML = valuehtml;
      listIngredients (data);

      const inputIngredients = document.getElementById ('searchIngredients');
      inputIngredients.addEventListener ('input', event => {
        let dataInput = event.target.value.toLowerCase ();
        console.log (dataInput);
      });
      const buttons = document.querySelectorAll (
        '.card__header__naving__columnOne__header__modal__list__button'
      );
      const buttonsArray = [...buttons];

      buttonsArray.forEach (item => {
        item.addEventListener ('click', function () {
          //clickUptadeTableList(item);
          executeClick (item);
          // item.classList.add('active')
        });
      });
    // } else {
    //   console.log ('test non actif');
    //   activeDisplay.innerHTML = '';
    //   const todoList = document.querySelector ('.card__header__todolist');
    //   console.log (todoList);
    //   todoList.innerHTML = '';
    //   tableList = [];
    // }
    // tableList regroupe les ingredients sélectionné manuellement par l'utilisateur à partir de la liste générale des ingredients.
    // let tableList = [];
    // const inputIngredients = document.getElementById ('searchIngredients');
    if (inputIngredients) {
      inputIngredients.addEventListener ('input', event => {
        let dataInput = event.target.value.toLowerCase ();
        console.log (dataInput);

        // "vCardIngredients " = liste de tous les ingredients qui matchent avec la selection de l'utilisateur.
        let vCardIngredients = [];
        // "myAllIngredients " = liste de tous les ingredients de toutes les recettes.
        let myAllIngredients = listIngredients (data);

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
        goToTheDOM (vCardIngredients, dataElement, dataItem);
        // vCardIngredients = liste brute des ingrédients préselectionnés.
        // buttons(table) = liste brute des ingrédients préselectionnés automatiquement, introduit dans le html.
        // tableList = liste des ingrédients sélectionés manuellement par l'utilisateur.
        // const buttons = document.querySelectorAll (
        //   '.card__header__naving__columnOne__header__modal__list__button'
        // );
        // const buttonsArray = [...buttons];
        // buttonsArray.forEach (item => {
        //   console.log (item);
        //   item.addEventListener ('click', function () {
        //     executeClick (item);
        //   });
        // });
      });
    }
  //});
}

// ExécUtion de la fonctionnalité INGREDIENTS pour la totalité des recettes.
reqInputIngredient (recipes);

// // Céation de la liste des ingrediens pour la création de la fonctionnalité :RECHERCHE.
function listIngredients (data) {
  const allIngredients = [];
  data.forEach (dataItem => {
    console.log(dataItem);
    dataItem.ingredients.forEach (ingredient => {
      let myIngredient = ingredient.ingredient;
      let theIngredient = myIngredient.toLowerCase ();
      if (allIngredients.includes (theIngredient) == false) {
        allIngredients.push (theIngredient);
      }
    });
  });
//   // tableList = allIngredients;
console.log(allIngredients);
  goToTheDOM (allIngredients, dataElement, dataItem);
  return allIngredients;
}
