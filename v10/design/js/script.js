function scroll(){
	//перескакиваем вверх после обновления
	window.scrollTo(0,0);
	//обновляем легенду
	generateLegend();
	//деактивируем обновление
	document.getElementById('ready').value = 0;

	//скролим до дна
	scrolling(document.body.scrollHeight - window.innerHeight,function(){
		//активируем обновление при достижении дна
		document.getElementById('ready').value = 1;
	});
}

function scrolling(to,callback){
	//var time = 5000; //время скролла одной страницы
	var position = window.pageYOffset;
	var step = to > position ? 2 : -2; //шаг 4px
	//var timestep = time/Math.abs((position - to)/step);
	var timestep = 40;

	var interval = setInterval(function(){
		position+= step;
		window.scrollBy(0,step);
		if(Math.abs(position - to) <= Math.abs(step/2)){
			clearInterval(interval);
			callback();
		}
	}, timestep);
}

var heights = {};

window.onload = function(){
    generateLegend();
    setInterval(getVisible, 500);
};
window.onresize = function(){
    generateLegend();
};

window.onscroll = function(){
	
};

function generateLegend(){
	var offset = window.pageYOffset;
    var blocks = document.querySelectorAll('#events .main-block');

    var legends = '';
    for(var i = 0; i < blocks.length; i++){
    	var id = blocks[i].getAttribute('id');
    	var position = blocks[i].getBoundingClientRect();

    	legends += '<a href="#'+id+'" id="item-'+id+'">'+id+'</a>';
    	heights[id] = {
    		'top' : position.top + offset, 
    		'bottom' : position.bottom + offset
    	};
    }
    document.getElementById("legend").innerHTML = legends;
}

//Получаем список видимых матчей
function getVisible(){
	var interval = [window.pageYOffset, window.pageYOffset+window.innerHeight];

	for(var i in heights){
		document.getElementById('item-'+i).setAttribute('class', '');
		document.getElementById('fixed-'+i).style.display = "none";
		//целиком поместился
		if(heights[i].top > interval[0] && heights[i].bottom < interval[1]){
			document.getElementById('item-'+i).setAttribute('class', 'active');
		}
		//верх поместился, низ не поместился
		if(heights[i].top > interval[0] && heights[i].top < interval[1]){
			document.getElementById('item-'+i).setAttribute('class', 'active');
		}
		//верх не поместился, низ поместился
		if(heights[i].bottom > interval[0] && heights[i].bottom < interval[1]){
			document.getElementById('item-'+i).setAttribute('class', 'active');
			if((interval[0] - heights[i].top) > 60){
				document.getElementById('fixed-'+i).style.display = "block";
			}
		}
		//верх и низ не поместились
		if(heights[i].top < interval[0] && heights[i].bottom > interval[1]){
			document.getElementById('item-'+i).setAttribute('class', 'active');
			if((interval[0] - heights[i].top) > 60){
				document.getElementById('fixed-'+i).style.display = "block";
			}
			
		}

	}
}