import { displayRecipes } from "./DisplayRecipes.js"
import { getItems } from "./getData.js";
import { goToTheDOM } from "./DisplayNaving.js";
// import {listIngredients} from "./searchingredients.js";
import { reqInputIngredient } from "./searchingredients.js"
import { reqInputAppareil } from "./searchappareils.js"
import { filterByUstensils } from "./index.js";
import { toggleIcon} from "./index.js";
import {displayToDoList} from "./index.js";


// Modification profonde.
let dataElement = ".card__header__naving__columnThree__header__modal__list"
let dataItem = "card__header__naving__columnThree__header__modal__list__button"
let dataInput = '';       // les lettres récupérés par le clavier.
let tableList = [];
let recipes = [];
let recipesForUstensils = [];


// récupération des données pour le traitement de la page.
const dataRecipes = await getItems ();
recipes = dataRecipes.items.recipes;

function executeClick (data) {
  displayToDoList(tableList, data)
  filterByUstensils(tableList);

const listContent = document.querySelectorAll (".card__header__todolist__content");
const listContentArray = [...listContent];
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
        element.remove(); // supprime le div avec l'identifiend 'id'
        tableList = tableList.filter(list => list !== nameSelected)
    }
   // disparution de la coloration jaunevau click des éléments ustensils
 
   const todoListModal = document.querySelectorAll ('.card__header__naving__columnThree__header__modal__list__button');
   const todoListModalArray = [...todoListModal];
   console.log(todoListModalArray.length);
   console.log(nameSelected );
   todoListModalArray.forEach (itemElt => {
       if(itemElt.innerHTML == nameSelected ){
           itemElt.classList.add('active');
       }
     })
     let todolistContent = document.querySelectorAll('.card__header__todolist__content')
    let todolistContentArray = [...todolistContent ];
     if(todolistContentArray.length  == 0 ){
        console.log("oui YANKEE");
           document.querySelector ('.card__all').innerHTML = '';
            displayRecipes(recipes);
            reqInputIngredient(recipes);
            reqInputAppareil(recipes);
            reqInputUstensil(recipes);
     }else{
        console.log("non YANKEE");
        console.log(data);
        console.log(tableList);
        filterByUstensils(tableList);
     }
    })
  });
});
}

// Mise en place de la fonctionnalité USTENSILS
const icon = document.querySelector ('.card__header__naving__columnThree__header__title');
const activeDisplay = document.querySelector ('.card__header__naving__columnThree__header__modal');
const iconup = document.querySelector ('.card__header__naving__columnThree__header__title__img');

icon.addEventListener ('click', function () {
  activeDisplay.classList.contains("active") ? activeDisplay.classList.remove("active")  : activeDisplay.classList.add("active");
  iconup.classList.toggle ('myicon');
})

export function reqInputUstensil(vCardData) {
    const valuehtml =`
    <div class='card__header__naving__columnThree__header__modal__input'>
        <input type='text' id='searchUstensils' class='card__header__naving__columnThree__header__modal__input__content'/>
        <span class='glyphicon glyphicon-search'> </span>
        <span id='ustensilRemove'class='glyphicon glyphicon-remove'> </span>
    </div>
    <div class='card__header__naving__columnThree__header__modal__list'>
    </div>`
        activeDisplay.innerHTML = valuehtml;
        factoryInput(vCardData); 

        const inputUstensils = document.getElementById ('searchUstensils');
        inputUstensils.addEventListener ('input', event => {
          dataInput = event.target.value.toLowerCase ();
          console.log ('dataInput', dataInput);
          if(dataInput){
          console.log ("insertion d'un élément dans la recherche(input) des ustensils");
          const activeHtml = document.getElementById('ustensilRemove');
          activeHtml.classList.contains("active") ? activeHtml.classList.add("active")  : activeHtml.classList.add("active");
          activeHtml.addEventListener('click', function() {
          console.log ("clique sur remove");
          document.getElementById('searchUstensils').value='';
          // activeHtml.classList.remove("active");
          filterByUstensils(tableList);
          })
          } 
          else{
            const activeHtml = document.getElementById('ustensilRemove').value='';
            activeHtml.classList.remove("active");
          }
        });


        const buttons = document.querySelectorAll (
        '.card__header__naving__columnThree__header__modal__list__button'
        );
        const buttonsArray = [...buttons];
        buttonsArray.forEach ((item) => {
        // item.setAttribute('id', "a"+`${index}`)
        item.addEventListener ('click', function () {
        executeClick (item);
        });
        });
        document.getElementById("searchUstensils").onkeyup=function(){
          if(event.keyCode == 8) {
            console.log("oui, c\'est le code 8");
            const todoListModal = document.querySelectorAll ('.card__header__naving__columnThree__header__modal__list__button');
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
    const todoListModal = document.querySelectorAll ('.card__header__naving__columnThree__header__modal__list__button');
    const todoListModalArray = [...todoListModal];
    todoListModalArray.forEach (itemElt => {
      tableList.forEach( itemTodolist => {
        if(itemElt.innerHTML == itemTodolist){
            itemElt.classList.add('active');
        }
      })
    })
 
    if (inputUstensils) {
      inputUstensils.addEventListener ('input', event => {
        let dataInput = event.target.value.toLowerCase ();
        console.log (dataInput);
        // "vCardIngredients " = liste de tous les ingredients qui matchent avec la selection de l'utilisateur.
        let vCardUstensils = [];
        // "myAllIngredients " = liste de tous les ingredients de toutes les recettes.
        let myallData = factoryInput (vCardData);
        let cardUstensils = document.querySelector (
          '.card__header__naving__columnThree__header__modal__list'
        );
        cardUstensils.innerHTML = '';
        myallData.forEach (dataUstensil => {
          let tableUstensils = '';
          tableUstensils = dataUstensil
  
          if (tableUstensils.toLowerCase ().includes (dataInput)) {
            vCardUstensils.push (dataUstensil);
          }
        });
        console.log (vCardUstensils);
        goToTheDOM (vCardUstensils, dataElement, dataItem);
        const buttons = document.querySelectorAll (
          '.card__header__naving__columnThree__header__modal__list__button'
        );
        const buttonsArray = [...buttons];
        buttonsArray.forEach ((item) => {
          item.addEventListener ('click', function () {
            executeClick (item);
          });
        });
      });
    }

};
reqInputUstensil(recipes);

// Céation de la liste des ustensils pour la création de la fonctionnalité :RECHERCHE.
export function  factoryInput(dataUstensils) {
    const allData = [];
    dataUstensils.forEach((dataItem) => {
        dataItem.ustensils.forEach((dataUstensils) => {
        let myData  = dataUstensils;
        let theData = myData .toLowerCase();
        if(allData.includes(theData)==false){
                allData.push(theData);
            }
        })
    })
    goToTheDOM(allData, dataElement, dataItem);
    return  allData;
}

