import { displayRecipes } from "./DisplayRecipes.js"
import { getItems } from "./getData.js"
import { reqInputIngredient } from "./searchingredients.js"
import { reqInputAppareil } from "./searchappareils.js"
import { reqInputUstensil } from "./searchustensils.js"

// Récupère les datas des recipes
const { items } = await getItems();
const dataCards = items.recipes; //Liste de toutes les recettes.

function toggleIcon() { 
const icon = document.querySelector ('.card__header__naving__columnOne__header__title');
const activeDisplay = document.querySelector ('.card__header__naving__columnOne__header__modal');
const iconup = document.querySelector ('.card__header__naving__columnOne__header__title__img');
  icon.addEventListener ('click', function () {
    activeDisplay.classList.contains("active") ? activeDisplay.classList.remove("active")  : activeDisplay.classList.add("active");
    iconup.classList.toggle ('myicon');
  })
  }
export {toggleIcon};

function displayPage(data) {
  displayRecipes(data);
  reqInputIngredient(data);
  reqInputAppareil(data);
  reqInputUstensil(data);
}
export {displayPage};


// Affiche toutes les recettes:  "dataCards"
displayRecipes(dataCards)
   
// Affiche les recettes  triées avec l'input 1: vCard"
// Cette phase ne gère pas les ingredients directement, mais les gère pour pouvoir obtenir uniquement les recettes liés à certains ingredients.
const inputSearch = document.getElementById('search');
inputSearch.addEventListener('input', (event) => {
let dataInput = event.target.value.toLowerCase();
console.log(dataInput);
let vCard = [];

dataCards.forEach((data => { 
  let tableIngredients = "";
  tableIngredients = data.ingredients.map(ingredient => {
    return ingredient.ingredient
  }).join(' ')
  if( data.name.toLowerCase().includes(dataInput) || data.description.toLowerCase().includes(dataInput) || tableIngredients.toLowerCase().includes(dataInput) 
  ){
    vCard.push(data); 
  }
}


));
console.log(dataCards.length);
console.log(vCard.length);
if(vCard.length > dataCards.length){
  // displayPage(vCard)
}


    document.querySelector ('.card__all').innerHTML = '';
    displayPage(vCard)
});

export const filterByIngredient = (ingredients) => {    // ingredients correspond à la tableList
  let vCard = []
  dataCards.forEach((dataCard) => { 
    let tableIngredients = "";
    tableIngredients = dataCard.ingredients.map(ingredient => {
      return ingredient.ingredient
    }).join(' ')
    // compte le nombre d'ingredient trouvé dans la recette
    let countIngredient = 0;
    ingredients.forEach((ingredient) => {
      if(tableIngredients.toLowerCase().includes(ingredient) ){  // tableIngredients correspond aux ingredients de chaque recette.
        countIngredient++;
      }
    })
    // si le nombre d'ingredient trouvé est égale au nombre d'ingredient de la recette, alors on ajoute la recette dans le tableau vCard
    if(countIngredient === ingredients.length){
      vCard.push(dataCard); // récupère toutes les recettes qui contiennes tous les ingredients choisi par l'utilisateur
    }
  })
  document.querySelector ('.card__all').innerHTML = '';
  displayPage(vCard);
  
}
export const filterByUstensils = (ustensils) => {    // ingredients correspond à la tableList
 console.log(ustensils);
  let vCard = []
  dataCards.forEach((dataCard) => { 
    let tableUstensils = "";
    tableUstensils = dataCard.ustensils.map(ustensil => {
      return ustensil
    }).join(' ')
    // içi on créé l'algorithme suivant: Si le nombre d'élément recherché est égal au nombre d'élément trouvé dans l"une des recettes, alors cette recette est validée.
    // compte le nombre d'ingredient trouvé dans la recette
    let countUstensil = 0;
    ustensils.forEach((ustensil) => {
      if(tableUstensils.toLowerCase().includes(ustensil) ){  // tableIngredients correspond aux ingredients de chaque recette.
        countUstensil++;
      }
    })
    // si le nombre d'ingredient trouvé est égale au nombre d'ingredient de la recette, alors on ajoute la recette dans le tableau vCard
    if(countUstensil === ustensils.length){
      vCard.push(dataCard); // récupère toutes les recettes qui contiennes tous les ingredients choisi par l'utilisateur
    }
  })
  document.querySelector ('.card__all').innerHTML = '';
  console.log(vCard);
  displayPage(vCard);

}
export const filterByAppareils = (appareil) => {    // ingredients correspond à la tableList
   let vCard = []
   dataCards.forEach((dataCard) => { 
     let tableAppareils = "";
     tableAppareils = dataCard.appliance
       console.log(tableAppareils);
       if(tableAppareils.toLowerCase().includes(appareil) ){  // tableIngredients correspond aux ingredients de chaque recette.
        vCard.push(dataCard); // récupère toutes les recettes qui contiennes tous les ingredients choisi par l'utilisateur
      }
     // si le nombre d'ingredient trouvé est égale au nombre d'ingredient de la recette, alors on ajoute la recette dans le tableau vCard
   })
   document.querySelector ('.card__all').innerHTML = '';
   console.log(vCard);
   displayPage(vCard);
  
 
 }

function displayToDoList(tableList, data) {
  let todoListHTML = ''   // Mappage de la tableList pour construire les fonctionnalités de suppressions aux clients.
  if (tableList.includes (data.innerHTML) === false) {
    tableList.push (data.innerHTML);
    // affichage de la tableList.
    todoListHTML = document.querySelector ('.card__header__todolist');
    todoListHTML.innerHTML = tableList
      .map (element => {
        return `<div class="card__header__todolist__content"> 
                         <div class="card__header__todolist__content__list"> ${element} </div>
                         <div class="card__header__todolist__content__delete" data-name="${element}"> x </div>
                   </div>`;
      })
      .join (' ');
      
    }
}
export { displayToDoList };






