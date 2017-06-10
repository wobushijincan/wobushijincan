var canvas;//定义canvas对象;
function canvasObj( canvas ){
	this.mycanvas = canvas;
	this.cxt = canvas.getContext("2d");
}

function distanfun(){//位置坐标
	distances = [
		[ 0 , 0 ] , [  distance , 0 ] , [ 2 * distance , 0 ] , [ 3 * distance , 0 ],
		[ 0 , distance ] , [  distance , distance ] , [ 2 * distance , distance ] , [ 3 * distance , distance ],
		[ 0 , distance * 2 ] , [  distance , distance * 2 ] , [ 2 * distance , distance * 2 ] , [ 3 * distance , distance * 2 ],
		[ 0 , distance * 3 ] , [  distance , distance * 3 ] , [ 2 * distance , distance * 3 ] , [ 3 * distance , distance * 3 ]
	]
}	



function foodsObj( imgsrc ){
	this.img = new Image();
	this.img.src = imgsrc;
	this.width = 77.5;
	this.height = 77.5;
	this.margin_left = 2;
	this.top = 0;
}
var food1 = new foodsObj("img/medal-img2.png");
var food2 = new foodsObj("img/medal-img3.png");
var foods = [ food1 , food2 ];

function drawfoods(){
	for( var i = 0 ; i < foods.length ; i++ ){
		canvas.cxt.drawImage( foods[i].img , foods[i].margin_left , foods[i].top , foods[i].width , foods[i].height );
	}
	update();
}

function update(){
	canvas.cxt.clearRect( 0 , 0 , 320 , 480 );
	for( var i = 0 ; i < foods.length ; i++ ){
		foods[i].top++;
		canvas.cxt.drawImage( foods[i].img , foods[i].margin_left , foods[i].top , foods[i].width , foods[i].height );
	}
	setTimeout( update , 10);
}

window.onload = function(){
//	bodySize();//自适应
//	window.onresize = function(){
//		bodySize();
//	}
//	function bodySize(){
//		
//	}
	canvas = new canvasObj(document.getElementById("myCanvas"));
	drawfoods()
}
