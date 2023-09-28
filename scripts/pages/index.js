import { displayRecipes } from "./DisplayRecipes.js"
import { getItems } from "./getData.js"
import { reqInputIngredient } from "./searchingredients.js"
import { reqInputAppareil } from "./searchappareils.js"
import { reqInputUstensil } from "./searchustensils.js"

  
// Récupère les datas des recipes
const { items } = await getItems();
const dataCard = items.recipes; //Liste de toutes les recettes.
     console.log(dataCard);
// Affiche toutes les recettes:  "dataCard"
  displayRecipes(dataCard)
   
// Affiche les recettes  triées avec l'input 1: vCard"
// Cette phase ne gère pas les ingredients directement, mais les gère pour pouvoir obtenir uniquement les recettes liés à certains ingredients.
    const inputSearch = document.getElementById('search');
    inputSearch.addEventListener('input', (event) => {
    let dataInput = event.target.value.toLowerCase();
    console.log(dataInput);
    let vCard = [];
        
    
  dataCard.forEach((data => { 
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
     console.log(dataCard);
     console.log(vCard);
  document.querySelector ('.card__all').innerHTML = '';
  displayRecipes(vCard);
  reqInputIngredient(vCard);
  reqInputAppareil(vCard);
  reqInputUstensil(vCard);
});

export const filterByIngredient = (ingredient) => {
  let vCard = []
  dataCard.forEach((data) => { 
    let tableIngredients = "";
    tableIngredients = data.ingredients.map(ingredient => {
      return ingredient.ingredient
    }).join(' ')
    if(tableIngredients.toLowerCase().includes(ingredient) ){
      vCard.push(data); 
    }
  })
  document.querySelector ('.card__all').innerHTML = '';
  displayRecipes(vCard);
  reqInputIngredient(vCard);
  reqInputAppareil(vCard);
  reqInputUstensil(vCard);
}
