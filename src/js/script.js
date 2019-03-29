var mainNav = document.getElementById('mainNav');
var navbarNav = document.getElementById('navbarResponsive');

navbarNav .addEventListener('show.bs.collapse', function (event) {
   mainNav.classList.add('open');
   console.log('item');
}, false);

navbarNav .addEventListener('hide.bs.collapse', function (event) {
    mainNav.classList.remove('open');
}, false);
