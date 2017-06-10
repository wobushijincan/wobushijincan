function NoClickDelay(el) {
    this.element = typeof el == 'object' ? el: document.getElementById(el);      
    //if (window.Touch)  this.element.addEventListener('touchstart', this, false);
}
NoClickDelay.prototype = {
    handleEvent: function(e) {              
        switch (e.type) {                      
        case 'touchstart':
            this.onTouchStart(e);
            break;                      
        case 'touchmove':
            this.onTouchMove(e);
            break;                      
        case 'touchend':
            this.onTouchEnd(e);
            break;              
        }      
    },
    onTouchStart: function(e) {
        e.preventDefault(); this.moved = false;
        this.theTarget = document.elementFromPoint(e.targetTouches[0].clientX, e.targetTouches[0].clientY);              
        if (this.theTarget.nodeType == 3) this.theTarget = theTarget.parentNode;
        this.theTarget.className += ' pressed';
        this.element.addEventListener('touchmove', this, false);
        this.element.addEventListener('touchend', this, false);      
    },
    onTouchMove: function(e) {
        this.moved = true;
        this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');      
    },
    onTouchEnd: function(e) {
        this.element.removeEventListener('touchmove', this, false);
        this.element.removeEventListener('touchend', this, false);                    
        if (!this.moved && this.theTarget) {
            this.theTarget.className = this.theTarget.className.replace(/ ?pressed/gi, '');                        
            var theEvent = document.createEvent('MouseEvents');
            theEvent.initEvent('click', true, true);
            this.theTarget.dispatchEvent(theEvent);                
        }
        this.theTarget = undefined;      
    }
};
//消除ckick()事件300毫秒的延迟
new NoClickDelay(document.getElementById("mycanvas"));
window.addEventListener('load', function() {
    FastClick.attach(document.body);
}, false);//消除ckick()事件300毫秒的延迟需要引进fastclick;


var cxt = 0;
var start = true;
var distance = 0; //每个格子的左上角的坐标
var distances = 0;//格子数组，用它来封装所有格子的左上角的坐标
var cavWidth = 0,cavHeight = 0;//画布大小
var moneySum = 0;
var drawTime = 0;
var duration=10900;
var endTime = new Date().getTime() + duration + 100;
function interval()
{
//	console.log("s")
    var n= parseInt( ( endTime - new Date().getTime() ) / 1000 );
    if( n < 0 ){
    	document.getElementById("timeout").innerHTML = '00';
    	clearInterval( drawTime );
    	cxt.clearRect( 0 , 0 , cavWidth , cavHeight );
    	start = false;
    	return
    }else if( n >= 10 ){
    	document.getElementById("timeout").innerHTML = n;
    }else if(  0 <= n && n < 10 ){
    	document.getElementById("timeout").innerHTML = '0' + n;
    }
    setTimeout(interval, 10);
}
function foodObj( imgSrc , money ){
	this.img = new Image();
	this.width = 53;
	this.height = 53;
	this.margin_left = 12.125;//绘画时的间距
	this.margin_top = 12.125;//绘画时的间距
	this.img.src = imgSrc;
	this.place = 0;//记录当前的位置
	this.money = money;
}
var food1 = new foodObj( 'images/food1.png' , 1 );
var food2 = new foodObj( 'images/food2.png' , 2 );
var food3 = new foodObj( 'images/food3.png' , 3 );
var food4 = new foodObj( 'images/food4.png' , 4 );
var food5 = new foodObj( 'images/food5.png' , 5 );
var food6 = new foodObj( 'images/food6.png' , 6 );
var foods = [ food1 , food2 , food3 , food4 , food5 , food6 ];

function distanfun(){//位置坐标
	distances = [
		[ 0 , 0 ] , [  distance , 0 ] , [ 2 * distance , 0 ] , [ 3 * distance , 0 ],
		[ 0 , distance ] , [  distance , distance ] , [ 2 * distance , distance ] , [ 3 * distance , distance ],
		[ 0 , distance * 2 ] , [  distance , distance * 2 ] , [ 2 * distance , distance * 2 ] , [ 3 * distance , distance * 2 ],
		[ 0 , distance * 3 ] , [  distance , distance * 3 ] , [ 2 * distance , distance * 3 ] , [ 3 * distance , distance * 3 ]
	]
}	

