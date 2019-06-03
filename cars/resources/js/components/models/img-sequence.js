$(function () {
	var c	= new ScrollMagic.Controller(),
	check 	= document.querySelector('body.models #image_sequence');

	if ( check ) {
		var images = [],
			obj = {curImg: 0}

		// fill image array
		for ( var i = 1; i <= imageSequenceCounter; i++) {
			var img = "../img/" + imageSequenceModel + "/sequence/" + i + ".webp";
			images.push(img);
		}

		var imageTween = TweenMax.to(obj, 0.5,
			{
				curImg: images.length - 1,	// animate propery curImg to number of images
				roundProps: "curImg",	// round to integers so it can be used as an array index
				immediateRender: true,	// load first image automatically
				onUpdate: function () {
					$("#image_sequence img").attr("src", images[obj.curImg]);
				}
			}
		);

		new ScrollMagic.Scene({
			triggerElement: "#image_sequence",
			triggerHook: 0,
			duration: (imageSequenceCounter * 50),
			offset: - + $('header').outerHeight(true),
		})
		.setTween(imageTween)
		.setPin('#image_sequence', {pushFollowers: true})
		.addTo(c);
	}
});