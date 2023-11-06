import { displayRecipes } from "./DisplayRecipes.js"
import { getItems } from "./getData.js"
import { reqInputIngredient } from "./searchingredients.js"
import { reqInputAppareil } from "./searchappareils.js"
import { reqInputUstensil } from "./searchustensils.js"

  
// Récupère les datas des recipes
const { items } = await getItems();
const dataCards = items.recipes; //Liste de toutes les recettes.
 console.log(dataCards);
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
function displayPage(data) {
  displayRecipes(data);
  reqInputIngredient(data);
  reqInputAppareil(data);
  reqInputUstensil(data);
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
  displayRecipes(vCard);
  reqInputIngredient(vCard);
  reqInputAppareil(vCard);
  reqInputUstensil(vCard);
}
export const filterByUstensils = (ustensils) => {    // ingredients correspond à la tableList
 console.log(ustensils);
  let vCard = []
  dataCards.forEach((dataCard) => { 
    let tableUstensils = "";
    tableUstensils = dataCard.ustensils.map(ustensil => {
      return ustensil
    }).join(' ')
      console.log(tableUstensils);
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
  // displayPage(vCard);
  displayRecipes(vCard);
  reqInputIngredient(vCard);
  reqInputAppareil(vCard);
  reqInputUstensil(vCard);

}





