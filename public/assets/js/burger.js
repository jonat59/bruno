console.log('ok');
document.addEventListener('DOMContentLoaded', function() {
    initMobileMenu();
  });
  
  const toggleNavMobile = () => {
    let navMobile = document.querySelector('nav > #nav');
    let menuToggle = document.querySelector('#menu-toggle');
    let menuIcon = document.querySelector('#menu-toggle .icon i');
    
    navMobile.classList.toggle('active');
    
    // Mettre à jour l'état d'aria-expanded
    const isExpanded = navMobile.classList.contains('active');
    menuToggle.setAttribute('aria-expanded', isExpanded);
    
    // Changer l'icône selon l'état du menu
    if (isExpanded) {
      menuIcon.classList.remove('fa-burger'); // Hamburger pour ouvrir
      menuIcon.classList.add('fa-xmark'); // X pour fermer
    } else {
      menuIcon.classList.remove('fa-xmark'); // X pour fermer
      menuIcon.classList.add('fa-burger'); // Hamburger pour ouvrir
    }
  };
  
  const closeMenu = () => {
    let navMobile = document.querySelector('nav > #nav');
    let menuToggle = document.querySelector('#menu-toggle');
    let menuIcon = document.querySelector('#menu-toggle .icon i');
    
    navMobile.classList.remove('active');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuIcon.classList.remove('fa-xmark'); // X pour fermer
    menuIcon.classList.add('fa-burger');
  };
  
  function initMobileMenu() {
    if (window.matchMedia('(max-width: 768px)').matches) {
      let toggleNav = document.querySelector('#menu-toggle');
      toggleNav.style.cursor = 'pointer';
      toggleNav.addEventListener('click', toggleNavMobile);
      
      // Event listeners pour fermer le menu
      let main = document.querySelector('main');
      if (main) {
        main.addEventListener('click', closeMenu);
      }
      
      let navLinks = document.querySelectorAll('nav > #nav > ul > li > a');
      navLinks.forEach((navLink) => {
        navLink.addEventListener('click', closeMenu);
      });
    }
    
    // Ajouter un événement de redimensionnement pour ajuster le menu au besoin
    window.addEventListener('resize', function() {
      // Réinitialiser le menu si la fenêtre est redimensionnée
      if (!window.matchMedia('(max-width: 768px)').matches) {
        let navMobile = document.querySelector('nav > #nav');
        let menuToggle = document.querySelector('#menu-toggle');
        let menuIcon = document.querySelector('#menu-toggle .icon i');
        
        navMobile.classList.remove('active');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuIcon.className = 'fa-solid fa-burger';
      }
    });
  }
  