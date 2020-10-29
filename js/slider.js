$(document).ready(function(){
	slideShow();
});


function slideShow(){
	var current = $('#aa-slider .show');
	var next = current.next().length ? current.next() : current.parent().children(':first');
  
	next.css('z-index',2);
	current.fadeOut(1500,function(){
	current.css('z-index',1).show().removeClass('show');
    next.css('z-index',3).addClass('show');
    });
}

$(document).ready(function(){
	setInterval('slideShow()', 4000);
});
