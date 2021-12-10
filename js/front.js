if( window.console == undefined ){ console = { log : function(){} }; }
/** browser checker **/
var touchstart = "ontouchstart" in window;
var userAgent=navigator.userAgent.toLowerCase();
var resizePartWidth = 1023;
;(function($){$.browserTest=function(a,z){var u='unknown',x='X',m=function(r,h){for(var i=0;i<h.length;i=i+1){r=r.replace(h[i][0],h[i][1]);}return r;},c=function(i,a,b,c){var r={name:m((a.exec(i)||[u,u])[1],b)};r[r.name]=true;r.version=(c.exec(i)||[x,x,x,x])[3];if(r.name.match(/safari/)&&r.version>400){r.version='2.0';}if(r.name==='presto'){r.version=($.browser.version>9.27)?'futhark':'linear_b';}r.versionNumber=parseFloat(r.version,10)||0;r.versionX=(r.version!==x)?(r.version+'').substr(0,1):x;r.className=r.name+r.versionX;return r;};a=(a.match(/Opera|Navigator|Minefield|KHTML|Chrome/)?m(a,[[/(Firefox|MSIE|KHTML,\slike\sGecko|Konqueror)/,''],['Chrome Safari','Chrome'],['KHTML','Konqueror'],['Minefield','Firefox'],['Navigator','Netscape']]):a).toLowerCase();$.browser=$.extend((!z)?$.browser:{},c(a,/(camino|chrome|firefox|netscape|konqueror|lynx|msie|opera|safari)/,[],/(camino|chrome|firefox|netscape|netscape6|opera|version|konqueror|lynx|msie|safari)(\/|\s)([a-z0-9\.\+]*?)(\;|dev|rel|\s|$)/));$.layout=c(a,/(gecko|konqueror|msie|opera|webkit)/,[['konqueror','khtml'],['msie','trident'],['opera','presto']],/(applewebkit|rv|konqueror|msie)(\:|\/|\s)([a-z0-9\.]*?)(\;|\)|\s)/);$.os={name:(/(win|mac|linux|sunos|solaris|iphone)/.exec(navigator.platform.toLowerCase())||[u])[0].replace('sunos','solaris')};if(!z){$('html').addClass([$.os.name,$.browser.name,$.browser.className,$.layout.name,$.layout.className].join(' '));}};$.browserTest(navigator.userAgent);})(jQuery);//http://jquery.thewikies.com/browser/
$(function(){
	oldIe();
	commonInit();
	dimLayerControl();
	formCommmon();
	pcheaderFunc();
});
$(window).on("load",function(){
	commonResize();
	console.log('test');
});


/* 스크롤 넓이 구하기 */
function getScrollBarWidth() {
	var $outer = $('<div>').css({visibility: 'hidden', width: 100, overflow: 'scroll'}).appendTo('body'),
		widthWithScroll = $('<div>').css({width: '100%'}).appendTo($outer).outerWidth();
	$outer.remove();
	return 100 - widthWithScroll;
};

function menuRock(item){
	$(function(){
		var $item = $(item);
		if($item.parents(".mdtotal_gnblist > li").length){
			$item.parents(".mdtotal_gnblist > li").addClass("active");
		}
		$item.addClass("active");
		$(".mbtotal_w").trigger("refresh");
	});
}


/* 공통리사이즈 호출 */

function commonResize(){
	var $window_width = 0;
	var btn_topgo = $(".btn_topgo");
	$(window).on("resize",function(){
		if($window_width == $(window).width()){
			return;
		}
		midContentsResize();
		reformFunc();
		if($(window).width()<resizePartWidth){
			//btn_topgo.hide();
		}else{
			btn_topgo.show();
			hpctotalResize();
		}
	}).resize();
}

