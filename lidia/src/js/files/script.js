// Підключення функціоналу "Чертоги Фрілансера"
import { isMobile } from "./functions.js";
// Підключення списку активних модулів
import { flsModules } from "./modules.js";

window.addEventListener("scroll", function(){
    if (scrollY > 0){
      this.document.querySelector(".header").classList.add("scroll")
    }else{
      this.document.querySelector(".header").classList.remove("scroll")
    }
  })