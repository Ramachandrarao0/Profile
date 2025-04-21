/** main js */ 

(function($) {

	"use strict";

	/* Preloader*/ 
   $(window).load(function() {

      // will first fade out the loading animation 
    	$("#loader").fadeOut("slow", function(){

        // will fade out the whole DIV that covers the website.
        $("#preloader").delay(300).fadeOut("slow");

      });       

  	})


  	/* FitText Settings */
  	setTimeout(function() {

   	$('#intro h1').fitText(1, { minFontSize: '42px', maxFontSize: '84px' });

  	}, 100);


	/* FitVids\*/ 
  	$(".fluid-video-wrapper").fitVids();


	/* Owl Carousel\ */ 
	$("#owl-slider").owlCarousel({
        navigation: false,
        pagination: true,
        itemsCustom : [
	        [0, 1],
	        [700, 2],
	        [960, 3]
	     ],
        navigationText: false
    });


	/* Alert Boxes\*/
	$('.alert-box').on('click', '.close', function() {
	  $(this).parent().fadeOut(500);
	});	


	/* Stat Counter*/
   var statSection = $("#stats"),
       stats = $(".stat-count");

   statSection.waypoint({

   	handler: function(direction) {

      	if (direction === "down") {       		

			   stats.each(function () {
				   var $this = $(this);

				   $({ Counter: 0 }).animate({ Counter: $this.text() }, {
				   	duration: 4000,
				   	easing: 'swing',
				   	step: function (curValue) {
				      	$this.text(Math.ceil(curValue));
				    	}
				  	});
				});

       	} 

       	// trigger once only
       	this.destroy();      	

		},
			
		offset: "90%"
	
	});	


	/*	Masonry*/
	var containerProjects = $('#folio-wrapper');

	containerProjects.imagesLoaded( function() {

		containerProjects.masonry( {		  
		  	itemSelector: '.folio-item',
		  	resize: true 
		});

	});


	/*	Modal Popup*/
   $('.item-wrap a').magnificPopup({

      type:'inline',
      fixedContentPos: false,
      removalDelay: 300,
      showCloseBtn: false,
      mainClass: 'mfp-fade'

   });

   $(document).on('click', '.popup-modal-dismiss', function (e) {
   	e.preventDefault();
   	$.magnificPopup.close();
   });

	
  	/* Navigation Menu*/  
   var toggleButton = $('.menu-toggle'),
       nav = $('.main-navigation');

   // toggle button
   toggleButton.on('click', function(e) {

		e.preventDefault();
		toggleButton.toggleClass('is-clicked');
		nav.slideToggle();

	});

   // nav items
  	nav.find('li a').on("click", function() {   

   	// update the toggle button 		
   	toggleButton.toggleClass('is-clicked'); 
   	// fadeout the navigation panel
   	nav.fadeOut();   		
   	     
  	});


  	/* Highlight the current section in the navigation bar*/
	var sections = $("section"),
	navigation_links = $("#main-nav-wrap li a");	

	sections.waypoint( {

       handler: function(direction) {

		   var active_section;

			active_section = $('section#' + this.element.id);

			if (direction === "up") active_section = active_section.prev();

			var active_link = $('#main-nav-wrap a[href="#' + active_section.attr("id") + '"]');			

         navigation_links.parent().removeClass("current");
			active_link.parent().addClass("current");

		}, 

		offset: '25%'
	});


  	/* Smooth Scrolling*/
  	$('.smoothscroll').on('click', function (e) {
	 	
	 	e.preventDefault();

   	var target = this.hash,
    	$target = $(target);

    	$('html, body').stop().animate({
       	'scrollTop': $target.offset().top
      }, 800, 'swing', function () {
      	window.location.hash = target;
      });

  	});  
  

	/*  Placeholder Plugin Settings*/ 
	$('input, textarea, select').placeholder()  


	/*	contact form */

	/* local validation */
	$('#contactForm').validate({

		/* submit via ajax */
		submitHandler: function(form) {

			var sLoader = $('#submit-loader');

			$.ajax({      	

		      type: "POST",
		      url: "inc/sendEmail.php",
		      data: $(form).serialize(),
		      beforeSend: function() { 

		      	sLoader.fadeIn(); 

		      },
		      success: function(msg) {

	            // Message was sent
	            if (msg == 'OK') {
	            	sLoader.fadeOut(); 
	               $('#message-warning').hide();
	               $('#contactForm').fadeOut();
	               $('#message-success').fadeIn();   
	            }
	            // There was an error
	            else {
	            	sLoader.fadeOut(); 
	               $('#message-warning').html(msg);
		            $('#message-warning').fadeIn();
	            }

		      },
		      error: function() {

		      	sLoader.fadeOut(); 
		      	$('#message-warning').html("Something went wrong. Please try again.");
		         $('#message-warning').fadeIn();

		      }

	      });     		
  		}

	});


 	
  	/* Back to top */
	var pxShow = 300; 
	var fadeInTime = 400; 
	var fadeOutTime = 400; 
	var scrollSpeed = 300; 
   // Show or hide the sticky footer button
	jQuery(window).scroll(function() {

		if (!( $("#header-search").hasClass('is-visible'))) {

			if (jQuery(window).scrollTop() >= pxShow) {
				jQuery("#go-top").fadeIn(fadeInTime);
			} else {
				jQuery("#go-top").fadeOut(fadeOutTime);
			}

		}		

	});		

})(jQuery);






