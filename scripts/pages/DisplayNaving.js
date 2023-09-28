import { navingFactory } from "../factories/factoriesNaving.js";

export async function  goToTheDOM(data, dataElement, dataItem ) {
    console.log(data);
    console.log(dataElement);
    console.log(dataItem);
    // hydratation de la vue avec les éléments de la liste correspondante.
    const navingSection = document.querySelector(dataElement);
    data.forEach((element) => {
        const navingModel = navingFactory(element, dataItem );
        const makeNavingDOM = navingModel.makeNavingDOM();
        navingSection.appendChild(makeNavingDOM);
    });
    }