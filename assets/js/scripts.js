jQuery(document).ready(function () {

	/*
	 Top menu
	 */
	$('.show-menu a, .hide-menu a').tooltip();
	// show/hide menu
	$('.show-menu a').on('click', function (e) {
		e.preventDefault();
		$(this).fadeOut(100, function () {
			$('nav').slideDown();
		});
	});
	$('.hide-menu a').on('click', function (e) {
		e.preventDefault();
		$('nav').slideUp(function () {
			$('.show-menu a').fadeIn();
		});
	});
	// navigation
	$('nav a').on('click', function (e) {
		e.preventDefault();
		var element_class = $(this).attr('class');
		var scroll_to = 0;
		var nav_height = $('nav').height();
		if (element_class == 'menu-top') {
			scroll_to = $(".coming-soon").offset().top;
		} else if (element_class == 'menu-subscribe') {
			scroll_to = $(".subscribe").offset().top - nav_height - 60;
		} else if (element_class == 'menu-about-us') {
			scroll_to = $(".whos-behind").offset().top - nav_height - 60;
		} else if (element_class == 'menu-contact') {
			scroll_to = $(".contact").offset().top - nav_height - 60;
		}

		if ($(window).scrollTop() != scroll_to && element_class !== undefined) {
			$('html, body').animate({scrollTop: scroll_to}, 1000);
		}
	});

	/*
	 Background slideshow
	 */
	$('.coming-soon').backstretch([
		"assets/img/backgrounds/zoundify_bg3_blur.jpg",
    "assets/img/backgrounds/zoundify_bg4_blur.jpg",
    "assets/img/backgrounds/zoundify_bg5_blur.jpg"
	], {duration: 5000, fade: 1000});

	$('.about-container').backstretch("assets/img/backgrounds/2.jpg");

	$('.whos-behind-container').backstretch("assets/img/backgrounds/stage_team3_blur.jpg");

	/*
	 Google maps
	 */
	var position = new google.maps.LatLng(48.1975829, 16.3709795);
	$('.contact-address .map').gmap({
		'center': position, 'zoom': 15, 'disableDefaultUI': true, 'callback': function () {
			var self = this;
			self.addMarker({'position': this.get('map').getCenter()});
		}
	});

	/*
	 Contact form
	 */
	$('.contact-form form input[type="text"], .contact-form form textarea').on('focus', function () {
		$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
	});
	$('.contact-form form').submit(function (e) {
		e.preventDefault();
		$('.contact-form form input[type="text"], .contact-form form textarea').removeClass('contact-error');
		var postdata = $('.contact-form form').serialize();
		$.ajax({
			type: 'POST',
			url: 'assets/contact.php',
			data: postdata,
			dataType: 'json',
			success: function (json) {
				if (json.emailMessage != '') {
					$('.contact-form form .contact-email').addClass('contact-error');
				}
				if (json.subjectMessage != '') {
					$('.contact-form form .contact-subject').addClass('contact-error');
				}
				if (json.messageMessage != '') {
					$('.contact-form form textarea').addClass('contact-error');
				}
				if (json.emailMessage == '' && json.subjectMessage == '' && json.messageMessage == '') {
					$('.contact-form form').fadeOut('fast', function () {
						$('.contact-form').append('<p>Thanks for contacting us! We will get back to you very soon.</p>');
					});
				}
			}
		});
	});


});
