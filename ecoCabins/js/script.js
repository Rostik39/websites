const swiper = new Swiper('.materials__slider', {
    // Optional parameters
    loop: true,
  
    // If we need pagination
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },
  });

  window.addEventListener("scroll", function(){
    if (scrollY > 0){
      this.document.querySelector(".header").classList.add("scroll")
    }else{
      this.document.querySelector(".header").classList.remove("scroll")
    }
  })