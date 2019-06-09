import * as f from './../functions';
import * as imgSeq from './models/img-sequence';

f.scrollStopEventlistener();

// #sidenav + home logo
$('#sideNav a[href^="#"], .home a[href^="#intro"]').on('click', function(event) {
    let target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();

        f.scrollTo(target, 1500, 'easeInOutQuint', 0);
    }
});

//home start button
$('.home .intro #start').on('click', function (e) {
    e.preventDefault();
    let target = $(this).attr('data-car');
    target = $('.car[data-car="' + target + '"]');

    $('.home').removeClass('noscroll');
    f.scrollTo(target, 1500, 'easeInOutQuint', 0);
});


$('#scroll_indicator a[href^="#"]').on('click', function(event) {
    let target = $(this.getAttribute('href'));
    if( target.length ) {
        event.preventDefault();
        if (!$('home, body').is(':animated')) {
            let height = $('.scrollmagic-pin-spacer').outerHeight(true),
                offset = h - $('#model_nav').outerHeight(true),
                duration = (1-imgSeq.scrollPosition)*height;
            f.scrollTo(target, duration, 'linear', offset );
        }
    }
});