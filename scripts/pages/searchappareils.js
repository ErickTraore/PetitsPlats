import { displayRecipes } from "./DisplayRecipes.js"
import { getItems } from "./getData.js";
import { goToTheDOM } from "./DisplayNaving.js";
let dataElement = ".card__header__naving__columnTwo__header__modal__list"
let dataItem = "card__header__naving__columnTwo__header__modal__list__button"
let tableList = [];
let recipes = [];

// récupération des données pour le traitement de la page.
const dataRecipes = await getItems ();
recipes = dataRecipes.items.recipes;

function displayAppareils(data1, data2){
  let recipesWithAppareils = [];
  if(data1.length === 1){
    console.log ("data1.length === 1");
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
  }
function executeClick (data) {
  console.log (data);
  function removeItemTableList(dataIndex){
    tableList.splice(dataIndex, 1);
 }
    if (tableList.includes (data.innerHTML) === false) {
      console.log ('click', data.innerHTML);
      tableList.push (data.innerHTML);
      console.log (data);
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
      console.log (recipes);
      displayAppareils(tableList, recipes);

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
        let nameSelected = item.dataset.name
        listContentArray.forEach((list,  index) => { //Boucle pour trouver l'élement à effacer.
            list.setAttribute('id', `${index}` )
            if(`${index}` === dataDelete ){
            const element = document.getElementById(`${index}`); // Il s'agit de l'id des élements sélectionnés par l'utilisateur.
            console.log(element);
            console.log(element.childNodes[1].innerHTML);
            let itemDelete = element.childNodes[1].innerHTML; // élement déjà effacer
            console.log(('itemDelete =>'), itemDelete);
            element.remove(); // supprime le div avec l'identifiant 'id'
            removeItemTableList(`${index}`)
            const buttons = document.querySelectorAll (  // on doit rechercher itemDelete dans la liste générale des ustensils.
                '.card__header__naving__columnTwo__header__modal__list__button'
                );
                const buttonsArray = [...buttons];  // Liste des ustensils proposés.
                buttonsArray.forEach ((item) => {
            console.log(nameSelected);
            console.log(item.innerHTML);

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
  displayAppareils(recipes, tableList);














// Mise en place de la fonctionnalité APPAREILS

export function reqInputAppareil(data) {
let test = false;

// Mise en place du click d'ouverture ou de fermeture de la modal: Appareils, avec création de l'input et de ses enfants
const icon = document.querySelector(".card__header__naving__columnTwo__header__title");
icon.addEventListener('click', function() {
    test = !test;

    const iconup = document.querySelector(".card__header__naving__columnTwo__header__title__img");
    iconup.classList.toggle("myicon");
    
    const activeDisplay = document.querySelector(".card__header__naving__columnTwo__header__modal");
    const valuehtml =`
    <div class='card__header__naving__columnTwo__header__modal__input'>
        <input type='text' id='searchAppareils' class='card__header__naving__columnTwo__header__modal__input__content'/>
        <span class='glyphicon glyphicon-search'>
        </span>
    </div>
    <div class='card__header__naving__columnTwo__header__modal__list'>
    </div>`
    
    if(test) {
      console.log ('test actif');
        activeDisplay.innerHTML = valuehtml;
        listAppareils(data); 
         const inputAppareils = document.getElementById ('searchAppareils');
         inputAppareils.addEventListener ('input', event => {
      let dataInput = event.target.value.toLowerCase ();
      console.log ('dataInput', dataInput);
  // let vCard = [];
});
const buttons = document.querySelectorAll (
  '.card__header__naving__columnTwo__header__modal__list__button'
);
const buttonsArray = [...buttons];


buttonsArray.forEach ((item, index) => {
  item.setAttribute('id', "a"+`${index}`)
  item.addEventListener ('click', function () {
    executeClick (item);
  });
});
} else {
    console.log ('test non actif');
    activeDisplay.innerHTML = '';
    const todoList = document.querySelector ('.card__header__todolist');
    console.log (todoList);
    todoList.innerHTML = "";
    tableList = [];
  }
  // tableList regroupe les ingredients sélectionné manuellement par l'utilisateur à partir de la liste générale des ingredients.
  
       const inputAppareils = document.getElementById('searchAppareils');
       if(inputAppareils){
       inputAppareils.addEventListener('input', (event) => {
        let dataInput = event.target.value.toLowerCase();
        console.log(dataInput);
        let vCardAppareils = [];
        let myAllAppareils = listAppareils(data);
        console.log(myAllAppareils);
        let cardAppareils = document.querySelector('.card__header__naving__columnTwo__header__modal__list');
        cardAppareils.innerHTML = "";
        myAllAppareils.forEach((dataAppareil => { 
            let tableAppareils = "";
            tableAppareils = dataAppareil;
            console.log(tableAppareils);
     
            if( tableAppareils.toLowerCase().includes(dataInput)) {
              vCardAppareils.push(dataAppareil); 
            console.log("item identique");
              }
          }));
          console.log(vCardAppareils);
          goToTheDOM(vCardAppareils,dataElement, dataItem)
           // vCardIngredients = liste brute des ingrédients préselectionnés.
      // buttons(table) = liste brute des ingrédients préselectionnés automatiquement, introduit dans le html.
      // tableList = liste des ingrédients sélectionés manuellement par l'utilisateur.
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
});
}
// ExécUtion de la fonctionnalité APPAREILS pour la totalité des recettes.

reqInputAppareil(recipes);


// Céation de la liste des appareils pour la création de la fonctionnalité :RECHERCHE.
function  listAppareils(data) {
    const allAppareils = [];
    data.forEach((dataItem) => {
        let myAppliance = dataItem.appliance;
        let theAppliance = myAppliance.toLowerCase();
        console.log(theAppliance);
    
        if(allAppareils.includes(theAppliance)==false){
            allAppareils.push(theAppliance);
        }
    })
    console.log('allAppareils', allAppareils);

    goToTheDOM(allAppareils, dataElement, dataItem);
    return  allAppareils;

}



