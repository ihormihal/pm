/*
	var documentHeight = document.body.scrollHeight;
	var windowHeight = window.innerHeight;
	var pages = Math.floor(documentHeight/windowHeight);
	var scrollTop = 0;
	setInterval(function(){
		window.scrollBy(0,4);
	}, 2);
*/
var scrollTop = 0;
var isFirst = true;
function update(){
	if(isFirst && window.pageYOffset !== 0){
		window.scrollTo(0,0);
	}else{
		if(scrollTop >= document.body.scrollHeight){
			scrollTop = 0;
			window.scrollTo(0,0);
		}else{
			scrollTop += window.innerHeight;
			scroll(scrollTop);
		}
	}
	isFirst = false;
}

function scroll(to){
	var time = 2000; //время скролла
	var position = window.pageYOffset;
	var step = to > position ? 4 : -4; //шаг 4px
	var timestep = time/Math.abs((position - to)/step)

	var interval = setInterval(function(){
		position+= step;
		window.scrollBy(0,step);
		if(Math.abs(position - to) <= Math.abs(step/2)){
			clearInterval(interval);
		}
	}, timestep);
}

var legend_nodes = [];
var fixed_nodes = [];
var heights = [];

window.onload = function(){
    generateLegend();
};
window.onresize = function(){
    generateLegend();
};

window.onscroll = function(){
	var items = getVisible();
	//Подсвечиваем легенду
	for(var i = 0; i < legend_nodes.length; i++){
		legend_nodes[i].setAttribute('class','item');
		if(items.visible.indexOf(legend_nodes[i].text) !== -1){
			legend_nodes[i].setAttribute('class','item active');
		}
	}
	//Показываем-скрываем верхнюю строку
	for(var i = 0; i < fixed_nodes.length; i++){
		fixed_nodes[i].style.display = "none";
		if(fixed_nodes[i].getAttribute('data-id') == items.fixed){
			fixed_nodes[i].style.display = "block";
		}
	}
};

function generateLegend(){
	var offset = window.pageYOffset;
    var blocks = document.querySelectorAll('#events .main-block');

    var legends = '';
    var delta_h = Math.round(window.innerHeight/blocks.length);
    var item_top = 0;

    for(var i = 0; i < blocks.length; i++){
    	var id = blocks[i].getAttribute('id');
    	var position = blocks[i].getBoundingClientRect();

    	legends += '<a href="#'+id+'" class="item" style="top:'+item_top+'px;">'+id+'</a>';
    	item_top+=delta_h;

    	heights.push({
    		'id' : id, 
    		'top' : position.top + offset, 
    		'bottom' : position.bottom + offset
    	});
    }
    document.getElementById("legend").innerHTML = legends;

    legend_nodes = document.querySelectorAll("#legend > .item");
    fixed_nodes = document.querySelectorAll("#events .fixed");
}

//Получаем список видимых матчей
function getVisible(){
	var visible = {};
	var out = {'visible':[],'fixed':''};
	var interval = [window.pageYOffset, window.pageYOffset+window.innerHeight];
	for(var i = 0; i < heights.length; i++){
		//целиком поместился
		if(heights[i].top > interval[0] && heights[i].bottom < interval[1]){
			visible[heights[i].id] = true;
		}
		//верх поместился, низ не поместился
		if(heights[i].top > interval[0] && heights[i].top < interval[1]){
			visible[heights[i].id] = true;
		}
		//верх не поместился, низ поместился
		if(heights[i].bottom > interval[0] && heights[i].bottom < interval[1]){
			visible[heights[i].id] = true;
			if((interval[0] - heights[i].top) > 60){
				out.fixed = heights[i].id;
			}
		}
		//верх и низ не поместились
		if(heights[i].top < interval[0] && heights[i].bottom > interval[1]){
			visible[heights[i].id] = true;
			if((interval[0] - heights[i].top) > 60){
				out.fixed = heights[i].id;
			}
			
		}
	}
	for(var id in visible){
		out.visible.push(id);
	}
	return out;
}