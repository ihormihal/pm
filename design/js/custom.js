function update (){
	//scroll(false);
	//$('#content').fadeOut(350).fadeIn(350);
	angular.element($('#MatchesCtrl')).scope().reloadData(true);
	/*angular.element($('#TablesCtrl')).scope().$apply(function(){
		scroll(true);
	});*/
}

function updatePage (){
	$('#content').fadeOut(350).fadeIn(350);
	angular.element($('#MatchesCtrl')).scope().reloadData(false);
}
var pager;

function startPager (flag){
	if(flag == true){	
		pager = setInterval(updatePage, 8000);
	}else{
		clearTimeout(pager);
	}
}

var scrollTop = 0;
var dir = "down";

function scroll(scrl){
	//$('#content').fadeOut(350).delay(500);
	if(scrl == true){
		console.log(scrollTop);
		$("#content").animate({
		    opacity: 0,
		  }, 500, function() {
		    $("body,html").scrollTop(scrollTop);
		    fadeInRow();
			$(this).animate({opacity: 1},500);
		 });
		//$("body,html").scrollTop(scrollTop);

	}else if(scrl == false){
		return false;
	}
	if(dir == "down"){
		scrollTop = scrollTop+parseInt(screen.height)-100;
	}else if(dir == "top"){
		scrollTop = scrollTop-parseInt(screen.height)+100;
	}

	if(scrollTop <= 100){
		dir = "down";
	}else if(document.body.scrollHeight - scrollTop  <= 200){
		dir = "top";
	}

}

var b_top = 0;
var scroll_top = 0;
var offset_top = 0;
var el_geight = 0;

function fadeInRow (){
	$('.main-block').each(function(){
		scroll_top = $("body").scrollTop();
		offset_top = $(this).offset().top;
		el_geight = $(this).outerHeight();
		if(scroll_top > offset_top+200  && offset_top + el_geight > scroll_top){
			$(this).find('.hidden-row').css({
				"top":scroll_top - offset_top,
				"display":"block"
			});
		}
	});
}