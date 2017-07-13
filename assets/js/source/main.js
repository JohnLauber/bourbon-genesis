(function($) {

	// all Javascript code goes here
  $(document).ready(function(){
    $('.home #clipper, .home #fale').addClass('animated fadeInRight');
    $('#clipper-sub').addClass('animated swing');
    $('#clipper').one('webkitAnimationEnd mozAnimationEnd MSAnimationEnd oanimationend animationend', function() {
        $(this).removeClass("animated fadeInRight");
        $(this).addClass('animated swing');
    });

    new WOW().init();
    
  });

})(jQuery);
