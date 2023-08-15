function  navingFactory(data){
  function makeNavingDOM () {
          const itemlist = document.createElement( 'li' );
          const itemlien = document.createElement( 'a' );
          itemlien.classList.add ('naving');
          itemlien.setAttribute ('href', "#");
          itemlien.innerHTML = data
          itemlist.appendChild(itemlien);

         
          return (itemlist);
  }
  return {  makeNavingDOM }
}
