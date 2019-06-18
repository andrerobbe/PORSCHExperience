const   controllerX = new ScrollMagic.Controller(),
        controllerY = new ScrollMagic.Controller({vertical: false}),
        check       = document.querySelector('#mission-e');

if ( check ) {
    // BACKGROUND COLOR
    let bg = new TimelineMax()
    .to("#mission-e", 0.4, {backgroundColor: '#000'})
    .to(".home .overview", 0.4, {backgroundColor: '#000'}, 0);

    new ScrollMagic.Scene({
        triggerElement: "#mission-e",
        triggerHook: 0.8,
    })
    .setTween(bg)
    .addTo(controllerX);

    // FADE IN TEASER TXT
    let fadeAnimation = new TimelineMax()
    .staggerTo("#mission-e .title .fade", 0.3, {opacity: 1}, 0.4);

    new ScrollMagic.Scene({
        triggerElement: "#mission-e .title",
        triggerHook: 0.6
    })
    .setTween(fadeAnimation)
    .addTo(controllerX);

     // FADE IN SCROLL MOUSE
    new ScrollMagic.Scene({
        triggerElement: "#mission-e .title",
        triggerHook: 0.5,
        duration: "58%"
    })
    .setClassToggle('#mission-e .title .mouse_parent', 'show')
    .addTo(controllerX);


    // MOVEMENT PANELS
    // number at end => moves at same time as prev tween
    let wipeAnimation = new TimelineMax()
    .fromTo("#sequence .panel.p1", 1, {x: "100%"}, {x: "0%", ease: Linear.easeNone})
    .fromTo("#sequence .panel.p1 img", 1, {x: "0"}, {x: "100%", ease: Linear.easeNone}, 0)
    .fromTo("#sequence .panel.p2", 1, {x: "-100%"}, {x: "0%", ease: Linear.easeNone})
    .fromTo("#sequence .panel.p2 img", 1, {x: "0"}, {x: "-100%", ease: Linear.easeNone}, 1)
    .fromTo("#sequence .panel.p3", 1, {x:  "-100%"}, {x: "0%", ease: Linear.easeNone})
    .fromTo("#sequence .panel.p3 img", 1, {x:  "0%"}, {x: "-100%", ease: Linear.easeNone}, 2)
    .fromTo("#sequence .panel.p4", 1, {x:  "-100%"}, {x: "0%", ease: Linear.easeNone})
    .fromTo("#sequence .panel.p4 img", 1, {x:  "0%"}, {x: "-100%", ease: Linear.easeNone}, 3)
    .fromTo("#sequence .panel.p5", 1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})
    .fromTo("#sequence .panel.p5 img", 1, {x:  "0%"}, {x: "100%", ease: Linear.easeNone}, 4)
    .fromTo("#sequence .panel.p6", 1, {x:  "100%"}, {x: "0%", ease: Linear.easeNone})
    .fromTo("#sequence .panel.p6 img", 1, {x:  "0%"}, {x: "100%", ease: Linear.easeNone}, 5),

    amountOfPanels  = document.querySelectorAll('#sequence .panel').length,
    showForPercent  = 66.6,
    wipeDuration    = amountOfPanels * showForPercent + '%';

    // create scene to pin and link animation
    new ScrollMagic.Scene({
        triggerElement: "#mission-e #sequence",
        triggerHook: "onLeave",
        duration: wipeDuration
    })
    .setPin("#mission-e #sequence")
    .setTween(wipeAnimation)
    .addTo(controllerX);


    // FADE IN TXT AFTER IMG
    let reveal_txt = TweenMax.to("#mission-e #mission_reveal", 0.4, {opacity: 1});

    new ScrollMagic.Scene({
        triggerElement: "#mission-e #sequence",
        triggerHook: 0,
        offset: h* showForPercent/100 * (amountOfPanels-1),
        duration: showForPercent + '%'
    })
    .setTween(reveal_txt)
    .addTo(controllerX);

    //CONTENT AFTER FADE IN
    let infoTween = TweenMax.fromTo("#mission-e .info .row", .5, {y: "10%", opacity: 0}, {y: "0%", opacity: 1, immediateRender: false})

    new ScrollMagic.Scene({
        triggerElement: "#mission-e .info .row",
        triggerHook: 0.8,
        reverse: false
    })
    .setTween(infoTween)
    .addTo(controllerX);
}