function pcheaderFunc(){
	var $hgnb_hli = $(".hgnb_hlist > li");
	var $hge_total = $(".hge_total");
	var $hge_total_close = $(".hge_total_close");
	var $header_pctotal_w = $(".header_pctotal_w");
	$hgnb_hli.hoverIntent({
		over : function(){
			var $this = $(this);
			$this.addClass("active");
			$this.find(".hgnbtwo_vlist_w").slideDown();
		},
		out : function(){
			var $this = $(this);
			$this.removeClass("active");
			$this.find(".hgnbtwo_vlist_w").slideUp();
		},
		interval : 20
	});
	$hge_total.on("click",function(e){
		e.preventDefault();
		$(this).addClass("hidden_btn");
		$hge_total_close.addClass("active");
		$header_pctotal_w.slideDown();
	});
	$hge_total_close.on("click",function(e){
		e.preventDefault();
		$hge_total.removeClass("hidden_btn");
		$(this).removeClass("active");
		$header_pctotal_w.slideUp();
	});
}

function hpctotalResize(){
	var hgnb_hli = $(".hgnb_hlist > li");
	var $hgnbitem_insp = $(".hgnbitem_insp");
	var hpct_vlist = $(".hpct_vlist");
	var hpct_vitem_fxwrap = $(".hpct_vitem_fxwrap");
	var hgnb_define_grow = $(".hgnb_define_grow");
	var hpct_vitem = $(".hpct_vitem");
	hpct_vitem.css({"width": "" });
	hpct_vitem_fxwrap.css({"width": "" });
	hpct_vlist.css({"padding-left" : "" , "padding-right" : ""})
	hpct_vitem.each(function(index){
		hpct_vitem.eq(index).css({"width" : hgnb_hli.eq(index).outerWidth()});
	});
	$hgnbitem_insp.each(function(index){
		var $hgnbitem_insp_left = $hgnbitem_insp.eq(index).position().left;
		hpct_vlist.eq(index).css({"padding-left" : $hgnbitem_insp_left})
	});
	hpct_vitem_fxwrap.css({"width" : hgnb_define_grow.outerWidth()});
}

function midTab() {
	var midTab = new Swiper('.midtab_swiper', {
		slidesPerView: 'auto',
		freeMode: true
	});
	var $target = $(".midtab-slide.active");
	var $target_left = $target.length ? $target.offset().left : 0;
	var $target_wid = $target.length ? $target.width() : 0;
	var windowWidth = 0;
	$(window).on("resize", function () {
		if (windowWidth == $(window).width()) {
			return;
		}
		setTimeout(function () {
			resizeAction();
		}, 50)
		windowWidth = $(window).width();
	});
	resizeAction();

	function resizeAction() {
		if ($(window).width() > 1280) {
			midTab.params.touchRatio = 0;
		} else {
			midTab.params.touchRatio = 1;
			if ($(window).width() <= $target_left + $target_wid) {
				midTab.slideTo($target.index());
			}
		}
	}
}

function subtabFunc(){
	$(function(){
		var $d_tabui = $(".d_tabui");
		if($d_tabui.length){
			$d_tabui.each(function(){
				var $t = $(this);
				var $t_e = $t.children(".mdbox_tab,.tab_item");
				$t_e.on("click",function(e){
					e.preventDefault();
					var $this = $(this);
					var $this_target = $($this.attr("href"));
					$this.siblings(".mdbox_tab,.tab_item").removeClass("active");
					$this.addClass("active");
					if($this_target.length){
						$this_target.siblings(".mdbox_tabcont,.tab_cont").hide();
						$this_target.show();
					}
				});
			});
		}
	});
}

// middle zone 기본높이
function midContentsResize(){
	var $front_body = $(".front_body");
	var $header_wrap = $(".header_zone");
	var $header_wrap_height = $header_wrap.length ? $header_wrap.outerHeight() : 0;
	var $mid_contents = $(".midcontents");
	var $footer_wrap = $(".footer_zone");
	var $footer_wrap_height = $footer_wrap.length ? $footer_wrap.outerHeight() : 0;
	$mid_contents.css({"min-height" : ""});
	$mid_contents.css({"min-height" : "calc(100vh - " +($header_wrap_height+$footer_wrap_height)+"px"});
}


