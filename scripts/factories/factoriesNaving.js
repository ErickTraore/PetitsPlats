function navingFactory (data) {
  console.log (data);

  function makeNavingDOM () {
    const itemlist = document.createElement ('div');
    // itemlist.classList.add (
    //   'card__header__naving__columnOne__header__modal__list__item'
    // );
      itemlist.classList.add (
        'naving'
        );
    itemlist.innerHTML = data;

    return itemlist;
  }
  return {makeNavingDOM};
}
