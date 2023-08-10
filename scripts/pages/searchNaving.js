import Api from "../api/Api.js";
import { getItems } from "./index.js";

// await getItems();

const dataIngredients = await getItems();
const dataIng = dataIngredients.items.recipes;
console.log(dataIng);
dataIng.forEach((data) => {
    console.log(data);

})
    

const icon = document.querySelector(".card__header__naving__columnOne__header__title__img");
const isIcon = document.querySelector(".card__header__naving__columnOne__header__modal").innerHTML; 
const activeDisplay = document.querySelector(".card__header__naving__columnOne__header__modal");
console.log(activeDisplay);

console.log(icon);
// const element = document.getElementsByClassName('.card__header__naving__columnOne__header__title');
icon.addEventListener('click', function() {
    console.log("Je suis dans searchNaving un");
    // if(activeDisplay.style.visibility  = "flex" ){
    //     activeDisplay.style.visibility = "hidden" 
    // console.log(activeDisplay.style.visibility);
    // }
    if(activeDisplay.style.visibility = "hidden"){
        activeDisplay.style.display = "flex" 
    console.log(activeDisplay.style.display);
    }
    

    // if(activeDisplay.style.visibility = "hidden") {
    //     icon.style.transform = "rotate(180deg)";

    //     activeDisplay.style.visibility = "visible";

    // }

    
});

// Listons tous les ingredients de toutes les recettes




// const inputSearchIngred = document.getElementById('searchingredients');
// inputSearchIngred.addEventListener('input', (event) => {
//     let dataInput = event.target.value.toLowerCase();
//     console.log(dataInput);
//     const recipesDatas = allRecipes.recipes;
//     console.log(recipesDatas);
//     let vCard = [];


// });
