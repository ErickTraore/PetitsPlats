import {displayRecipes} from './DisplayRecipes.js';
import {getItems} from './getData.js';
import {goToTheDOM} from './DisplayNaving.js';
let dataElement = '.card__header__naving__columnOne__header__modal__list';
let dataItem = 'card__header__naving__columnOne__header__modal__list__button';
let tableList = [];
console.log ('Voici mon point de départ');
let recipes = [];
let tableTampon = [];
let allIngredients;

//-------1
// récupération des données(toutes les recttes) pour le traitement de la page.

const dataRecipes = await getItems ();
recipes = dataRecipes.items.recipes;
let tableRecipes = recipes;
let ingredientsDisplay = [];

function clickUptadeTableList (data) {
  console.log('Je suis un YANKEE');
  console.log (data);
  console.log (tableList);
//         data.classList.add ('active');

  if (tableList.includes (data.innerHTML) === false) {
        console.log ('click', data.innerHTML);
        tableList.push (data.innerHTML);
        // data.classList.add ('active');
        // affichage de la tableList.
        const todoList = document.querySelector ('.card__header__todolist');
        console.log (todoList);
        todoList.innerHTML = tableList
          .map (element => {
            return `<div class="card__header__todolist__content"> 
                             <div class="card__header__todolist__content__list"> ${element} </div>
                             <div class="card__header__todolist__content__delete"> x </div>
                       </div>`;
          })
          .join (' ');
          console.log(tableList);
          displayIngredients (tableList, tableRecipes, data)
      }

}
function displayIngredients (tableList, tableRecipes, data) {
console.log('tableRecipes', tableRecipes);
  tableTampon = tableRecipes;
  tableList.forEach(itemList => {
  ingredientsDisplay = [];
  tableTampon.forEach(data => {
    let tableIngredients = '';
    tableIngredients = data.ingredients
      .map (ingredient => {
        return ingredient.ingredient;
      })
      .join (' ');

    if (tableIngredients.toLowerCase ().includes (itemList)) {
      ingredientsDisplay.push (data);
    }
  });
  tableTampon =  ingredientsDisplay;
  console.log(tableTampon);

})
  document.querySelector ('.card__header__naving__columnOne__header__modal__list').innerHTML = '';
  document.querySelector ('.card__all').innerHTML = '';
  allIngredients = listIngredients (tableTampon);
  console.log('tableList', tableList);
  console.log(allIngredients);
  allIngredients.forEach(oneIngredient =>{
    tableList.forEach(oneTableList =>{
      if(oneTableList == oneIngredient){
        console.log(oneTableList);
        console.log(oneIngredient);
        console.log(data);
        let dataActive = document.querySelector('.card__header__naving__columnOne__header__modal__list__button');
        dataActive.classList.add ('active');
        console.log(data);
     

      }
    })
  })
    const buttons = document.querySelectorAll (
          '.card__header__naving__columnOne__header__modal__list__button'
        );
        const buttonsArray = [...buttons];
        buttonsArray.forEach (item => {
          console.log (item);
          item.addEventListener ('click', function () {
            console.log(item.innerHTML);
            if (tableList.includes (item.innerHTML) === false) {
                  console.log ('click', item.innerHTML);
                  tableList.push (item.innerHTML);
                  item.classList.add ('active');
                  // affichage de la tableList.
                  const todoList = document.querySelector ('.card__header__todolist');
                  console.log (todoList);
                  todoList.innerHTML = tableList
                    .map (element => {
                      return `<div class="card__header__todolist__content"> 
                                       <div class="card__header__todolist__content__list"> ${element} </div>
                                       <div class="card__header__todolist__content__delete"> x </div>
                                 </div>`;
                    })
                    .join (' ');
            console.log('tableList', tableList);

            }

            // executeClick (item); ??????
          });
        });


  
}

// // function executeClick (data) {
// //     console.log (data);

// //   if (tableList.includes (data.innerHTML) === false) {
// //     console.log ('click', data.innerHTML);
// //     tableList.push (data.innerHTML);
// //     data.classList.add ('active');
// //     // affichage de la tableList.
// //     const todoList = document.querySelector ('.card__header__todolist');
// //     console.log (todoList);
// //     todoList.innerHTML = tableList
// //       .map (element => {
// //         return `<div class="card__header__todolist__content"> 
// //                          <div class="card__header__todolist__content__list"> ${element} </div>
// //                          <div class="card__header__todolist__content__delete"> x </div>
// //                    </div>`;
// //       })
// //       .join (' ');
// //       console.log(tableList);
// //   // displayIngredients (tableList, recipes);