/* 공통 레이아웃 호출 */
function commonInit(){
	// touchmode 식별
	if(touchstart){
		$("html").addClass("touchmode");
	}else{
		$("html").removeClass("touchmode");
	}
	
	if(userAgent.indexOf('samsung')>-1){
		$("html").addClass("samsung");
	}

	var btn_topgo = $(".btn_topgo");
	btn_topgo.on("click",function(e){
		e.preventDefault();
		setTimeout(function(){
			window.scrollTo(0,0);
		},50);
	});
	if($(window).scrollTop() <= 0){
		//btn_topgo.hide();
	}
	$(window).on("scroll",function(e){
		var $footerHeight = $(".footer_zone").length ? $(".footer_zone").outerHeight() : 0;
		if($(this).scrollTop()> $(document).height() - $(window).height()-$footerHeight){
			if($(window).width()>1023){return;}
			btn_topgo.hide();
		}else{
			btn_topgo.show();
		}
	});

	// mobile total
	function mbTotal() {
		var funcThis = this;
		var mbtotal_obj = null,
			$mbtotal_zw = $(".mbtotal_zw"),
			$mbtotal_z = $(".mbtotal_z"),
			$mbtotal_w = $(".mbtotal_w"),
			$page_wrap = $(".page_wrap"),
			$mbtf_menu_item = $(".mbtf_menu_item"),
			$pw_pos = $page_wrap.length ? $page_wrap.offset().left : 0,
			$pw_wid = $page_wrap.length ? $page_wrap.outerWidth() : 0;

		if ($mbtotal_w.length === 0) { return; }
		mbtotal_obj = new IScroll(".mbtotal_w", {
			mouseWheel: true,
			preventDefault: false
		});

		$(".mbtotal_w").on("refresh",function(){
			mbtotal_obj.refresh();
		});


		$mbtf_menu_item.each(function () {
			var $this = $(this),
				$t_mbtf_two_w = $this.find(".mbtf_two_w");

			if ($t_mbtf_two_w.length) {
				$this.addClass("has_two");
			} else {
				$this.removeClass("has_two");
			}
		});
		var $window_width = 0;
		$(window).on("resize", function () {
			if ($window_width == $(window).width()) {
				return;
			}
			resizePos();
			$window_width = $(window).width();
		}).resize();


		function resizePos() {
			$pw_pos = $page_wrap.length ? $page_wrap.offset().left : 0;
			$pw_wid = $page_wrap.length ? $page_wrap.outerWidth() : 0;
			$mbtotal_zw.css({ "left": "" });
			if ($(window).width() >= 1023) {
				menuClose();
				$mbtotal_zw.css({ "left": $pw_pos });
			}
			mbtotal_obj.refresh();
		}

		//active
		// menuAction();

		$(".btn_htotal").on("click", function (e) {
			e.preventDefault();
			menuAction();
		});

		$(".mbtotal_bg,.btn_mdtotal_close").on("click", function (e) {
			e.preventDefault();
			menuClose();
		});

		$(".mdtgm").on("click", function (e) {
			e.preventDefault();
			var $this = $(this),
				$t_p = $this.parents("li");
			if($(".mdtotal_gnblist > li").not($t_p).hasClass("active")){
				$(".mdtotal_gnblist > li").not($t_p).removeClass("active");
			}
			$t_p.toggleClass("active");
			mbtotal_obj.refresh();
		});

		function menuAction() {
			$mbtotal_zw.show();

			setTimeout(function () {
				$mbtotal_zw.addClass("active");
			}, 20);

			setTimeout(function () {
				mbtotal_obj.refresh();
			}, 510);
			if (funcThis.touchis) {
				document.ontouchmove = function (e) { e.preventDefault(); };
				$("body,html").addClass("touchDis2").on("touchmove", function (e) {
					e.preventDefault();
				});
			}
		}

		function menuClose() {
			$mbtotal_zw.removeClass("active");
			setTimeout(function () {
				$mbtotal_zw.hide();
				if (funcThis.touchis) {
					document.ontouchmove = function (e) { return true; };
					$("body,html").removeClass("touchDis2").off("touchmove");
				}
			}, 505);
		}
	}
	$(window).on("load", function () {
		mbTotal();
	});
}

