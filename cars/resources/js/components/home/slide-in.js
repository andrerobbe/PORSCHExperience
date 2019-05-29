$(function() {
    var c     = new ScrollMagic.Controller(),
        check = document.querySelector('.overview');

    if ( check ) {
        // HEADER SLIDE IN
        new ScrollMagic.Scene({
            triggerElement: ".overview",
            offset: - + $('header').outerHeight(true),
            triggerHook: 0,
        })
        .setClassToggle("header", "visible")
        .addTo(c);

        // SIDENAV SLIDE IN
        new ScrollMagic.Scene({
            triggerElement: ".overview",
            offset: - + $('header').outerHeight(true),
            triggerHook: 0,
        })
        .setClassToggle("#sideNav", "visible")
        .addTo(c);
    }
});