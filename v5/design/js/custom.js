var scrollTop = 0;


function update (){
	if($('input#scroll').val() == '0'){
		angular.element($('#MatchesCtrl')).scope().reloadData(true);
		angular.element($('#TablesCtrl')).scope().$apply(function(){
			//pageloadsort(function(){
				$('input#scroll').val('1');
				$('#overlay_loading').remove();
				scroll();
			//});
		});
	}else if($('input#scroll').val() == '1'){
		scroll();
	}
}


function pageloadsort(callback) {

	var markers = {}; //Массив значениы высоты маркеров
	var rightH = 0;
	var leftH = 0;
	var leftCol = true;

	$('.main-block').each(function(index){
		var thisHeight = $(this).outerHeight(true);

		//Расположение
		if(leftH > rightH && index !== 0){
	    $(this).css({top:rightH,right:'0',left:'auto'}); //to Right

	    rightH+=thisHeight;

	  }else if(rightH >= leftH){
	    $(this).css({top:leftH,right:'auto',left:'0'}); //to Left

	    leftH+=thisHeight;
	  }

	});
	
	callback();
}

//setInterval(scroll, 6000);

function scroll(){
	$('#overlay').fadeIn("250",function(){
		$("body,html").scrollTop(scrollTop);
		if(scrollTop == 0){
			$('input#scroll').val('0');
		}
		scrollTop = scrollTop+parseInt($(window).height()-40);
		if(document.body.scrollHeight - scrollTop  <= 50){
			scrollTop = 0;
		}
	}).fadeOut("250",function(){
		elByXY(50);
	});
}

function elByXY(y) {

	var documentWidth = $(document).width();
	var xLeft = Math.ceil(documentWidth/3);
	var xRight = Math.ceil(documentWidth*2/3);

  var elLeft = document.elementFromPoint(xLeft, y).getAttribute('data-id');
  var elRight = document.elementFromPoint(xRight, y).getAttribute('data-id');

  $('.fixed').hide();

  if(elLeft){
  	$('#'+elLeft+' .fixed').show().width($('#'+elLeft).width());
  }else{
		$('#'+elLeft+' .fixed').hide();
  }

  if(elRight){
  	$('#'+elRight+' .fixed').show().width($('#'+elLeft).width());
  }else{
		$('#'+elRight+' .fixed').hide();
  }
}