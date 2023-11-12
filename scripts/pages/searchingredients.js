import {displayRecipes} from './DisplayRecipes.js';
import {getItems} from './getData.js';
import {goToTheDOM} from './DisplayNaving.js';
import {filterByIngredient} from "./index.js";
import {toggleIcon} from "./index.js";
import {displayToDoList} from "./index.js";

let dataElement = '.card__header__naving__columnOne__header__modal__list';
let dataItem = 'card__header__naving__columnOne__header__modal__list__button';
let tableList = [];       // La liste des mots choisie par le client.
let recipes = [];         // L'extraction de toutes les recettes dans la base de donnée.

// récupération des données(toutes les recettes) pour le traitement de la page.
const dataRecipes = await getItems ();
recipes = dataRecipes.items.recipes;

// Mise en place du click d'ouverture ou de fermeture de la modal "Ingredients", avec création de l'input et de ses enfants


toggleIcon();
function executeClick (data) { 
  console.log(data);
    displayToDoList(tableList, data)
    filterByIngredient(tableList);

  const listContent = document.querySelectorAll (".card__header__todolist__content");
  const listContentArray = [...listContent];
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
          console.log(tableList);
          filterByIngredient(tableList);
      })
      });
    });
}

// // Mise en place de la fonctionnalité INGREDIENTS
export function reqInputIngredient (vCardData) {
  let dataInput = '';       // les lettres récupérés par le clavier.
const activeDisplay = document.querySelector ('.card__header__naving__columnOne__header__modal');

  // Mise en place du click d'ouverture ou de fermeture de la modal "Ingredients", avec création de l'input et de ses enfants
  const valuehtml = `
    <div class='card__header__naving__columnOne__header__modal__input'>
      <input type='text' id='searchIngredients' class='card__header__naving__columnOne__header__modal__input__content'/>
      <span class='glyphicon glyphicon-search'></span>
      <span class='glyphicon glyphicon-remove'></span>
    </div>
    <div class='card__header__naving__columnOne__header__modal__list'>
    </div>`;
    activeDisplay.innerHTML = valuehtml;
    factoryInput (vCardData);


    const inputIngredients = document.getElementById ('searchIngredients');
    inputIngredients.addEventListener ('input', event => {
      dataInput = event.target.value.toLowerCase ();
      console.log ('dataInput', dataInput);
      if(dataInput){
      console.log ("insertion d'un élément dans la recherche(input) de l'ingredient");
      const activeHtml = document.querySelector ('.glyphicon-remove');
      activeHtml.classList.contains("active") ? activeHtml.classList.add("active")  : activeHtml.classList.add("active");
      activeHtml.addEventListener('click', function() {
      console.log ("clique sur remove");
      document.getElementById('searchIngredients').value='';
      // activeHtml.classList.remove("active");
      filterByIngredient(tableList);
      })
      } 
      else{
        const activeHtml = document.querySelector ('.glyphicon-remove');
        activeHtml.classList.remove("active");
      }
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
  document.getElementById("searchIngredients").onkeyup=function(){
    if(event.keyCode == 8) {
      console.log("oui, c\'est le code 8");
      const todoListModal = document.querySelectorAll ('.card__header__naving__columnOne__header__modal__list__button');
      const todoListModalArray = [...todoListModal];
      console.log('tableList',tableList);
      console.log('todoListModalArray', todoListModalArray);
      todoListModalArray.forEach (itemElt => {
        if(tableList.length > 0){
          tableList.forEach( itemTodolist => {
          if(itemElt.innerHTML == itemTodolist){
              itemElt.classList.add('active');
          }
          })
        }else{
          tableList.forEach( itemTodolist => {
            if(itemElt.innerHTML == itemTodolist){
                itemElt.classList.add('active');

            }
            })
          
        }
      })
    }
  }
///////////////////////////////////////////////////////////////////
    // Mise en place de la coloration jaunevau click des éléments ustensils

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
      // "myAllData " = liste de tous les ingredients de toutes les recettes.
      let myAllData = factoryInput (vCardData);
      let cardIngredients = document.querySelector (
        '.card__header__naving__columnOne__header__modal__list'
      );
      cardIngredients.innerHTML = '';
      myAllData.forEach (dataIngredient => {
        let tableIngredients = '';
        tableIngredients = dataIngredient;

        if (tableIngredients.toLowerCase ().includes (dataInput)) {
          vCardIngredients.push (dataIngredient);
        }
      });
      console.log (vCardIngredients);
      goToTheDOM (vCardIngredients, dataElement, dataItem);
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
export function factoryInput (dataIngredients) {
  const allData = [];
  
  dataIngredients.forEach (dataItem => {
    dataItem.ingredients.forEach (ingredient => {
      let myData = ingredient.ingredient;
      let theData = myData.toLowerCase ();
      if (allData.includes (theData) == false) {
        allData.push (theData);
      }
    });
  });
  goToTheDOM (allData, dataElement, dataItem);
  return allData;
}
