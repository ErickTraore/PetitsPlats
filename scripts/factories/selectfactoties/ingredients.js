function  ingredientsFactory(data){
    const { ingredient }  = data;
    
    function makeIngredDOM () {

        
    const ingredDom = document.createElement('option');
    ingredDom.classList.add ( 'cardheader__header__naving__ingredient');
    ingredDom.textContent = data;
    return (ingredDom);   
}
return { ingredient, makeIngredDOM }

}