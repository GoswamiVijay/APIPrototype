$(document).ready(function(){

	var height = $(window).height();
	  $(window).scroll(function() {
	  	if($('.title5').offset() && $('.title5').offset().top){
			if($(window).scrollTop()+(height-height/5)>=$('.title5').offset().top){
				if(!$('.title5').hasClass('FadeIn')){
					$('.title5').addClass('FadeIn').delay(50).queue(function(){
						$('#anim-obj14').addClass('FadeIn');
					});
			  }
			}
			
			if($(window).scrollTop()+(height-height/5)>=$('.title4').offset().top){
				if(!$('.title4').hasClass('FadeIn')){
					$('.title4').addClass('FadeIn').delay(50).queue(function(){
						$('#anim-obj6').addClass('fadeInLeft').delay(50).queue(function(){
							$('#anim-obj7').addClass('FadeIn').delay(50).queue(function(){
								$('#anim-obj8').addClass('FadeIn').delay(50).queue(function(){
									$('#anim-obj9').addClass('fadeInRight').delay(50).queue(function(){
										$('#anim-obj10').addClass('fadeInRight').delay(50).queue(function(){
											$('#anim-obj11').addClass('fadeInRight').delay(50).queue(function(){
												$('#anim-obj12').addClass('fadeInRight').delay(50).queue(function(){
													$('#anim-obj13').addClass('FadeIn');
												});
											});
										});
									});
								});
							});
						});
					});
			  }
			}
			
			if($(window).scrollTop()+(height-height/5)>=$('.title3').offset().top){
				if(!$('.title3').hasClass('FadeIn')){
					$('.title3').addClass('FadeIn').delay(25).queue(function(){
						$('#owl-testimonial').addClass('FadeIn').delay(25);
					});
			  }
			}
			
			if($(window).scrollTop()+(height-height/5)>=$('#anim-obj5').offset().top){
				if(!$('#anim-obj5').hasClass('FadeIn')){
					$('#anim-obj5').addClass('FadeIn').delay(25);
			  }
			}
			
			if($(window).scrollTop()+(height-height/5)>=$('#anim-obj3').offset().top){
				if(!$('#anim-obj3').hasClass('FadeIn')){
					$('#anim-obj3').addClass('FadeIn').delay(25).queue(function(){
						$('#anim-obj4').addClass('FadeIn').delay(25);
					});
			  }
			}
			
			if($(window).scrollTop()+(height-height/5)>=$('.therapist1').offset().top){
				if(!$('.therapist1').hasClass('bounce-top1')){
					$('#anim-obj1').addClass('FadeIn').delay(50).queue(function(){
						$('.therapist1').addClass('bounceIn').delay(50).queue(function(){
							$('.therapist2').addClass('bounceIn').delay(50).queue(function(){
								$('.therapist3').addClass('bounceIn').delay(50).queue(function(){
									$('.therapist4').addClass('bounceIn').delay(50).queue(function(){
										$('#anim-obj2').addClass('FadeIn').delay(50).queue(function(){
											$('.therapist5').addClass('bounceIn').delay(50).queue(function(){
												$('.therapist6').addClass('bounceIn').delay(50).queue(function(){
													$('.therapist7').addClass('bounceIn').delay(50).queue(function(){
														$('.therapist8').addClass('bounceIn');
													});
												});
											});
										});
									});
								});
							});
						});
					});
			  }
			}
			
			
			if($(window).scrollTop()+(height-height/5)>=$('.title2').offset().top){
				if(!$('.title2').hasClass('FadeIn')){
					$('.title2').addClass('FadeIn').delay(5);
			  }
			}
			
			
			if($(window).scrollTop()+(height-height/5)>=$('.services13').offset().top){
				if(!$('.services13').hasClass('FadeIn-services3')){
					$('.services13').addClass('FadeIn-services3').delay(5);
			  }
			}
			
			if($(window).scrollTop()+(height-height/5)>=$('.services12').offset().top){
				if(!$('.services12').hasClass('FadeIn-services2')){
					$('.services12').addClass('FadeIn-services2').delay(5);
			  }
			}
			
			
			if($(window).scrollTop()+(height-height/5)>=$('.services11').offset().top){
				if(!$('.services11').hasClass('FadeIn-services1')){
					$('.services11').addClass('FadeIn-services1').delay(5);
			  }
			}
			
			
			if($(window).scrollTop()+(height-height/5)>=$('.title1').offset().top){
				if(!$('.title1').hasClass('FadeIn')){
					$('.title1').addClass('FadeIn').delay(5);
			  }
			}
	  	}
	  });
	});

	
  