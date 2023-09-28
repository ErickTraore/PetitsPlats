  // On affiche toutes les données (recettes') grace à l'utilisation du design patern factory
  export async function  displayRecipes(data) {
    const cardSection = document.querySelector(".card__all");
    data.forEach((card) => {
      console.log('card',card);
      const cardModel = cardFactory(card);
      const makeCardDOM = cardModel.makeCardDOM();
      cardSection.appendChild(makeCardDOM);
    });
  }