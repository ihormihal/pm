var scrollTop = 0;

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
	var window_h = window.innerHeight;
	var margin = 10;

	var toTop = 0;
	var onScreen = 0;
	var onScreen_h = 0;
	var screens = 0;
	var length = $('#events > .main-block').length;
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
	callback();
}


function scroll(){
	var window_h = window.innerHeight;
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


function showBar(y){
	var center = Math.ceil($(document).width()/2);
  	var element = document.elementFromPoint(center, y).getAttribute('data-id');

  	$('.fixed').hide();
  	$('#'+element+' .fixed').show();
}