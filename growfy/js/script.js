document.addEventListener("click", documentClick);

function documentClick(e){
    const targetItem = e.target;

    if(targetItem.closest(".header__burger")){
        document.documentElement.classList.toggle('menu-open');
    }
}