import { displayRecipes } from "./DisplayRecipes.js"
import { getItems } from "./getData.js";
import { goToTheDOM } from "./DisplayNaving.js";
import { reqInputIngredient } from "./searchingredients.js";
import { reqInputAppareil } from "./searchappareils.js";


let dataElement = ".card__header__naving__columnThree__header__modal__list"
let dataItem = "card__header__naving__columnThree__header__modal__list__button";
let tableList = [];
let recipes = [];

// récupération des données pour le traitement de la page.
const dataRecipes = await getItems ();
recipes = dataRecipes.items.recipes;




function executeClick (data) {
    if (tableList.includes (data.innerHTML) === false) {
      console.log ('click', data.innerHTML);
      tableList.push (data.innerHTML);
      console.log (data);
      data.classList.add ('active');
      const todoList = document.querySelector ('.card__header__todolist');
      console.log (todoList);
      todoList.innerHTML  = tableList

      .map (element => {
        return `<div class="card__header__todolist__content"> 
                     <div class="card__header__todolist__content__list"> ${element} </div>
                     <button class="card__header__todolist__content__delete" data-name="${element}"> x </button>
               </div>`;
      })
      .join (' ');

      displayUstensils(tableList, recipes);
      let recipesWithUstensils = displayUstensils(tableList, recipes);
      console.log(recipesWithUstensils);
      let cardAppareils = document.querySelector('.card__header__naving__columnThree__header__modal__list')
    }
    const listContent = document.querySelectorAll (".card__header__todolist__content");
    const listContentArray = [...listContent];
    const btns = document.querySelectorAll (".card__header__todolist__content__delete");
    const btnsArray = [...btns];
    btnsArray.forEach ((item, index) => {    //1ére boucle pour énumérer les élements choisis afin de repérer celui qui sera clicqué.
      item.addEventListener ('click', function () {
        let dataDelete = `${index}`;
        console.log(item);
        console.log(item.dataset.name);
        let nameSelected = item.dataset.name
        listContentArray.forEach((list,  index) => { //Boucle pour trouver l'élement à effacer.
            list.setAttribute('id', `${index}` )
            if(`${index}` === dataDelete ){
            const element = document.getElementById(`${index}`); // Il s'agit de l'id des élements sélectionnés par l'utilisateur.
            console.log(element);
            console.log(element.childNodes[1].innerHTML);
            let itemDelete = element.childNodes[1].innerHTML; // élement déjà effacer
            console.log(('itemDelete'), itemDelete);
            element.remove(); // supprime le div avec l'identifiend 'id'
            tableList = tableList.filter(list => list !== nameSelected)
            const buttons = document.querySelectorAll (  // on doit rechercher itemDelete dans la liste générale des ustensils.
                '.card__header__naving__columnThree__header__modal__list__button'
                );
                const buttonsArray = [...buttons];  // Liste des ustensils proposés.
                buttonsArray.forEach ((item) => {
                   if(nameSelected == item.innerHTML){
                    console.log("Bravo");
                    item.classList.remove('active')
                    if(tableList.length == 0){
                        displayRecipes(recipes);
                        reqInputIngredient(recipes);
                        reqInputAppareil(recipes);
                        reqInputUstensil(recipes);
                      } else{
                    reqInputIngredient(recipesWithUstensils);
                    reqInputAppareil(recipesWithUstensils);
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
  function displayUstensils(data1, data2){
    let recipesWithUstensils = [];
    data2.forEach(recipe => {
        if (data1.every(element => recipe.ustensils.includes(element))) {
           recipesWithUstensils.push(recipe);
        }
    })
    document.querySelector ('.card__all').innerHTML = '';
    displayRecipes(recipesWithUstensils);
    return recipesWithUstensils;             
    }
const icon = document.querySelector ('.card__header__naving__columnThree__header__title');
const activeDisplay = document.querySelector ('.card__header__naving__columnThree__header__modal');
const iconup = document.querySelector ('.card__header__naving__columnThree__header__title__img');
icon.addEventListener ('click', function () {
  activeDisplay.classList.contains("active") ? activeDisplay.classList.remove("active")  : activeDisplay.classList.add("active");
  iconup.classList.toggle ('myicon');
})



// Mise en place de la fonctionnalité USTENSILS
export function reqInputUstensil(data) {
    const valuehtml =`
    <div class='card__header__naving__columnThree__header__modal__input'>
        <input type='text' id='searchUstensils' class='card__header__naving__columnThree__header__modal__input__content'/>
        <span class='glyphicon glyphicon-search'>
        </span>
    </div>
    <div class='card__header__naving__columnThree__header__modal__list'>
    </div>`
        console.log("Ouverture de la modale");
        activeDisplay.innerHTML = valuehtml;
        listUstensils(data); 
        const inputUstensils = document.getElementById ('searchUstensils');
        inputUstensils.addEventListener ('input', event => {
        let dataInput = event.target.value.toLowerCase ();
        console.log ('dataInput', dataInput);


        });
        const buttons = document.querySelectorAll (
        '.card__header__naving__columnThree__header__modal__list__button'
        );
        const buttonsArray = [...buttons];
        buttonsArray.forEach ((item, index) => {
        item.setAttribute('id', "a"+`${index}`)
        item.addEventListener ('click', function () {
        executeClick (item);
        });
    });
    
   
    // if (tableList.length === 0) {
    //     console.log("tableList est vide");
    // } else{
    //     console.log("tableList n'est pas vide");
    // }




    // console.log(todoListModalArray);
    // console.log(tableList);
    // console.log(todoListModal.innerHTML);


    if(inputUstensils){
        inputUstensils.addEventListener('input', (event) => {
        let dataInput = event.target.value.toLowerCase();
        console.log(dataInput);
        if(dataInput){
            console.log("dataInput existe",dataInput );
        }else{
            console.log("dataInput existe pas");
            console.log(tableList);
            if (tableList.length === 0) {
                console.log("tableList est vide");
                console.log(tableList);

               let todoListModal = document.querySelectorAll ('.card__header__naving__columnThree__header__modal__list__button');
               todoListModal.innerHTML = "";
               let myAllUstensils = listUstensils(data);
            } else {
                console.log("tableList n'est pas vide");
                console.log(tableList);
                const todoListModal = document.querySelectorAll ('.card__header__naving__columnThree__header__modal__list__button');
                const todoListModalArray = [...todoListModal];
                if (todoListModalArray.length === 0) {
                console.log("todoListModalArray est vide");
                } else{
                    console.log("todoListModalArray n'est pas vide, donc on peut colorer les ustensils sélectionnés en jaune");

                    todoListModalArray.forEach (itemElt => {
                        console.log(itemElt);
                        console.log(itemElt.innerHTML);
                        tableList.forEach( itemTodolist => {
                        console.log(itemTodolist);

                          if(itemElt.innerHTML == itemTodolist){
                              itemElt.classList.add('active');
                          }
                          })
                        })
                        // tableList regroupe les ingredients sélectionné manuellement par l'utilisateur à partir de la liste générale des ingredients.
                   
                }

            }
        }
        let vCardUstensils = [];
        let myAllUstensils = listUstensils(data);
        console.log(myAllUstensils);
        let cardUstensils = document.querySelector('.card__header__naving__columnThree__header__modal__list')
        let lCardUstensils = document.querySelectorAll('.card__header__naving__columnThree__header__modal__list__button')
        cardUstensils.innerHTML = "";
        lCardUstensils.innerHTML = "";

        myAllUstensils.forEach((dataUstensil => { 
            let tableUstensils = "";
            
            tableUstensils = dataUstensil;
            if( tableUstensils.toLowerCase().includes(dataInput)) {
                vCardUstensils.push(dataUstensil); 
            }
            }));
        let parent = document.querySelector(".card__header__naving__columnThree__header__modal__list");
        console.log(parent); 
        let myNodeList = parent.childNodes; 
        let myNodeListArray = [...myNodeList];
        console.log(myNodeListArray); 

        goToTheDOM(vCardUstensils, dataElement, dataItem);
        // vCardIngredients = liste brute des ingrédients préselectionnés.
        // buttons(table) = liste brute des ingrédients préselectionnés automatiquement, introduit dans le html.
        // tableList = liste des ingrédients sélectionés manuellement par l'utilisateur.
        const buttons = document.querySelectorAll ('.card__header__naving__columnThree__header__modal__list__button' );
        const buttonsArray = [...buttons];
        buttonsArray.forEach (item => {
        item.addEventListener ('click', function () {
            executeClick (item);
        });
        });
        })
}
else{
    console.log("it's mine");
}
};
// }


reqInputUstensil(recipes);

// Céation de la liste des ustensils pour la création de la fonctionnalité :RECHERCHE.
export function  listUstensils(data) {
    const AllUstensils = [];
    data.forEach((dataItem) => {
        dataItem.ustensils.forEach((dataUstensils) => {
        let myUstensils = dataUstensils;
        let theUstensils = myUstensils.toLowerCase();
        if(AllUstensils.includes(theUstensils)==false){
                AllUstensils.push(theUstensils);
            }
        })
    })
    console.log(AllUstensils);

    goToTheDOM(AllUstensils, dataElement, dataItem);
    return  AllUstensils;
}
