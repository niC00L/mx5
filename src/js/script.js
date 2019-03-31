var mainNav = document.getElementById('mainNav');
var navbarNav = document.getElementById('navbarResponsive');

navbarNav.addEventListener('show.bs.collapse', function (event) {
    mainNav.classList.add('open');
    console.log('item');
}, false);

navbarNav.addEventListener('hide.bs.collapse', function (event) {
    mainNav.classList.remove('open');
}, false);


window.onscroll = function changeClass() {
    var scrollPosY = window.pageYOffset | document.body.scrollTop;
    if (scrollPosY > 10) {
        mainNav.classList.add('background');
    } else if (scrollPosY <= 10) {
        mainNav.classList.remove('background');
    }
};