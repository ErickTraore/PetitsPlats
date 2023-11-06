import { displayRecipes } from "./DisplayRecipes.js"
import { getItems } from "./getData.js";
import { goToTheDOM } from "./DisplayNaving.js";
import {listIngredients} from "./searchingredients.js";
import {listUstensils} from "./searchustensils.js";
import { reqInputIngredient } from "./searchingredients.js"
import { reqInputUstensil } from "./searchustensils.js"
// Modification profonde.
let dataElement = ".card__header__naving__columnTwo__header__modal__list"
let dataItem = "card__header__naving__columnTwo__header__modal__list__button"
let tableList = [];
let recipes = [];

// récupération des données(toutes les recttes)  pour le traitement de la page.
const dataRecipes = await getItems ();
recipes = dataRecipes.items.recipes;

function executeClick (data) {
  if (tableList.includes (data.innerHTML) === false) {
      tableList.push (data.innerHTML);
      data.classList.add ('active');
      // affichage de la tableList.
      const todoList = document.querySelector ('.card__header__todolist');
      console.log (todoList);
      todoList.innerHTML = tableList
      
      .map (element => {
        return `<div class="card__header__todolist__content"> 
                     <div class="card__header__todolist__content__list"> ${element} </div>
                     <div class="card__header__todolist__content__delete" data-name="${element}"> x </div>
               </div>`;
      })
      .join (' ');
      console.log (tableList);

      let recipesWithAppareils = displayAppareils(tableList, recipes);
      console.log(recipesWithAppareils);
      let cardIngredients = document.querySelector (
        '.card__header__naving__columnOne__header__modal__list'
      );
      cardIngredients.innerHTML = '';
      let cardUstensils = document.querySelector('.card__header__naving__columnThree__header__modal__list')
      cardUstensils.innerHTML = "";
      let cardAppareils = document.querySelector('.card__header__naving__columnTwo__header__modal__list');
      console.log(cardAppareils);

      cardAppareils.innerHTML = "";

      if(recipesWithAppareils !== null ){
        reqInputIngredient (recipesWithAppareils);
        listUstensils (recipesWithAppareils);
        reqInputAppareil (recipesWithAppareils);
        // reqInputIngredient(recipesWithAppareils);

      };
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
            tableList = tableList.filter(list => list !== nameSelected)
            const buttons = document.querySelectorAll (  // on doit rechercher itemDelete dans la liste générale des ustensils.
                '.card__header__naving__columnTwo__header__modal__list__button'
                );
                const buttonsArray = [...buttons];  // Liste des ustensils proposés.
                buttonsArray.forEach ((item) => {
                   if(nameSelected == item.innerHTML){
                    console.log("Bravo");
                    item.classList.remove('active')
                    console.log(tableList);   
                    if(tableList.length == 0){
                      displayRecipes(recipes);
                      reqInputIngredient(recipes);
                      reqInputAppareil(recipes);
                      reqInputUstensil(recipes);
                    } else {
                    
                     let recipesWithAppareils = displayAppareils(tableList, recipes);
                    console.log(recipesWithAppareils);
                     displayRecipes(recipesWithAppareils);
                      reqInputIngredient(recipesWithAppareils);
                      // reqInputAppareil(recipes);
                      reqInputUstensil(recipesWithAppareils);

                    }
                   }

                })
            }

        })
      });
    });
  }

  // data1  =  "tableList" = regroupe les ingredients sélectionné manuellement par l'utilisateur à partir de la liste générale des ingredients.
  // data2  =  c'est la liste de toutes les recettes du site
function displayAppareils(data1, data2) {     // recherche à partir de toutes les recettes, celles qui contiennent l(es)'appereil(s) choisis par l'utilisateur.
  let recipesWithAppareils = [];
  if(data1.length === 1){
    console.log ("data1.length == 1 ");
    data2.forEach(recipe => {
    //   console.log (recipe.appliance.toLowerCase());
    //   console.log (data1);

      if(recipe.appliance.toLowerCase() == data1){
        recipesWithAppareils.push(recipe);
        console.log ("recipe.appliance == data1");
      }
      else {
        console.log ("recipe.appliance # data1");
      }
    })
  }
  else {
    console.log ("data1.length > 1");
    document.querySelector ('.card__all').innerHTML = '';
    recipesWithAppareils = [];
    data1 = [];
  }
  document.querySelector ('.card__all').innerHTML = '';
  displayRecipes(recipesWithAppareils);  
  return recipesWithAppareils;             
}

// displayAppareils(recipes, tableList);
// Mise en place de la fonctionnalité APPAREILS
// Mise en place du click d'ouverture ou de fermeture de la modal "Ingredients", avec création de l'input et de ses enfants

