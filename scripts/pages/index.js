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
    document.querySelector ('.card__all').innerHTML = '';
    displayRecipes(vCard);
    reqInputIngredient(vCard);
    reqInputAppareil(vCard);
    reqInputUstensil(vCard);
});

export const filterByIngredient = (ingredients) => {    // ingredients correspond à la tableList
  console.log(ingredients);
  let vCard = []
  dataCard.forEach((data_ingredients) => { 
    let tableIngredients = "";
    tableIngredients = data_ingredients.ingredients.map(ingredient => {
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
      vCard.push(data_ingredients); // récupère toutes les recettes qui contiennes tous les ingredients choisi par l'utilisateur
    }
  })
  console.log(vCard);
  console.log(ingredients);
  document.querySelector ('.card__all').innerHTML = '';
  displayRecipes(vCard);
  reqInputIngredient(vCard);
  reqInputAppareil(vCard);
  reqInputUstensil(vCard);
}

// ici, je dois filtrer les ingredients et les ustensils.
export const filterByAppareil = (appareils) => {    // ingredients correspond à la tableList
  console.log("ici, je dois filtrer les ingredients et les ustensils");
  console.log(appareils);
  console.log(dataCard);

}