// //   }

// // }

//-------2
// Mise en place de la fonctionnalité INGREDIENTS
export function reqInputIngredient (data) {
  let test = false;
  // Mise en place du click d'ouverture ou de fermeture de la modal "Ingredients", avec création de l'input et de ses enfants
  const icon = document.querySelector (
    '.card__header__naving__columnOne__header__title'
  );
  icon.addEventListener ('click', function () {
    test = !test;
    const iconup = document.querySelector (
      '.card__header__naving__columnOne__header__title__img'
    );
    iconup.classList.toggle ('myicon');
    const activeDisplay = document.querySelector (
      '.card__header__naving__columnOne__header__modal'
    );
    const valuehtml = `
      <div class='card__header__naving__columnOne__header__modal__input'>
        <input type='text' id='searchIngredients' class='card__header__naving__columnOne__header__modal__input__content'/>
        <span class='glyphicon glyphicon-search'></span>
       </div>
       <div class='card__header__naving__columnOne__header__modal__list'>
       </div>`;

    // Création de l'input général et de la liste correspondant à ce input.
    if (test) {
      // test pour activer le déroulement de lafonctionnalité "INGREDIENTS".
      console.log ('test actif');
      activeDisplay.innerHTML = valuehtml;
      console.log (data);
      listIngredients (data);

      const inputIngredients = document.getElementById ('searchIngredients');
      inputIngredients.addEventListener ('input', event => {
        let dataInput = event.target.value.toLowerCase ();
        console.log (dataInput);
      });
      const buttons = document.querySelectorAll (
        '.card__header__naving__columnOne__header__modal__list__button'
      );
      const buttonsArray = [...buttons];

      buttonsArray.forEach (item => {
        item.addEventListener ('click', function () {
          clickUptadeTableList(item);
          // executeClick (item);
        });
      });
    } else {
      console.log ('test non actif');
      activeDisplay.innerHTML = '';
      const todoList = document.querySelector ('.card__header__todolist');
      console.log (todoList);
      todoList.innerHTML = '';
      tableList = [];
    }
    // tableList regroupe les ingredients sélectionné manuellement par l'utilisateur à partir de la liste générale des ingredients.
    // let tableList = [];
    const inputIngredients = document.getElementById ('searchIngredients');
    if (inputIngredients) {
      inputIngredients.addEventListener ('input', event => {
        let dataInput = event.target.value.toLowerCase ();
        console.log (dataInput);

        // "vCardIngredients " = liste de tous les ingredients qui matchent avec la selection de l'utilisateur.
        let vCardIngredients = [];
        // "myAllIngredients " = liste de tous les ingredients de toutes les recettes.
        let myAllIngredients = listIngredients (data);

        let cardIngredients = document.querySelector (
          '.card__header__naving__columnOne__header__modal__list'
        );
        cardIngredients.innerHTML = '';
        myAllIngredients.forEach (dataIngredient => {
          let tableIngredients = '';
          tableIngredients = dataIngredient;

          if (tableIngredients.toLowerCase ().includes (dataInput)) {
            vCardIngredients.push (dataIngredient);
          }
        });
        console.log (vCardIngredients);
        goToTheDOM (vCardIngredients, dataElement, dataItem);
        // vCardIngredients = liste brute des ingrédients préselectionnés.
        // buttons(table) = liste brute des ingrédients préselectionnés automatiquement, introduit dans le html.
        // tableList = liste des ingrédients sélectionés manuellement par l'utilisateur.
        // const buttons = document.querySelectorAll (
        //   '.card__header__naving__columnOne__header__modal__list__button'
        // );
        // const buttonsArray = [...buttons];
        // buttonsArray.forEach (item => {
        //   console.log (item);
        //   item.addEventListener ('click', function () {
        //     executeClick (item);
        //   });
        // });
      });
    }
  });
}

// ExécUtion de la fonctionnalité INGREDIENTS pour la totalité des recettes.
reqInputIngredient (recipes);

// // Céation de la liste des ingrediens pour la création de la fonctionnalité :RECHERCHE.
function listIngredients (data) {
  const allIngredients = [];
  data.forEach (dataItem => {
    console.log(dataItem);
    dataItem.ingredients.forEach (ingredient => {
      let myIngredient = ingredient.ingredient;
      let theIngredient = myIngredient.toLowerCase ();
      if (allIngredients.includes (theIngredient) == false) {
        allIngredients.push (theIngredient);
      }
    });
  });
//   // tableList = allIngredients;
console.log(allIngredients);
  goToTheDOM (allIngredients, dataElement, dataItem);
  return allIngredients;
}
