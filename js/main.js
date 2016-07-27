$(function(){
	$('.btn-search-close').click(function(){
		$('.search-form').fadeOut('fast');
	});

	$('.btn-search').click(function(e){
		e.preventDefault();
		$('.search-form').fadeIn('fast');
	});

	$('.feature-banner .item').each(function(){
		$(this).css('background-image','url("'+$(this).find('img').attr('src')+'")');
	});

	$('.home-slider').owlCarousel({
	    loop:true,
	    margin:10,
	    nav:false,
	    items:1,
		autoplay:true,
		autoplayTimeout:5000,
		autoplayHoverPause:true,
		margin:0,
		dots:true
	});

	$('.occation-slider .occation-item,.occation-wrap .occation-item,.featured-occation .occation-item,.create-event-wrap .occation-item, .occation-wrap .occation-item').each(function(){
		$(this).css('background-image','url("'+$(this).find('img.bgImg').attr('src')+'")');
	});

	$(window).load(function(){
		$('.occation-slider').owlCarousel({
		    nav:false,
			dots:false,
			margin:10
			//autoWidth:true
			//loop:true
		})
	});

	/*==== Modal Vertically Function ====*/

	var modalVerticalCenterClass = ".modal";
	function centerModals($element) {
	    var $modals;
	    if ($element.length) {
	        $modals = $element;
	    } else {
	        $modals = $(modalVerticalCenterClass + ':visible');
	    }
	    $modals.each( function(i) {
	        var $clone = $(this).clone().css('display', 'block').appendTo('body');
	        var top = Math.round(($clone.height() - $clone.find('.modal-content').height()) / 2);
	        top = top > 0 ? top : 0;
	        $clone.remove();
	        $(this).find('.modal-content').css("margin-top", top);
	    });
	}
	$(document).on('show.bs.modal',modalVerticalCenterClass, function(e) {
	    centerModals($(this));
	});
	$(window).on('load resize', centerModals);

	/*==== Modal Vertically Function Ends ====*/

	$(document).on('click','.action-register',function(){
		$('.login-section').hide();
		$('.register-section').show();
	});

	$(document).on('click','.action-login',function(){
		$('.login-section').show();
		$('.register-section').hide();
	});


	/*===== Mobile Functionality =====*/

	if($('#main-menu').length > 0){
		$('body').append('<div class="mobile-overlay"></div>');
	}
	$('#main-menu').before('<div class="mobile-tigger"></div>');
	$('#main-menu > ul').prepend('<li class="mobile-header">Menu<span class="close-trigger"></span></li>');
	$('#main-menu > ul li').each(function(){
		if($(this).find('ul').length > 0){
			$(this).addClass('item-has-child');
			$(this).children('a').after('<div class="child-trigger"></div>');
		}
	});

	$('.mobile-tigger').click(function(){
		$('body').removeClass('mobile-out');
		$('body').addClass('mobile-in');
	});

	$('.close-trigger').click(function(){
		$('body').removeClass('mobile-in');
		$('body').addClass('mobile-out');
	});

	$(document).on('click touchstart','.mobile-overlay',function(){
		$('body').removeClass('mobile-in');
		$('body').addClass('mobile-out');
	});

	$('.child-trigger').click(function(){
		$(this).closest('li').siblings('li').find('ul').slideUp(250);
		$(this).closest('li').siblings('li').find('.child-trigger').removeClass('child-open');
		$(this).siblings('ul').slideToggle(250);
		$(this).toggleClass('child-open');
	});

	/*===== Store Section =====*/

	$('.store-description img').each(function(){
		$(this).after('<div class="bg-'+$(this).attr('class')+'" style="background-image:url('+$(this).attr('src')+');"></div>');
	});

	/*==== My Products =====*/

	$(document).on('click','.product-group > li > a',function(){
		$(this).parent('li').toggleClass('category-open');
		$(this).siblings('ul').slideToggle(250);
		$(this).parent('li').siblings('li').find('ul').slideUp(250);
		$(this).parent('li').siblings('li').removeClass('category-open')
	});

	/*==== Store Dashboard ====*/

	if($('.store-template .section-store-dashboard').length>0){
		$('body').addClass('store-dashboard-template');
	}

	$('.section-store-dashboard .store-order .order-listing img').each(function(){
		$(this).after('<div class="bg-'+$(this).attr('class')+'" style="background-image:url('+$(this).attr('src')+');"></div>');
	});

	$('.store-sales .sales-listing img').each(function(){
		$(this).after('<div class="bg-'+$(this).attr('class')+'" style="background-image:url('+$(this).attr('src')+');"></div>');
	});

	/*===== Store Sales Page ========*/

	$('.best-seller-slider').owlCarousel({
	    margin:0,
	    nav:false,
		dots:false,
		//items:4,
		responsive:{ 320:{ items:4 },768:{ items:7 } }
	});

	/*==== Store Search and History Page ======*/

	if($('.stickyfooter').length>0){
		$('body').find('footer.siteFooter').hide();
	}

	/*===== Event Menu =======*/

	$('.occation-item[data-event-name]').on('click',function(e) {
		e.preventDefault();
                var eventId     = $(this).data("event-id");
                var eventName   = $(this).data("event-name");
                $('#event_popup_heading').html(eventName);
                var loadingContent = getLoadingImage();
                $("#event_popup_ul").html(loadingContent);
                $.ajax({
                    url: "getSubEvents/"+eventId,
                    method: 'GET',
                    success: function(result) {
                    var content = prepareEventList(result);
                    $("#event_popup_ul").html(content);
                }});
		$(this).closest('[class$="-inner-wrap"]').find('.event-menu').fadeIn();
                $(this).closest('[class$="-inner-wrap"]').find('.occasion-menu').fadeIn();
	});
        
        $('.occation-item[data-occasion-name]').on('click',function(e){
            e.preventDefault();
                var occasionId     = $(this).data("occasion-id");
                var occasionName   = $(this).data("occasion-name");
                $('#occasion_popup_heading').html(occasionName);
                var loadingContent = getLoadingImage();
                $("#occasion_popup_ul").html(loadingContent);
                $.ajax({
                    url: getSubOccasionUrl + "/" + occasionId,
                    method: 'GET',
                    success: function(result) {
                    var content = prepareOccasionList(result);
                    $("#occasion_popup_ul").html(content);
                }});
		$(this).closest('[class$="-inner-wrap"]').find('.event-menu').fadeIn();
                $(this).closest('[class$="-inner-wrap"]').find('.occasion-menu').fadeIn();
        });

	$('.event-menu .close-event-menu').click(function(){
		$(this).parent('.event-menu').fadeOut();
	});

	$('.occasion-menu .close-occasion-menu').click(function(){
		$(this).parent('.occasion-menu').fadeOut();
	});

        function prepareEventList(result) {
            var html = '';
            $.each(result, function(key, value) {
                html = html + '<li><a href="'+ moodUrl +'/'+value.id +'/'+value.name.replace(/[\. ,:-]+/g, "-").toLowerCase()+'">'+value.name+'</a></li>';
            });
            return html;
        }
        
        function prepareOccasionList(result) {
            var html = '';
            $.each(result, function(key, value) {
                html = html + '<li><a href="'+ occasionUrl +'/'+value.id +'/'+value.name.replace(/[\. ,:-]+/g, "-").toLowerCase()+'">'+value.name+'</a></li>';
            });
            return html;
        }

        function getLoadingImage() {
            return "<img src='"+loadingImgUrl+"' />";
        }


	/*==== Create Event Description - Bought FOr =====*/

	$('.bought-frequency img').each(function(){
		$(this).after('<div class="bg-'+$(this).attr('class')+'" style="background-image:url('+$(this).attr('src')+');"></div>');
	});

	/*===== Fix For Sticky FOoter =====*/

	if($('.customer-content-section .stickyfooter').length<=0){
		$('.customer-content-section').addClass('no-sticky-footer');
	}

	$('.feature-banner').append('<div class="item" style="background-image:url('+$('.feature-banner .banner-img').attr('src')+')"></div>');

	/*===== My Order History Bookmark ======*/

	$(window).load(function(){
		var checkUrl = window.location.href;
		if (checkUrl.indexOf('#order-history-wrap') > -1) {
			$('ul.nav-tabs').find('li').removeClass('active');
			$('ul.nav-tabs a[href="#order-history-wrap"]').parent('li').addClass('active');

			$('.tab-content > div').removeClass('active').removeClass('in');
			$('.tab-content > div[id="order-history-wrap"]').addClass('active').addClass('in');
		}
	});

	/*-===== FAQ Accordian =======*/

	$('.section-faq .accr-title').on('click',function(){
		$(this).parent('li').siblings('li').removeClass('active');
		$(this).parent('li').siblings('li').find('.accr-content').slideUp(250);
		$(this).parent('li').toggleClass('active');
		$(this).siblings('.accr-content').slideToggle(250);
	});
        
        $('.section-faq ul li').first().addClass('active');
        $('.section-faq ul li').first().find('.accr-content').slideToggle();


	/*===== Order Basket ======*/

	$('.customer-basket-order-section .cart-products li ul.bucket-product').each(function(){
		$(this).closest('li').addClass('is-basket-order');
	});

	$('.customer-order-status .order-info ul li ul.bucket-product').each(function(){
		$(this).closest('li').addClass('is-basket-order');
	});

	$('.customer-basket-order-section .is-basket-order > .col-left > .product-name').on('click',function(){
		$(this).closest('li').find('.bucket-product').slideToggle(250);
		$(this).closest('li').toggleClass('active');
	});

	$('.customer-order-status .is-basket-order > .product-info > .product-name').on('click',function(){
		$(this).closest('li').find('.bucket-product').slideToggle(250);
		$(this).closest('li').toggleClass('active');
	});

	/*$(document).on('click','.remove-product',function(e){
		e.preventDefault();
		$(this).closest('li').addClass('product-remove');
		$(this).closest('li').animate({
			opacity : 0
		},300,function(){
			$('.product-remove').remove();
		});
	});*/

	/*===== Related Occation =======*/

	$('.related-occations ul li').each(function(){
		$(this).find('.bgImg').after('<div class="bgBanner" style="background-image:url('+$(this).find('.bgImg').attr('src')+');"></div>');
	});

	if ($('.search-cart').find('li').length >=3) {
		$('.search-cart').closest('.siteHeader').addClass('loginActive');
	}

	/*==== Cart Animation ======*/

	//var modalOffset = $('#cart-modal .modal-content');

	/*function modalAdjust(){
		$(modalOffset).css({
			top: -(modalOffset.offset().top+modalOffset.offset().left)
		});
	}

	$(window).on('load',modalAdjust);
	

	console.log($('#cart-modal .modal-content').offset().top);*/

})