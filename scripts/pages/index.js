import Api from "../api/Api.js";

let allRecipes = [];
 // Permet de récuperer toutes les données de l'api
        async function getItems() {
            const itemsApi = new Api('data/recipes.json')
            const items = await itemsApi.get()
            allRecipes = items;
        return ({
            items })
    }
    // On affiche toutes les données (recettes') grace à l'utilisation du design patern factory
    async function  getDataCard(data) {
      const cardSection = document.querySelector(".card__all");
      data.forEach((card) => {
        console.log('card',card);
        const cardModel = cardFactory(card);
        const makeCardDOM = cardModel.makeCardDOM();
        cardSection.appendChild(makeCardDOM);
      });
    }

 // // On affiche toutes les données ('ingredients'') grace à l'utilisation du design patern selectfactory/ingredients.js
 async function  getDataIngredients(data) {
  const sectionIngred = document.querySelector(".cardheader__header__naving");
  let tableIngredients = [];
  console.log(data.length);
  for(let i=0; i < data.length; i++) {
    let tableIngredient = data[i].ingredients;
    console.log(tableIngredient);
    let dataIngLength = tableIngredient.length;
    console.log(dataIngLength);
    for (var j = 0; j < dataIngLength; j++) {
      console.log(tableIngredient[j].ingredient);
      tableIngredients.push(tableIngredient[j].ingredient.toLowerCase())
    }
  }
  console.log(tableIngredients);
  let tableIngredientsUnique = tableIngredients.filter((x, i) => tableIngredients.indexOf(x) === i);
  console.log(tableIngredientsUnique);
  console.log(tableIngredientsUnique.length);

  for (var y = 0; y < tableIngredientsUnique.length; y++) {
    let ingredientItem = tableIngredientsUnique[y];
    console.log(ingredientItem);
    const ingredModel = ingredientsFactory(ingredientItem);
    const makeIngredDOM  = ingredModel.makeIngredDOM();
    sectionIngred.appendChild(makeIngredDOM);

  }

}

    async function init() {
        // Récupère les datas des recipes
        const { items } = await getItems();
        const dataCard = items.recipes;
        // console.log(dataCard);
        getDataCard(dataCard)
        // getDataIngredients(dataCard) 
      };
    
      init();
    const inputSearch = document.getElementById('search');

    inputSearch.addEventListener('input', (event) => {
      let dataInput = event.target.value.toLowerCase();
      console.log(dataInput);
      const recipesDatas = allRecipes.recipes;
      console.log(recipesDatas);
      let dataLength = allRecipes.recipes.length;
      // console.log(dataLength);
      let vCard = [];
      let tableIngredients = [];
      for (var i = 0; i < dataLength; i++) {
      console.log(recipesDatas[i].name);
      console.log(recipesDatas[i].description);
      tableIngredients = recipesDatas[i].ingredients;
      let dataIngLength = tableIngredients.length;
      if( recipesDatas[i].name.toLowerCase().includes(dataInput) || recipesDatas[i].description.toLowerCase().includes(dataInput)){
        console.log('Je suis inclus à l\'intérieur1');
        vCard.push(recipesDatas[i]);
        }
        else {
          console.log('Je ne  suis pas inclus à l\'intérieur1');
            for (var j = 0; j < dataIngLength; j++) {
            console.log(tableIngredients[j].ingredient);
      if(tableIngredients[j].ingredient.toLowerCase().includes(dataInput)){
      console.log('Je suis inclus à l\'intérieur2');
      vCard.push(recipesDatas[i]);
      break;
      }
      else {
      console.log('Je ne  suis pas inclus à l\'intérieur2');
      }
          
      }
          }
    
    }
    
      document.querySelector('.card__all').innerHTML = '';
      getDataCard(vCard)
    });
