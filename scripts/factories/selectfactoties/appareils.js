function  appareilsFactory(data){
    const { appareil }  = data;
    
    function makeAppareilDOM () {

        
    const appareilDom = document.createElement('option');
    appareilDom.classList.add ( 'cardheader__header__naving__appareil');
    appareilDom.textContent = data;
    return (appareilDom);   
}
return { appareilient, makeappareilDOM }

}