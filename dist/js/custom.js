/*(function($) {
		var $pswp = $('.pswp')[0];

		
		var image = [];

		$('.owl-carousel .form-builder').each( function() {
				var $pic     = $(this),
						getItems = function() {
								var items = [];
								$pic.find('a.mfp-gallery-link').each(function() {
										var $href   = $(this).attr('href'),
												$size   = $(this).data('size').split('x'),
												$width  = $size[0],
												$height = $size[1];

										var item = {
												src : $href,
												w   : $width,
												h   : $height
										}

										items.push(item);
								});
								return items;
						}

				var items = getItems();

				$.each(items, function(index, value) {
						image[index]     = new Image();
						image[index].src = value['src'];
				});

				$pic.on('click', 'figure', function(event) {
						event.preventDefault();
						
						var $index = $(this).index();
						var options = {
								index: $index,
								bgOpacity: 0.7,
								showHideOpacity: true
						}

						var lightBox = new PhotoSwipe($pswp, PhotoSwipeUI_Default, items, options);
						lightBox.init();
				});
		});
})(jQuery);

*/



//Функция once для одноразового вызова окна при покидании страницы просмотра
function once(fn, context) { 
    var result;

    return function() { 
        if(fn) {
            result = fn.apply(context || this, arguments);
            fn = null;
        }

        return result;
    };
}