/* old IE layer */
function oldIe(){
	var innerHtml = "";
	if( navigator.appName.indexOf("Microsoft") > -1 ){
		if(navigator.appVersion.indexOf("MSIE 7") > -1 || navigator.appVersion.indexOf("MSIE 8") > -1 || navigator.appVersion.indexOf("MSIE 9") > -1){
			innerHtml += "<div class='browser_layer_w'>";
			innerHtml += "<div class='browser_layer'>";
			innerHtml += "<div class='brow_top'>미지원 브라우저 알림</div>";
			innerHtml += "<div class='brow_mid'>";
			innerHtml += "<p class='brow_mid_p'>";
			innerHtml += "웹사이트의 모든 기능을 이용하시려면<br>";
			innerHtml += "최신 브라우저로 업데이트하시기 바랍니다.";
			innerHtml += "</p>";
			innerHtml += "<p class='brow_btn_w'>";
			innerHtml += "<a href='https://support.microsoft.com/ko-kr/help/17621/internet-explorer-downloads' class='brow_btn' target='_blank' title='새창'><span class='hdtext'>Internet Explorer 다운로드 바로가기</span></a>";
			innerHtml += "</p>";
			innerHtml += "</div>";
			innerHtml += "</div>";
			innerHtml += "</div>";
			$("body").append(innerHtml);
			$(".browser_layer").css({"margin-top":-$(".browser_layer").outerHeight()/2});
			$(".browser_layer_w").addClass("complete");
			$(".page_wrap").css({"z-index":0});
		}
	}
}


function reformFunc() {
	var $resitem = $("[data-pcwid]");
	$resitem.each(function () {
		if ($(window).width() <= 1023) {
			$(this).css({ "width": "" });
		} else {
			$(this).css({ "width": $(this).attr("data-pcwid") });
		}
	});
}


/* layer popup event */
function dimLayerControl(){
	var touchIs = "ontouchstart" in window,
		$modal = $(".dimlayer_z");
	if($modal.length===0){return;}
	
	var readywidth = $(window).width();
	
	var objThis = this;
	$modal.on("click",".btn_layerclose,.closetrigger",function(e){
		var $this = $(this),
			$t_p = $this.parents(".dimlayer_z"),
			$t_back = $($t_p.attr("data-closefocus"));
		e.preventDefault();
		objThis.dimLayerHide({ 
			target : $t_p,
			closeCallback : function(){
				setTimeout(function(){
					if($t_back.length){
						$t_back.focus();
					}
				},40);
			}
		});
	});
};
/* layer popup show */
function dimLayerShow(option){
	var $callbtn = null,
		touchIs = "ontouchstart" in window,
		$modal = null,
		$target = null,
		transis = "TransitionEvent" in window,
		$t_box = null,
		$t_td = null,
		$t_tpt = 0,
		$t_tpb = 0;
	
	$(function(){
		$modal = $(".dimlayer_z");
		$target = $(option.target);
		$dimbg = $target.find(".dimbg");
		$t_box = $target.find(".layer_box");
		$t_td = $target.find(".dimlayer_td");
		$t_box_cont = $target.find(".layer_cont");
		$t_tpt = parseInt($t_td.css("padding-top"));
		$t_tpb = parseInt($t_td.css("padding-bottom"));
		
		if($modal.length===0){return;}
		$(".dimbg").css({"width" : "" });
		$modal.removeClass("active");
		$target.addClass("active");

		// $dimbg.css({"width" : "calc(100% - "+getScrollBarWidth()+"px"});
		
		var boxzoneHeight = $t_box.outerHeight()+$t_tpt+$t_tpb; 
		var varheight = 0;
		if(boxzoneHeight > $(window).height()){
			varheight = boxzoneHeight;
		}else{
			varheight = $(window).height();
		}
		$t_box.css({"top" : 0});
		
		if($t_box.find(".calendar_call").length){
			$t_box.find(".calendar_call").parent().attr("tabindex","0");
		}
		$(".page_wrap").css({"z-index":0});
		if($modal.hasClass("ptype2")){
			$modal.filter(".ptype2").css({"top":$(window).scrollTop() + ($(window).height()/2) - ($modal.outerHeight()/2)});
		}else{
			heightcheck();
		}
		if("openCallback" in option){
			option.openCallback();
		}
		function heightcheck(){
			if(touchIs){
				$("body").data("data-scr",$(window).scrollTop()).css({"margin-top":-$(window).scrollTop()}).append($target);
				$("html").addClass("touchDis");
			}else{
				if(boxzoneHeight > $(window).height()){
					$("html").addClass("touchDis2");
				}
			}
		}
		var $windowWid = 0;
		$(window).on("resize",function(){
			if($windowWid == $(window).width()){
				return;
			}
			$dimbg.css({"width" : "calc(100% - "+getScrollBarWidth()+"px"});
			$windowWid = $(window).width();
		});
	});
};

