var scrollTop = 0;
var window_h = window.innerHeight;

function update (){
	if($('input#scroll').val() == '0'){
		angular.element($('#MatchesCtrl')).scope().reloadData(true);
		angular.element($('#TablesCtrl')).scope().$apply(function(){
			scroll();
			onePageSort(function(){
				$('input#scroll').val('1');
				$('#overlay_loading').remove();
			});
		});
	}else if($('input#scroll').val() == '1'){
		scroll();
	}
}

function onePageSort(callback){
	var margin = 10;

	var toTop = 0;
	var onScreen = 0;
	var onScreen_h = 0;
	var screens = 0;
	var totalHeight = 0;
	var length = $('#events > .main-block').length;

	var topHeights = [];
	$('#events > .main-block').each(function(i){
		element_h = $(this).outerHeight()+margin;

		onScreen_h += element_h;
		onScreen++;

		//если больше 1 на экране и нижняя часть не поместилась - переносим на следующий экран
		if(onScreen_h > window_h && onScreen > 1 && i < (length-1)){
			screens++;
			toTop = window_h*screens;
			onScreen = 1;
			onScreen_h = element_h;
		}

		topHeights[$(this).attr('id')] = toTop;
		if(i == length-1){
			totalHeight = toTop+$(this).height();
		}

		$(this).css('top',toTop);

		toTop += element_h;
		if(onScreen_h > window_h){
			if(onScreen == 1){
				screens++;
				onScreen_h = onScreen_h - window_h;
				toTop = window_h*screens + onScreen_h;
			}
		}
	});

	var coef = totalHeight==0 ? 0 : window_h/totalHeight;
	var scrollBar_h = window_h*coef;
	var prev_h = 0;
	for(var i in topHeights){
		var toTop = Math.round(topHeights[i]*coef);
		if(prev_h > 0 && toTop < prev_h+17){
			toTop = prev_h+17;
		}
		$('#legend #item-'+i).css('top',toTop).attr('data-y',topHeights[i]);
		prev_h = toTop;
	}

	updateLegend();

	callback();
}

window.onresize = function(event) {
	window_h = window.innerHeight;
	onePageSort(function(){
		console.log('screen updated');
	});
};


function scroll(){
	$('#overlay').fadeIn("250",function(){
		$("body,html").scrollTop(scrollTop);
		scrollTop = scrollTop+window_h;
		if(document.body.scrollHeight - scrollTop  <= 50){
			scrollTop = 0;
			$('input#scroll').val('0');
		}
	}).fadeOut("250",function(){
		//showBar(50);
	});
	

}


window.onscroll = function(){
	updateLegend();
};

function updateLegend(){
	$('#legend .item').each(function(){
		var item_top = parseInt($(this).attr('data-y'));
		var scr = document.body.scrollTop;

		if(scr+window_h >= item_top && scr <= item_top){
			$(this).addClass('active');
		}else{
			$(this).removeClass('active');
		}
	});
}


function showBar(y){
	var center = Math.ceil($(document).width()/2);
  	var element = document.elementFromPoint(center, y).getAttribute('data-id');

  	$('.fixed').hide();
  	$('#'+element+' .fixed').show();
}