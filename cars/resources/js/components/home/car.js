import * as f from './../../functions';

$.fn.createCar = function()
{
    var controller = new ScrollMagic.Controller(),
        check = document.querySelector('.overview');

    if ( check ) {
        // CONTENT FADE IN
        $('.overview section.car').each(function(){
            var id = '#' + this.id;

            // TITLE FADE
            var title = TweenMax.to(id + " .content .title", 0.4, {opacity: 1});
            new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.65,
                duration: "8%"
            })
            .setTween(title)
            .addTo(controller);

            // HR FADE
            var hr = TweenMax.to(id + " .content hr", 0.3, {opacity: 1});
            new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.35,
                duration: "8%"
            })
            .setTween(hr)
            .addTo(controller);

            // SVG FADE
            var svg_container = TweenMax.to(id + " .content .svg_container", 0.3, {opacity: 1}),
                fade_in_trigger = 0.25;
            new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: fade_in_trigger,
                duration: "8%"
            })
            .setTween(svg_container)
            .addTo(controller);

            // LINK FADE
            var link = TweenMax.to(id + " .content .model_link", 0.3, {opacity: 1});
            new ScrollMagic.Scene({
                triggerElement: this,
                triggerHook: 0.15
            })
            .setTween(link)
            .addTo(controller);


            /*
             * 
             * ANIMATE CAR NUMBERS
             * 
             * Loop through .svg_container
             * Retrieve data and store in variable data[i]
             * Overwrite default settings where neccesary
             * Overwrite updateHandler function as data[i] becomes undefined
             * Create tween and add to timeline
             */

            var numberTimeline  = new TimelineMax(),
                loopLength      = $(this).find('.svg_container > .svg').length,
                data            = {},
                duration        = f.rnd(1.4, 1.8),
                delay           = "-=" + (duration/2),
                delaySVG        = "-=" + duration;


            for(var i = 0; i < loopLength; i++){

                var element = $(this).find('.svg_container > .svg:nth-child(' + (i+1) +') .value');

                //skip to next loop if element doesn't exist
                if (element.length == 0) continue; 

                // SET DEFAULTS
                data[i] = {
                    'txt'         : element,
                    'animateTo'   : element.attr('data').split('.').join("").split(',').join("."),
                    'ellipse'     : $(this).find('.svg_container > .svg:nth-child(' + (i+1) +') svg ellipse'),
                    'startAt'     : { val: 0 },
                    'strokeStart' : "0, 1000",
                    'strokeEnd'   : "220, 1000",
                    'easing'      : Linear.easeNone
                };

                var updateHandler = function(){
                    console.log('no function for element ' + i);
                }

                // OVERWRITE DEFAULTS

                if (i == 0) {       // PRICE
                    data[i].startAt     = { val: (parseFloat(data[i].animateTo) + 15000) };
                    data[i].strokeStart = "300, 1000";
                    data[i].strokeEnd   = (data[i].animateTo) /515 + ", 1000";
                    data[i].easing      = Power1.easeOut;

                    var updateHandler = function(){
                        data[0].txt.html(f.thousandSeparator(data[0].startAt.val.toFixed(0)));
                    }
                }
                else if ( i == 1) { // SPEED
                    data[i].strokeEnd   = (parseInt(data[i].animateTo) - 125 )/0.635 + ", 1000";
                    data[i].easing      = Sine.easeOut;

                    var updateHandler = function(){
                        data[1].txt.html(data[1].startAt.val.toFixed(0));
                    }
                }
                else if ( i == 2) { // ACCELERATION
                    data[i].strokeEnd   = (8.5 - data[i].animateTo)/0.018 + ", 1000";

                    var updateHandler = function(){
                        data[2].txt.html(data[2].startAt.val.toFixed(1).split('.').join(","));
                    }
                }

                // CREATE TWEEN AND ADD TO TIMELINE
                numberTimeline.to(data[i].startAt, duration,
                    {
                        val: data[i].animateTo,
                        ease: data[i].easing,
                        onUpdate: updateHandler
                    },
                    delay
                );

                numberTimeline.fromTo(data[i].ellipse, duration,
                    { strokeDasharray: data[i].strokeStart },
                    { strokeDasharray: data[i].strokeEnd },
                    delaySVG
                );
            }

            /*
             * CREATE SCENE
             */
            new ScrollMagic.Scene({
                triggerElement: id,
                triggerHook: fade_in_trigger,
                //reverse: false
            })
            .setTween(numberTimeline)
            .addTo(controller);
        });
    }
}