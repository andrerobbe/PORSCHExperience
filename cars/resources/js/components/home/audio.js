import * as f from './../../functions';

const home = document.querySelector('.home .intro #start');
if (home) {
	// AUDIO
	let motorIsOn = false,
		drivenOff = false;
		
	const musicVol = 0.5,
		fadeTime = 400,
		music 				= new Audio('sounds/music.mp3'),
		audio_start_motor 	= new Audio('sounds/start_motor.mp3'),
		audio_gas_pedal 	= new Audio('sounds/gas_pedal.mp3'),
		audio_drive_off 	= new Audio('sounds/drive_off.mp3'),
		audioBtnSelector 	= $('.intro .audio');

 	music.volume = musicVol;
	music.loop = true;

	// Google Chrome prevents autoplay, sometimes ..
	// reload page if prevented
	// music plays after max 1 reload, sometimes noone is needed

	function playMusic(){
		let promise = music.play();
		if (promise !== undefined && !f.isPlaying(music) ){
			promise.then(_ => {
				// Autoplay started!
				audioBtnSelector.addClass('active');
			}).catch(error => {
				// Autoplay was prevented
				window.location.reload(false); //always works ..
				
				//f.simulate(document.querySelector("#fake_click"), "click");
				//setTimeout(playMusic, 500); // works after user interaction
			});
		}
	}
	playMusic();
	

	// START BUTTON CLICK
	$('.home .intro #start').click(function (e) {
		e.preventDefault();

		if (!drivenOff) {
			$('.intro .parallax.light').addClass('on');
			audioBtnSelector.removeClass('active');
			audioBtnSelector.addClass('disabled');

			$(music).animate({volume: 0}, 3000);
			setTimeout(function(){ music.pause() }, 3000);

			audio_drive_off.play();
			f.audioFadeOut(audio_start_motor, 300);
			f.audioFadeOut(audio_gas_pedal, 300);

			drivenOff = true;
		}
	});

	// START BUTTON HOVER
	$('.home .intro #start #discover').hover(
		// onMouseEnter
		function(){
			if( !$(this).hasClass('.disabled') ){ // check if loading finished
				$('.home .intro .parallax.light').addClass('show');
				// check if sound is enabled when using timeout playMusic
				if (f.isPlaying(music)) {
					if (!motorIsOn && !drivenOff) {
						audio_start_motor.play();
					}
					else if(!drivenOff) {
						f.audioFadeOut(audio_start_motor, 300);
						audio_gas_pedal.play();
					}
					motorIsOn = true;
				}
			}
			
		},// onMouseLeave
		function(){
			$('.home .intro .parallax.light').removeClass('show');
		}
	);

	// AUDIO BUTTON CLICK
	audioBtnSelector.click(function (e) {
		if (!drivenOff) {
			$(this).toggleClass('active');

			if ( $(this).hasClass('active') ){
				music.play();
				f.audioFadeIn(music, musicVol, fadeTime);
				f.audioFadeIn(audio_start_motor, 1, fadeTime);
				f.audioFadeIn(audio_gas_pedal, 1, fadeTime);
				f.audioFadeIn(audio_drive_off, 1, fadeTime);
			}
			else {
				f.audioFadeOut(music, fadeTime);
				f.audioFadeOut(audio_start_motor, fadeTime);
				f.audioFadeOut(audio_gas_pedal, fadeTime);
				f.audioFadeOut(audio_drive_off, fadeTime);
			}
		}
	});
}