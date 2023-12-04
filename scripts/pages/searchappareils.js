import { displayRecipes } from "./DisplayRecipes.js"
import { getItems } from "./getData.js";
import { goToTheDOM } from "./DisplayNaving.js";
// import {listIngredients} from "./searchingredients.js";
// import {listUstensils} from "./searchustensils.js";
import { reqInputIngredient } from "./searchingredients.js"
import { reqInputUstensil } from "./searchustensils.js"
import { filterByAppareils } from "./index.js";
import {displayToDoList} from "./index.js";

// Modification profonde.
let dataElement = ".card__header__naving__columnTwo__header__modal__list"
let dataItem = "card__header__naving__columnTwo__header__modal__list__button"
let tableList = [];
let recipes = [];

// récupération des données(toutes les recttes)  pour le traitement de la page.
const dataRecipes = await getItems ();
recipes = dataRecipes.items.recipes;

function executeClick (data) {
      displayToDoList(tableList, data)
      filterByAppareils(tableList);

    const listContent = document.querySelectorAll (".card__header__todolist__content");
    const listContentArray = [...listContent];
    // 01 => btns = élement sélectionné par l'utilisateur
    const btns = document.querySelectorAll (".card__header__todolist__content__delete");
    const btnsArray = [...btns];
    btnsArray.forEach ((item, index) => {    //1ére boucle pour énumérer les élements choisis afin de repérer celui qui sera clicqué.
      item.addEventListener ('click', function () {
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
                    
                    //  let recipesWithAppareils = displayAppareils(tableList, recipes);
                    // console.log(recipesWithAppareils);
                    //  displayRecipes(recipesWithAppareils);
                    //   reqInputIngredient(recipesWithAppareils);
                    //   // reqInputAppareil(recipes);
                    //   reqInputUstensil(recipesWithAppareils);

                    }
                   }

                })
            }

        })
      });
    });
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
export function reqInputAppareil(vCardData) {
    const valuehtml =`
    <div class='card__header__naving__columnTwo__header__modal__input'>
        <input type='text' id='searchAppareils' class='card__header__naving__columnTwo__header__modal__input__content'/>
        <span class='glyphicon glyphicon-search'></span>
        <span id='appareilRemove' class='glyphicon glyphicon-remove'></span>
    </div>
    <div class='card__header__naving__columnTwo__header__modal__list'>
    </div>`;
   
  activeDisplay.innerHTML = valuehtml;
  factoryInput(vCardData); 
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
        filterByAppareils(tableList);
        })
        } 
        else{
          // const activeHtml = document.getElementsByClassName('.glyphicon-remove');
          const activeHtml = document.getElementById('appareilRemove');
          activeHtml.classList.remove("active");

        }
      });


const buttons = document.querySelectorAll (
  '.card__header__naving__columnTwo__header__modal__list__button'
);
const buttonsArray = [...buttons];
buttonsArray.forEach ((item) => {
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
    // reqInputAppareil(data)
    }) 
    } 
  let vCardAppareils = [];
  let myAllAppareils= factoryInput(vCardData);
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
export function  factoryInput(dataAppareils) {
    const allData= [];
   
    dataAppareils.forEach((dataItem) => {
        let myData = dataItem.appliance;
        let theData = myData.toLowerCase();

        if(allData.includes(theData)==false){
            allData.push(theData);
        }
    })
    goToTheDOM(allData, dataElement, dataItem);
    return  allData;

}



