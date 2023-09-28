export function navingFactory(data, dataItem ) {
  console.log (data);
    const itemlist = document.createElement ('button');
    itemlist.setAttribute("class", dataItem);

    function makeNavingDOM () {
    itemlist.innerHTML = data;
    return itemlist;
  }

  return {makeNavingDOM};
}
