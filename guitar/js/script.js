const rewiewSwiper = document.querySelector('.swiper--rewiews');

if(rewiewSwiper){
    const swiper = new Swiper('.swiper--rewiews', {
        // Optional parameters
        loop: true,
      
        // If we need pagination
        pagination: {
          el: '.swiper-pagination',
        },
    });
}

window.addEventListener("scroll", ()=>{
    if(scrollY > 0){
        this.document.querySelector(".header").classList.add("scroll")
    }
    else{
        this.document.querySelector(".header").classList.remove("scroll")
    }
})
