$('#mainNav').on('show.bs.collapse', function () {
    $('#mainNav').addClass('open');
});

$('#mainNav').on('hide.bs.collapse', function () {
    $('#mainNav').removeClass('open');
});