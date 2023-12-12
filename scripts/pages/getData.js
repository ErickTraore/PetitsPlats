import Api from '../api/Api.js';

// Permet de récuperer toutes les données de l'api
export async function getItems () {
  const itemsApi = new Api ('data/recipes.json');
  const items = await itemsApi.get ();
  return {
    items,
  };
}