const icon = document.querySelector ('.card__header__naving__columnTwo__header__title');
const activeDisplay = document.querySelector ('.card__header__naving__columnTwo__header__modal');
const iconup = document.querySelector ('.card__header__naving__columnTwo__header__title__img');
icon.addEventListener ('click', function () {
  activeDisplay.classList.contains("active") ? activeDisplay.classList.remove("active")  : activeDisplay.classList.add("active");
  iconup.classList.toggle ('myicon');
})
export function reqInputAppareil(data) {
    const valuehtml =`
    <div class='card__header__naving__columnTwo__header__modal__input'>
        <input type='text' id='searchAppareils' class='card__header__naving__columnTwo__header__modal__input__content'/>
        <span class='glyphicon glyphicon-search'></span>
        <span id='appareilRemove' class='glyphicon glyphicon-remove'></span>
    </div>
    <div class='card__header__naving__columnTwo__header__modal__list'>
    </div>`;
   
  activeDisplay.innerHTML = valuehtml;
  listAppareils(data); 
    const inputAppareils = document.getElementById ('searchAppareils');
    inputAppareils.addEventListener ('input', event => {
      let dataInput = event.target.value.toLowerCase ();
      console.log ('dataInput', dataInput);
      if(dataInput){
        console.log ("insertion d'un élément dans la recherche(input) des appareils");
        const activeHtml = document.getElementById('appareilRemove');
        activeHtml.classList.contains("active") ? activeHtml.classList.add("active")  : activeHtml.classList.add("active");
        activeHtml.addEventListener('click', function() {
        console.log ("clique sur remove");
        document.getElementById('searchAppareils').value='';
        // activeHtml.classList.remove("active");
        // filterByUstensils(tableList);
        })
        } 
        else{
          // const activeHtml = document.getElementsByClassName('.glyphicon-remove');
          const activeHtml = document.getElementById('appareilRemove');
          console.log(activeHtml);
          activeHtml.classList.remove("active");
          console.log(activeHtml);

        }
      });







const buttons = document.querySelectorAll (
  '.card__header__naving__columnTwo__header__modal__list__button'
);
const buttonsArray = [...buttons];
buttonsArray.forEach ((item, index) => {
console.log(item);
  item.addEventListener ('click', function () {
    executeClick (item);
});

})
const todoListModal = document.querySelectorAll ('.card__header__naving__columnTwo__header__modal__list__button');
const todoListModalArray = [...todoListModal];
console.log(todoListModalArray);
console.log(tableList);
todoListModalArray.forEach (itemElt => {
  tableList.forEach( itemTodolist => {
    if(itemElt.innerHTML == itemTodolist){
        itemElt.classList.add('active');
    }
    })
  })
  // tableList ici regroupe l'appareil sélectionné manuellement par l'utilisateur à partir de la liste générale des appareilss.
  if(inputAppareils) {
  inputAppareils.addEventListener('input', (event) => {
  let dataInput = event.target.value.toLowerCase();
  console.log(dataInput);
  if(dataInput){
    const activeHtml = document.getElementById("appareilRemove")
    // activeHtml.style.display = "flex";
    console.log ("insertion d'un élément dans la recherche(input) de l'appareil");
    console.log(activeHtml);
    activeHtml.classList.contains("active") ? activeHtml.classList.add("active")  : activeHtml.classList.add("active");
    activeHtml.addEventListener('click', function() {
    console.log ("clique sur remove");
    document.getElementById('searchAppareils').value='';
    activeHtml.classList.remove("active");
    reqInputAppareil(data)
    }) 
    } 
  let vCardAppareils = [];
  let myAllAppareils = listAppareils(data);
  let cardAppareils = document.querySelector('.card__header__naving__columnTwo__header__modal__list');
  cardAppareils.innerHTML = "";
  myAllAppareils.forEach((dataAppareil => { 
    let tableAppareils = "";
    tableAppareils = dataAppareil;

    if( tableAppareils.toLowerCase().includes(dataInput)) {
      vCardAppareils.push(dataAppareil); 
      }
  }));
  goToTheDOM(vCardAppareils,dataElement, dataItem)
  const buttons = document.querySelectorAll (
      '.card__header__naving__columnTwo__header__modal__list__button'
    );
  const buttonsArray = [...buttons];
  buttonsArray.forEach (item => {
    item.addEventListener ('click', function () {
      executeClick (item);
    });
  });
    });
  }
}
// ExécUtion de la fonctionnalité APPAREILS pour la totalité des recettes.
reqInputAppareil(recipes);

// Céation de la liste des appareils pour la création de la fonctionnalité :RECHERCHE.
export function  listAppareils(data) {
    const allAppareils = [];
    data.forEach((dataItem) => {
        let myAppliance = dataItem.appliance;
        let theAppliance = myAppliance.toLowerCase();
        if(allAppareils.includes(theAppliance)==false){
            allAppareils.push(theAppliance);
        }
    })
    console.log('allAppareils', allAppareils);

    goToTheDOM(allAppareils, dataElement, dataItem);
    return  allAppareils;

}



