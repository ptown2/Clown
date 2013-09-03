/*
	Name:
		CLOWN.js

	By:
		ptown2 (Robert Lind)

	Description:
		Wow this sucks shit dicks.
*/

//Settings
var ready = false;
var altpos = 6;			// How many percentage in pixels should the clown move?
var srperlyr = 165;		// How many stars per layer div should exist?
var numpanels = 3;		// How many panels of stars should exist? (REQ. 2 or more)


// Some PERMA settings.
var HONK = new Audio('sounds/clownhorn.wav');
var clownhonks = parseInt(0);


// Name: Start Space
// Function: start_Space
// Purpose: Initialises the SS13 clown simulation js

function start_Space() {
	ready = true;

	clown_MoveStart();
	clown_MoveRotate(0.15);

	for (var a=0; a < numpanels; a++) {
		var panel = document.createElement('div');
		$(panel).attr('class', 'panel');
		$(panel).attr('id', 'panel' + a);

		$(panel).css({left:'-' + ( a * 100 ) + '%', top:'0px', width:'100%', height:'100%'});
		$('body').append(panel);

		for (var i=0; i < srperlyr; i++) {
			var starsize = 2.5 + (Math.random() * 2) + 'px';
			var scrh = (Math.random() * 100) + '%', scrw = (Math.random() * 100) + '%';

			var star = document.createElement('span');
			$(star).attr('class', 'star');
			$(star).attr('id', 'star' + i);

			$(star).css({left:scrw, top:scrh, width:starsize, height:starsize});
			$(panel).append(star);
		}

		star_Move(panel);
	}
}


// Name: Star Move
// Function: star_Move(object-element)
// Purpose: Moves the layer of stars to the right, returns back to the end.

function star_Move(elem){
	if ($(elem).offset().left >= ($('body').width() * 0.98)) {
		$(elem).css({top: '0px', left: '-' + (numpanels - 1) * 100  + '%'}); 
	}

	$(elem).animate({'left':'+=100%'}, {
		easing: 'linear',
		duration: 1000,
		complete: function() { star_Move(elem) } // Why do I need to do this when it shouldn't EXCEED STACKS!!!
	});
}


// Name: Clown Functions
// Function: clown_MoveStart, clown_MoveAlternating(bool), clown_MoveRotate
// Purpose: HONK!

function clown_Honk() {
	if (!ready) { return false; }

	clownhonks += 1;
	$('#clownhonks').html(clownhonks + ' clown honkes.');

	HONK.play();
}

function clown_MoveStart() {
	$('#clown').stop()
	$('#clown').animate({top:'-=' + altpos +  '%'}, 3000, function() { clown_MoveAlternating(false) });
}

function clown_MoveAlternating(bUp) {
	var newpos = (bUp ? '-' : '+') + '=' + ( altpos * 2 ) + '%'

	$('#clown').stop()
	$('#clown').animate({top:newpos}, 6000, function() { clown_MoveAlternating(!bUp) });
}

// Since the jQuery doesn't support YET translations, we force it. Old style.
function clown_MoveRotate(rate) {
	var curtime = (new Date().getTime() / 10), r = (curtime * rate % 360);

	$('#clown').css({
		transform:'rotate('+r+'deg)',
		mozTransform:'rotate('+r+'deg)',
		webkitTransform:'rotate('+r+'deg)',
		msTransform:'rotate('+r+'deg)',
		oTransform:'rotate('+r+'deg)',
	});

	setTimeout(function() { clown_MoveRotate(rate) }, 50);
}


// Loaded? Give it two seconds for extra security.
$(document).ready(function(){
	setTimeout(start_Space, 2000);
});