(function($){
	'use strict';
	
	$(document).ready(function(){

			$('.scrollto').click( function(){ // ловим клик по ссылке с классом go_to
			var scroll_el = $(this).attr('href'); // возьмем содержимое атрибута href, должен быть селектором, т.е. например начинаться с # или .
						if ($(scroll_el).length != 0) { // проверим существование элемента чтобы избежать ошибки
					$('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); // анимируем скроолинг к элементу scroll_el
						}
					return false; // выключаем стандартное действие
				});

				if ($(window).width() > 768)
				{
				var shirina = $(window).width()/10-60;
				$('.podrobnee').css('margin-top', shirina + 'px');

					$(window).resize(function () {
										 $('.podrobnee').css('margin-top', shirina + 'px');
							});
				}

			$('.owl-carousel').owlCarousel({
				loop:true,
				nav:true,
				navText: ["<img src='../images/arr-left.png'>","<img src='../images/arr-right.png'>"],
				margin:20,
				dots: false,
			autoplay: false,
			autoplayTimeout: 40000,
				responsive:{
					0:{
								items:1
						},
						500:{
								items:2
						},
						990:{
								items:3
						},
						1200:{
								items:4
						}
				}
		})
		
		// Callback
		//------------------------------------
		$('.js-callback').magnificPopup({
			type:'inline',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			autoFocusLast: false
		});

		

		$('.js-confid').click(function()
		{
				$('#popup-confid').toggle();
				$('.confid-fade').css('display','block');
		});

		$('.confid-fade').click(function()
		{
				$('#popup-confid').css('display','none');
				$('.confid-fade').css('display','none');
		});

		$('#popup-confid .close').click(function()
		{
				$('#popup-confid').css('display','none');
				$('.confid-fade').css('display','none');
		});

		$('.check-konfid').click(function()
		{
				if($(this).is(':checked'))
				{
					$(this).parent().find(".btn").removeAttr("disabled");
					$(this).parent().find(".btn").removeClass("disabled");
					
				}
				else
				{
					$(this).parent().find(".btn").attr("disabled", true);
					$(this).parent().find(".btn").addClass("disabled");

				}
		});




		//Три скрипта отправки формы с вызовом стилизованного окна при успешной отправке
		$('#form-callback').submit(function(e){
			e.preventDefault();

			$.ajax({
				url: "ajax/callback.php",
				data: $("#form-callback").serialize(),
				type: "POST",
				success: function() {
				$.magnificPopup.open({
					 items: {
			   		 src: '#popup-success',
			    		 type: 'inline',
			   		 mainClass: 'mfp-fade'
				  	}
					 
					});
				}
			});
		})

		$('#form-buy').submit(function(e){
			e.preventDefault();

			$.ajax({
				url: "ajax/callback.php",
				data: $("#form-buy").serialize(),
				type: "POST",
				success: function() {
				$.magnificPopup.open({
					 items: {
			   		 src: '#popup-success',
			    		 type: 'inline',
			   		 mainClass: 'mfp-fade'
				  	}
					 
					});
				}
			});
		})

		$('#form-offer').submit(function(e){
			e.preventDefault();

			$.ajax({
				url: "ajax/callback.php",
				data: $("#form-offer").serialize(),
				type: "POST",
				success: function() {
				$.magnificPopup.open({
					 items: {
			   		 src: '#popup-success',
			    		 type: 'inline',
			   		 mainClass: 'mfp-fade'
					  }
					 
					});
				}
			});
		})





		//Скрипт вызова окна при покидании страницы просмотра
		$(document).mouseleave(once(function() {
			if($('div').is('.mfp-bg')){
				return; 
			} else {
				$.magnificPopup.open({
			  	items: {
			    src: '#popup-offer',
			     type: 'inline',
			     mainClass: 'mfp-fade'
			  }
			 
				});
			}

		}

		));



		//Скрипт появления окна при бездействии пользователя
		var timerID = setTimeout(function(){
			  $.magnificPopup.open({
				  items: {
				    src: '#popup-offer',
				     type: 'inline',
				     mainClass: 'mfp-fade'
				  }
				});

			}, 30000);   //Менять задержку показа окна здесь.


		$('.js-callback').click(function () {
			    clearTimeout(timerID);
			});
		$('.mfp-order').click(function () {
			    clearTimeout(timerID);
			});






		
		$(".js-phone-mask").mask("+7 (999) 999-9999");
		
		// Top form
		//------------------------------------
		$('#form-special').submit(function(e){
			e.preventDefault();

			$.ajax({
				url: "ajax/request.php",
				data: $("#form-special").serialize(),
				type: "POST",
				success: function(data) {
					$('#form-special .result').html('')

					switch (data) {
						case 'empty_name':
						$("#form-special .result").html('<p class="error">Введите имя</p>');
						break;
						case 'empty_phone':
						$("#form-special .result").html('<p class="error">Введите номер телефона</p>');
						break;
						case 'error':
						$("#form-special .result").html('<p class="error">Произошла ошибка, повторите попытку позже</p>')
						break;
						case 'success':
						$('#form-special').addClass('success'); fbq('track', 'Lead');
						break;
					}
				},
				error: function(xhr, status, error) {
					alert('Произошла ошибка, повторите попытку позже')
				}
			});
		});


		$('#form-special2').submit(function(e){
			e.preventDefault();

			$.ajax({
				url: "ajax/request.php",
				data: $("#form-special2").serialize(),
				type: "POST",
				success: function() {
				$.magnificPopup.open({
					 items: {
			   		 src: '#popup-success',
			    		 type: 'inline',
			   		 mainClass: 'mfp-fade'
					  }
					 
					});
				}
			});
		})
		


		
		// Gallery
		//------------------------------------
		$('.gallery-section').magnificPopup({
			delegate: '.mfp-gallery-link',
			type: 'image',
			gallery: {
				enabled: true
			},
			removalDelay: 300,
			mainClass: 'mfp-fade',
			autoFocusLast: false
		});
		
		$('.builder-section').magnificPopup({
			delegate: '.mfp-gallery-link',
			type: 'image',
			gallery: {
				enabled: true
			},
			removalDelay: 300,
			mainClass: 'mfp-fade',
			autoFocusLast: false
		});
		
		$('.presentation').magnificPopup({
			delegate: '.mfp-gallery-link',
			type: 'image',
			gallery: {
				enabled: true
			},
			removalDelay: 300,
			mainClass: 'mfp-fade',
			autoFocusLast: false
		});
		
		$('.show-more').click(function(e){
			e.preventDefault();
			
			$(this).hide().next('.row-more').addClass('active')
		})
		
		

		// Order
		//------------------------------------
		$('.mfp-order').magnificPopup({
			type:'inline',
			removalDelay: 300,
			mainClass: 'mfp-fade',
			autoFocusLast: false,
		});

		$('.form-builder .mfp-order').click(function() {
			$('#param-price-text').text($(this).siblings('.pricesib').val());
			$('#preview-small').html($(this).siblings('.mfp-gallery-link').html());
			$('#model').val($(this).siblings('.description').text());
			$('#price').val($(this).siblings('.pricesib').val());
		});


		$('#form-order').submit(function(e){
			e.preventDefault();
			
			$.ajax({
				url: "ajax/order.php",
				data: $("#form-builder, #form-order").serialize(),
				type: "POST",
				success: function(data) {
					$('#form-order .result-message').html('')

					switch (data) {
						case 'empty_name':
						$("#form-order .result-message").html('<p class="error">Введите имя</p>');
						break;
						case 'empty_phone':
						$("#form-order .result-message").html('<p class="error">Введите номер телефона</p>');
						break;
						case 'error':
						$("#form-order .result-message").html('<p class="error">Произошла ошибка, повторите попытку позже</p>')
						break;
						case 'success':
						$('#form-order').hide();
						$('#form-delivery').addClass('active')
						break;
					}
				},
				error: function(xhr, status, error) {
					alert('Произошла ошибка, повторите попытку позже')
				}
			});
		})
		
		$('#form-delivery').submit(function(e){
			e.preventDefault();

			$.ajax({
				url: "ajax/order.php",
				data: $("#form-delivery").serialize(),
				type: "POST",
				success: function(data) {
					$('#form-delivery .result-message').html('')

					switch (data) {
						case 'empty_address':
						$("#form-delivery .result-message").html('<p class="error">Введите адрес</p>');
						break;
						case 'error':
						$("#form-delivery .result-message").html('<p class="error">Произошла ошибка, повторите попытку позже</p>')
						break;
						case 'success':
						$('#form-delivery').addClass('success'); fbq('track', 'Lead');
						break;
					}
				},
				error: function(xhr, status, error) {
					alert('Произошла ошибка, повторите попытку позже')
				}
			});
		})
		
		// Bottom form
		//------------------------------------
		$('#form-request').submit(function(e){
			e.preventDefault();

			$.ajax({
				url: "ajax/request.php",
				data: $("#form-request").serialize(),
				type: "POST",
				success: function(data) {
					$('#form-request .result').html('')

					switch (data) {
						case 'empty_name':
						$("#form-request .result").html('<p class="error">Введите имя</p>');
						break;
						case 'empty_phone':
						$("#form-request .result").html('<p class="error">Введите номер телефона</p>');
						break;
						case 'error':
						$("#form-request .result").html('<p class="error">Произошла ошибка, повторите попытку позже</p>')
						break;
						case 'success':
						$('#form-request').addClass('success'); fbq('track', 'Lead');
						break;
					}
				},
				error: function(xhr, status, error) {
					alert('Произошла ошибка, повторите попытку позже')
				}
			});
		})

		$('#form-request2').submit(function(e){
			e.preventDefault();

			$.ajax({
				url: "ajax/request.php",
				data: $("#form-request2").serialize(),
				type: "POST",
				success: function(data) {
					$('#form-request2 .result').html('')

					switch (data) {
						case 'empty_name':
						$("#form-request2 .result").html('<p class="error">Введите имя</p>');
						break;
						case 'empty_phone':
						$("#form-request2 .result").html('<p class="error">Введите номер телефона</p>');
						break;
						case 'error':
						$("#form-request2 .result").html('<p class="error">Произошла ошибка, повторите попытку позже</p>')
						break;
						case 'success':
						$('#form-request2').addClass('success'); fbq('track', 'Lead');
						break;
					}
				},
				error: function(xhr, status, error) {
					alert('Произошла ошибка, повторите попытку позже')
				}
			});
		})

		// Map
		//------------------------------------
		ymaps.ready(init);

		function init () {
			var myMap = new ymaps.Map("map", {
				center: [55.723394, 37.696022], 
				zoom: 15,
				controls: ['zoomControl']
			}),
			myPlacemark = new ymaps.Placemark([55.723394, 37.696022], {
					//balloonContentHeader: "Lorem ipsum",
					//balloonContentBody: "dolor sit amet, consectetur adipisicing elit",
					//balloonContentFooter: "footer"
				});

			myMap.geoObjects.add(myPlacemark);
			if (Modernizr.touchevents) {
				myMap.behaviors.disable('scrollZoom');
				myMap.behaviors.disable('drag');
			};
		};


	})
})(window.jQuery)