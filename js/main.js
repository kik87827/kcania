$(window).on("load",function(){
	mcContents();
});

$(function(){
	mcftab();
});

function mcContents(){
	var exrecom_swiper_obj = null;
	var $mc_flowline = $(".mc_flowline");
	var $exrecom_decocir = $(".exrecom_decocir");
	var $exrecom_decocir_height = $exrecom_decocir.length ? $exrecom_decocir.height() : 0;
	var $exrecom_pos = $exrecom_decocir.length ? $exrecom_decocir.position().top : 0;
	var $exrecom_swiper = $(".exrecom_swiper");
	var $exrecom_swiper_slide = $(".exrecom_swiper .exrecom_slide");

	

	if($exrecom_swiper_slide.length>5){
		exrecom_swiper_obj = new Swiper(".exrecom_swiper", {
			slidesPerView: 5,
			loop : true,
			navigation: {
				nextEl: "#exrecom_swiper_zone .flow_right .btn_flowcontrol",
				prevEl: "#exrecom_swiper_zone .flow_left .btn_flowcontrol",
			},
			breakpoints: {
				// 1023px 보다 클 경우
				1023: {
					slidesPerView: 2
				}
			},
			on : {
				init : function(){
					exrecomResize();
				},
				resize : function(){
					exrecomResize();
				}
			}
		});
	}else{
		$("#exrecom_swiper_zone .btn_flowcontrol_w").hide();
	}

	function exrecomResize(){
		$("#exrecom_swiper_zone .btn_flowcontrol_w").css({"height" : $("#exrecom_swiper_zone .exrecom_thum").outerHeight()});
		$exrecom_pos = $exrecom_decocir.length ? $exrecom_decocir.position().top : 0;
		$mc_flowline.css({"top" : "" }).addClass("active");
		$mc_flowline.css({"top" : $exrecom_pos + ($exrecom_decocir_height/2)});
	}
	
	var exrecom_sm01_obj = null;
	var exrecom_sm02_obj = null;
	var $exrecom_sm01_swiper = $("#exrecom_sm01 .exrecom_sm_swiper");
	var $exrecom_sm02_swiper = $("#exrecom_sm02 .exrecom_sm_swiper");

	var $exrecom_sm01_swiper_slide = $("#exrecom_sm01 .exrecom_sm_slide");
	var $exrecom_sm02_swiper_slide = $("#exrecom_sm02 .exrecom_sm_slide");
	if($exrecom_sm01_swiper_slide.length>3){
		exrecom_sm01_obj = new Swiper("#exrecom_sm01 .exrecom_sm_swiper", {
			slidesPerView: 3,
			loop : true,
			navigation: {
				nextEl: "#exrecom_sm01 .flow_right .btn_flowcontrol",
				prevEl: "#exrecom_sm01 .flow_left .btn_flowcontrol",
			},
			breakpoints: {
				1023: {
					slidesPerView: 2
				}
			},
			on : {
				init : function(){
					exrecomSmResize();
				},
				resize : function(){
					exrecomSmResize();
				}
			}
		});
	}else{
		$("#exrecom_sm01 .btn_flowcontrol_w").hide();
	}
	if($exrecom_sm02_swiper_slide.length>3){
		exrecom_sm02_obj = new Swiper("#exrecom_sm02 .exrecom_sm_swiper", {
			slidesPerView: 3,
			loop : true,
			navigation: {
				nextEl: "#exrecom_sm02 .flow_right .btn_flowcontrol",
				prevEl: "#exrecom_sm02 .flow_left .btn_flowcontrol",
			},
			breakpoints: {
				1023: {
					slidesPerView: 2
				}
			},
			on: {
				init: function () {
					exrecomSmResize();
				},
				resize: function () {
					exrecomSmResize();
				}
			}
		});
	}else{
		$("#exrecom_sm02 .btn_flowcontrol_w").hide();
	}


	function exrecomSmResize() {
		$("#exrecom_sm01 .btn_flowcontrol_w, #exrecom_sm02 .btn_flowcontrol_w").css({ "height": $("#exrecom_sm01 .exrecom_thum,#exrecom_sm02 .exrecom_thum").outerHeight() });
	}

	var mcgallery_obj = null;
	var $mcgallery_swiper = $("#mcgallery_zone .mcgallery_swiper");
	var $mcgallery_swiper_slide = $("#mcgallery_zone .mcgallery_slide");
	if($mcgallery_swiper_slide.length>4){
		exrecom_sm01_obj = new Swiper("#mcgallery_zone .mcgallery_swiper", {
			slidesPerView: 4,
			loop : true,
			navigation: {
				nextEl: "#mcgallery_zone .flow_right .btn_flowcontrol",
				prevEl: "#mcgallery_zone .flow_left .btn_flowcontrol",
			},
			breakpoints: {
				// 1023px 보다 클 경우
				1023: {
					slidesPerView: 2
				}
			},
			on: {
				init: function () {
					galleryResize();
				},
				resize: function () {
					galleryResize();
				}
			}
		});
	}else{
		$("#mcgallery_zone .btn_flowcontrol_w").hide();
	}


	function galleryResize() {
		$("#mcgallery_zone .btn_flowcontrol_w").css({ "height": $("#mcgallery_zone .mcgallery_item").outerHeight() });
	}
	
}


function mcftab(){
	var $mcftab = $(".mcftab");
	$mcftab.on("click",function(e){
		e.preventDefault();
		var $t = $(this),
			$t_t = $($t.attr("href"));
		
		$t.siblings(".mcftab").removeClass("active");
		$t.addClass("active");

		if ($t_t.length){
			$t_t.siblings(".mcftab_cont").hide();
			$t_t.show();
		}
	});
}