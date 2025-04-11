document.addEventListener("DOMContentLoaded", function () {
    const options = {
      threshold: 0.3 // détecte dès qu'un élément est à 30% visible
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("visible");
        } else {
          entry.target.classList.remove("visible"); // permet de rejouer l'animation
        }
      });
    }, options);

    const fadeIns = document.querySelectorAll(".fade-in");
    const slideIns = document.querySelectorAll(".slide-in-left");

    fadeIns.forEach(el => observer.observe(el));
    slideIns.forEach((el, index) => {
      el.style.transitionDelay = `${index * 300}ms`; // plus lent que précédemment
      observer.observe(el);
    });
  });