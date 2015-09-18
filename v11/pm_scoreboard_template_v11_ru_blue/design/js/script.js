var getVisible_interval;
var Scrolling = function(){

	this.state = 'pause';
	this._step = 1;
	this._interval = 40;
	this.position = window.pageYOffset;
	this.to = window.innerHeight;

	this.play = function(){
		this.position = window.pageYOffset;
		this.to = document.body.scrollHeight - window.innerHeight;

		this.state = 'play';
		document.getElementById('playpause').setAttribute('class','pause');

		var that = this;
		this.scrollinterval = setInterval(function(){
			window.scrollBy(0,that._step);
			that.position+= that._step;

			//если достигли точки назначения с точностью в половину интервала
			if(Math.abs(window.pageYOffset - document.body.scrollHeight + window.innerHeight) <= Math.abs(that._step)){
				that.pause();
				that.state = 'end';
				//активируем обновление
				document.getElementById('scroll').value = 0;
			}
		}, that._interval);
		setInterval(getVisible, 500); //обновляем легенду каждые 500ms
	};

	this.pause = function(){
		clearInterval(getVisible_interval);
		clearInterval(this.scrollinterval);
		this.state = 'pause';
		document.getElementById('playpause').setAttribute('class','play');
	};
};

//Добавляем сеттеры
Scrolling.prototype = {
    set step(val){
    	this.pause();
        //this._step = this.to > this.position ? val : -val;
        this._step = val;
        this.play();
    },
    set interval(val){
        this.pause();
        this._interval = val;
        this.play();
    }
};

var pageScroll = new Scrolling();


window.onload = function(){
    generateLegend();
    pageScroll.to = document.body.scrollHeight - window.innerHeight;
};
window.onresize = function(){
    generateLegend();
};

var heights = {};

//вызывается из app.js
function scroll(){
	//перескакиваем вверх после обновления
	window.scrollTo(0,0);
	//генерируем легенду
	setTimeout(generateLegend, 5000);
	//деактивируем обновление
	document.getElementById('scroll').value = 1;
	//скролим
	pageScroll.play();
}


function generateLegend(){
	heights = {};
	var offset = window.pageYOffset;
    var blocks = document.querySelectorAll('#events .main-block');

    var legends = '';
    for(var i = 0; i < blocks.length; i++){
    	var id = blocks[i].getAttribute('id');
    	var position = blocks[i].getBoundingClientRect();

    	legends += '<a href="#'+id+'" id="item-'+id+'" class="">'+id+'</a>';
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
		try{
			document.getElementById('item-'+i).setAttribute('class', '');
			document.getElementById('fixed-'+i).style.display = "none";
		}catch(error){
			console.log('Waiting...');
		}
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

function newScrollParam(){
	pageScroll.step = document.getElementById('scroll-step').value;
	pageScroll.interval = document.getElementById('scroll-interval').value;
}

function playpause(){
	if(pageScroll.state == 'play'){
		pageScroll.pause();
	}else if(pageScroll.state == 'pause'){
		pageScroll.play();
	}else{
		//насильно обновляем
		update();
	}
}

function fillOption(value){
	pageScroll.pause();
	document.getElementById('scroll').value = 0;
	update();
}