/* layer popup hide */
function dimLayerHide(option){
	var $callbtn = null,
		touchIs = "ontouchstart" in window,
		$modal = null,
		$target = null,
		transis = "TransitionEvent" in window,
		$t_box = null,
		$t_box_duration = 0;
		
	$(function(){
		$modal = $(".dimlayer_z");
		
		$target = $(option.target);
		$t_box = $target.find(".layer_box");
		$t_td = $target.find(".dimlayer_td");
		$t_tpt = parseInt($t_td.css("padding-top"));
		$t_tpb = parseInt($t_td.css("padding-bottom"));
		$t_box_duration = transis ? $t_box.css("transition-duration").slice(0,-1)*1000 : 0;
		
		if($modal.length===0){return;}
		var boxzoneHeight = $t_box.outerHeight()+$t_tpt+$t_tpb; 
		var varheight = 0;
		
		if(boxzoneHeight > $(window).height()){
			varheight = boxzoneHeight;
		}else{
			varheight = $(window).height();
		}
		
		$target.removeClass("active");
		$(".page_wrap").css({"z-index":""});
		$("html,body").removeClass("touchDis touchDis2");
		scrollEnd();
		
		if("closeCallback" in option){
			option.closeCallback();
		}
		
		function scrollEnd(){
			if(touchIs){
				$("body").css({"margin-top":0});
				window.scrollTo(0,Number($("body").data("data-scr")));
			}
		}
	});
}

function formCommmon(){
	$(document).on("change",".form_select",function(){
		var $t = $(this);
		if ($t[0].value == "0"){
			$t.addClass("has_placeholder");
		}else{
			$t.removeClass("has_placeholder");
		}
	});
}




function formUIEvent(){
    var sub_tempboth_zone = $(".sub_tempboth_zone");
    var sub_temp_left_item = $(".sub_temp_left_item");
    var sub_tempbot = $(".sub_tempbot");
    var sub_tempboth_zone_pos = sub_tempboth_zone.length ? sub_tempboth_zone.offset().top : 0;
    var sub_tempbot_pos = sub_tempbot.length ? sub_tempbot.offset().top : 0;
    var sub_temp_left_item_height = sub_temp_left_item.length ? sub_temp_left_item.outerHeight() : 0;
    if (sub_temp_left_item.length){
        $(window).on("scroll",function(e){
            sub_tempboth_zone_pos = sub_tempboth_zone.length ? sub_tempboth_zone.offset().top : 0;
            sub_temp_left_item_height = sub_temp_left_item.length ? sub_temp_left_item.outerHeight() : 0;
            sub_tempbot_pos = sub_tempbot.length ? sub_tempbot.offset().top : 0;
            if($(window).width()<=1023){return;}
            if ($(window).scrollTop() > sub_tempboth_zone_pos){
                if ($(window).scrollTop() > sub_tempbot_pos - sub_temp_left_item_height){
                    sub_temp_left_item.addClass("stop");
                }else{
                    sub_temp_left_item.removeClass("stop");
                }
                sub_temp_left_item.addClass("fixeditem");
            }else{
                sub_temp_left_item.removeClass("fixeditem stop");
            }
        });
    }
}