document.addEventListener('DOMContentLoaded', function() {
	// Fetch the JSON data
	fetch('portfolio-data.json')
	  .then(response => response.json())
	  .then(data => {
		const portfolioGrid = document.querySelector('.portfolio-grid');
		const portfolioContent = document.querySelector('.portfolio-content');
		
		// Clear existing items
		portfolioGrid.innerHTML = '';
		
		// Create portfolio items from JSON data
		data.portfolioItems.forEach(item => {
		  const portfolioItem = document.createElement('div');
		  portfolioItem.className = 'portfolio-item';
		  portfolioItem.setAttribute('data-category', item.category);
		  
		  portfolioItem.innerHTML = `
			<div class="item-wrap">
			  <img src="${item.imageSrc}" alt="${item.title}">
			  <a href="#${item.id}" class="overlay">
				<div class="folio-item-table">
				  <div class="folio-item-cell">
					<h3 class="folio-title">${item.title}</h3>
					<span class="folio-types">${item.types}</span>
				  </div>
				</div>
			  </a>
			</div>
		  `;
		  
		  portfolioGrid.appendChild(portfolioItem);
		});
		
		// Create modals container if it doesn't exist
		let modalsContainer = document.querySelector('.modals-container');
		if (!modalsContainer) {
		  modalsContainer = document.createElement('div');
		  modalsContainer.className = 'modals-container';
		  portfolioContent.appendChild(modalsContainer);
		}
		modalsContainer.innerHTML = '';
		
		// Create modals from JSON data
		data.portfolioItems.forEach(item => {
		  const modal = document.createElement('div');
		  modal.id = item.id;
		  modal.className = 'popup-modal mfp-hide';
		  
		  modal.innerHTML = `
			<div class="media">
			  <img src="${item.imageSrc}" alt="${item.title}" />
			</div>
			<div class="description-box">
			  <h4>${item.title}</h4>
			  <p>${item.description}</p>
			  <div class="categories">${item.categories}</div>
			</div>
			<div class="link-box">
			  ${item.demoLink !== '#' ? `<a href="${item.demoLink}">${item.demoText}</a>` : ''}
			  <a href="#" class="popup-modal-dismiss">Close</a>
			</div>
		  `;
		  
		  modalsContainer.appendChild(modal);
		});
		
		// Initialize filter buttons
		initFilterButtons();
		
		// REINITIALIZE MAGNIFIC POPUP (or your modal plugin)
		initModals();
	  })
	  .catch(error => console.error('Error loading portfolio data:', error));
  });
  
  function initFilterButtons() {
	const filterBtns = document.querySelectorAll('.filter-btn');
	
	filterBtns.forEach(btn => {
	  btn.addEventListener('click', function() {
		filterBtns.forEach(b => b.classList.remove('active'));
		this.classList.add('active');
		
		const filterValue = this.getAttribute('data-filter');
		const portfolioItems = document.querySelectorAll('.portfolio-item');
		
		portfolioItems.forEach(item => {
		  item.style.display = (filterValue === 'all' || item.getAttribute('data-category') === filterValue) 
			? 'block' 
			: 'none';
		});
	  });
	});
  }
  
  function initModals() {
	// Initialize Magnific Popup (or your preferred modal plugin)
	$('.portfolio-grid').magnificPopup({
	  delegate: 'a.overlay',
	  type: 'inline',
	  fixedContentPos: true,
	  fixedBgPos: true,
	  overflowY: 'auto',
	  closeBtnInside: true,
	  preloader: false,
	  midClick: true,
	  removalDelay: 300,
	  mainClass: 'my-mfp-zoom-in',
	  callbacks: {
		open: function() {
		  // Add your custom open callbacks if needed
		},
		close: function() {
		  // Add your custom close callbacks if needed
		}
	  }
	});
	
	// Close button functionality
	$(document).on('click', '.popup-modal-dismiss', function(e) {
	  e.preventDefault();
	  $.magnificPopup.close();
	});
  }

 