function placeindex(){   //使其6不同的位置,
	var randomNums = [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15];
	var new_randomNum = [];
	for( var i = 0 ; i < 6 ; i++ ){
		var index = Math.floor( Math.random() * randomNums.length );
		new_randomNum.push( randomNums[index] );
		randomNums.splice( index , 1 );
	}
	return new_randomNum;
}
function draw( cxt ){
	cxt.clearRect( 0 , 0 , cavWidth , cavHeight );
	var randomNum = placeindex();
	for( var i = 0 ; i < foods.length ; i++ ){
		foods[i].place = randomNum[i];//将6个不同的位置赋给每个食物；使其在画布上面位置不同
		cxt.beginPath();
		cxt.drawImage( foods[i].img , distances[randomNum[i]][0] + foods[i].margin_left , distances[randomNum[i]][1] + foods[i].margin_top , foods[i].width , foods[i].height );
		cxt.closePath();
	}
}
window.onload = function(){
	$('body').on('touchmove', function (event) {
	    event.preventDefault();
	});
	bodySize();
	window.onresize = function(){
		bodySize();
	}
	function bodySize(){
		//自适应！
		$("#frame").height( $(window).height() );
		cavWidth = parseInt($("#frame").css("width")) * 600 / 640 ;
		cavHeight = cavWidth;
		var foodWidth = parseInt($("#frame").css("width")) * 106 / 640;
		var foodHeight = foodWidth;
		document.getElementById("mycanvas").setAttribute("width",cavWidth);
		document.getElementById("mycanvas").setAttribute("height",cavHeight);
		$(".gameBg ul").css({
			"width" : cavWidth,
			"height" : cavWidth
		})
		for( var i = 0 ; i < foods.length ; i++ ){
			foods[i].width = foodWidth;
			foods[i].height = foodHeight;
			foods[i].margin_left = parseInt($("#frame").css("width")) * 25 / 640;
			foods[i].margin_top = parseInt($("#frame").css("width")) * 25 / 640;
		}
		var liWidth = $(".gameBg ul li").width();
		var li_margin = parseInt($(".gameBg ul li").css("margin-left"));
		distance = liWidth + li_margin;
		distanfun();
	}
	
	var canvasBox = document.getElementById("canvasBox");
	var canvas = document.getElementById("mycanvas");
	cxt = canvas.getContext("2d");
	
	document.getElementById("mycanvas").addEventListener('touchstart',function(event){
		event.preventDefault();
		var touchFoodX1 = event.touches[0].pageX - canvas.offsetLeft;
		var touchFoodY1 = event.touches[0].pageY - canvasBox.offsetTop;
		if( start == true ){
			for( var i = 0 ; i < foods.length ; i ++){
				if( distances[ foods[i].place ][0] < touchFoodX1 && touchFoodX1 < distances[ foods[i].place ][0] + distance && distances[ foods[i].place ][1] < touchFoodY1 && touchFoodY1 < distances[ foods[i].place ][1] + distance ){
					$(".chuizi,.coin").css({
						"left" : touchFoodX1,
						"top" : touchFoodY1
					});
					$(".chuizi,.coin").css("display","block");
					var moneyNum = Math.floor( Math.random() * 100 );
					var money = 0;
					switch (true){
						case (0 < moneyNum && moneyNum < 60):
							money = 0.5;
							break;
						case (60 <= moneyNum && moneyNum < 85):
							money = 5;
							break;
						case (85 <= moneyNum && moneyNum < 95):
							money = 10;
							break;
						case (95 <= moneyNum && moneyNum < 100):
							money = 100;
							break;
						default:
							break;
					}
					moneySum += money;
					$(".moneyImg p").text( moneySum + '元' );
					cxt.clearRect( distances[ foods[i].place ][0] , distances[ foods[i].place ][1] , distance , distance);
					foods[i].place = 0;
					setTimeout(function(){
						$(".chuizi,.coin").css("display","none");
					},200)
				}
			}
		}else{
			alert("game over！");
			return;
		}
	},false);
	interval();//调用倒计时时间
	drawTime = setInterval(function(){
		draw( cxt );
	},1000)
}