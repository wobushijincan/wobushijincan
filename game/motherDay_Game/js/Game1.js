var sexindex = 0;  //0为男，1为女;
var sex = ['.boy','.girl'];
var timer1 = 0;
var timer2 = 0;
var timer1_Num = 0; //3秒倒计时开始
var limit_bottom = -55; //拉扯极限;
var topValue1 = 0;
var topValue2 = 0;
var gameOne_y = 0;
var gameOne_vy1 = 3;  //往上拉的速度;
var gameOne_vy2 = -1; //往下拉的速度
var duration=4900;
var endTime = 0;

$(sex[sexindex]).css('display','block');
$('.pass-one').click(function(){
	$('#pass').css('display','none');
	$('#game-one,#zhe,#zheCeng-passOne').css('display','block');
	$('.progressBox .bar').css('left',0 + "%");
});

$('.zhe-passOne-closeBtn').click(function(){
	timer1_Num = 3;
	$('#game-one .timer').text(timer1_Num);
	$('#game-one .timer').show();
	$('.pass-one-arrow').addClass('arrow');
	$('#zhe,#zheCeng-passOne').hide();
	timer1 = setInterval(timeOut,1000);
});
function timeOut(){
	timer1_Num -- ;
	$('#game-one .timer').text(timer1_Num);
	if(timer1_Num == 0){
		clearInterval(timer1);
		$('#game-one .timer').css('display','none');
		gameOne();
		endTime = new Date().getTime() + duration + 100;
		interval();
	}
}

//游戏时间
function interval()
{
    var n= ( endTime - new Date().getTime() ) / 1000 ;
    var t = 5 - n;
    //结束时间
    if(n<0){
    	$(sex[sexindex]).unbind('touchstart');
    	$(sex[sexindex]).unbind('touchmove');
    	$(sex[sexindex]).unbind('touchend');
	    clearInterval(timer2);
	    $('#game-one').hide();
	    $('#pass').show();
	    $('.pass-one-arrow').removeClass('arrow');
	    $(sex[sexindex]).css('bottom',0 + 'px');
    	return;
    };
    var nowprogress = -t * 20;
    $('.progressBox .bar').css('left',nowprogress + "%");
    setTimeout(interval, 10);
}

function gameOne(){
    
	$(sex[sexindex]).bind('touchstart',function(event){
		topValue1 = event.originalEvent.touches[0].clientY;
	});
	$(sex[sexindex]).bind('touchmove',function(event){
		topValue2 = event.originalEvent.changedTouches[0].clientY;
        if( topValue2 > topValue1 + 20 ){
        	gameOne_y = gameOne_y + gameOne_vy2;
        	if(gameOne_y >= limit_bottom){
	        	$(sex[sexindex]).css('bottom',gameOne_y + 'px');
			}else{
				$(sex[sexindex]).css('bottom',limit_bottom + 'px');
			}
        }
	});
	$(sex[sexindex]).bind('touchend',function(event){
		event.preventDefault();
    	if(gameOne_y < limit_bottom){
    		clearInterval(timer2);
			timer2 = setInterval(timeOut2,200);
		}
	});
	
	//往上升
	function timeOut2(){
		gameOne_vy2 = -0.3;
		gameOne_y = gameOne_y + gameOne_vy1;
		$(sex[sexindex]).css('bottom',gameOne_y + 'px');
		if(gameOne_y >= -1){
			clearInterval(timer2);
			gameOne_vy2 = -1;
		}
	}
}

/*给2个水平的鸡毛掸子，给一个计时器，随机一个鸡毛掸子，使其移动，
此时给这个鸡毛掸子一个属性（用来标示哪个鸡毛掸子）。在这短短时间内，如果不按闪躲按钮，
这判断被打到。 
 
*/

//第二个游戏开始
//第二关的角色
var role = ['.pass-two-boy','.pass-two-girl'];
var leftTime = 0;
var rightTime = 0;
var left_vx = -10;
var right_vx = 10;
var maxLeft = parseInt($(window).width() - $(window).width() * 482 / 640);
$('.pass-two').click(function(){
	$('#pass').css('display','none');
	$('#game-two,#zhe,#zheCeng-passTwo').css('display','block');
	randomFun();
})

$('.zhe-passTwo-closeBtn').click(function(){
//	timer1_Num = 3;
//	$('#game-one .timer').text(timer1_Num);
//	$('#game-one .timer').show();
	$('#zhe,#zheCeng-passTwo').hide();
//	timer1 = setInterval(timeOut,1000);
});

//左移动  start
$('.left_Btn').bind('touchend',function(event){
	event.preventDefault();
	$(role[sexindex]).css('background-position' , '0 -12.9rem');
	clearInterval(rightTime);
	clearInterval(leftTime);
	leftTime = setInterval( leftFun , 50 );
});

function leftFun(){
	leftValue = parseInt( $(role[sexindex]).css('left') );
	leftValue += left_vx;
	if( leftValue < 0 ){
		clearInterval(leftTime);
	}else{
		$(role[sexindex]).css('left',leftValue);
	}
}
//左移动  end

//右移动  start
$('.right_Btn').bind('touchend',function(event){
	event.preventDefault();
	$(role[sexindex]).css('background-position' , '0 0');
	clearInterval(leftTime);
	clearInterval(rightTime);
	rightTime = setInterval( rightFun , 50 );
});

function rightFun(){
	rightValue = parseInt( $(role[sexindex]).css('left') );
	rightValue += right_vx;
	if( rightValue > maxLeft ){
		clearInterval(rightTime);
	}else{
		$(role[sexindex]).css('left',rightValue);
	}
}
//右移动  end

var dusterIndex = 1;
var duster = [
				{'className':'.icon5','vx':-5,'maxValue' : 100,'minValue': 59},
				{'className':'.icon6','vx':5,'maxValue': -26 ,'minValue' : -68}
			]; //鸡毛掸子;
var gameTime = 0;
function gameTwo(){
	var nowLeftValue = parseInt($(duster[dusterIndex].className).css('left')) * 100 / $(window).width();
	nowLeftValue += duster[dusterIndex].vx;
	if(nowLeftValue > parseInt(duster[dusterIndex].maxValue)){
		duster[dusterIndex].vx = -5;
		if(dusterIndex == 0){
			$(duster[dusterIndex].className).removeAttr('date','arrive');
			clearInterval(gameTime);
			randomFun();
		}else{
			$(duster[dusterIndex].className).attr('date','arrive');
		}
	}else if( nowLeftValue < parseInt(duster[dusterIndex].minValue)){
		duster[dusterIndex].vx = 5;
		if(dusterIndex == 1){
			$(duster[dusterIndex].className).removeAttr('date','arrive');
			clearInterval(gameTime);
			randomFun();
		}else{
			$(duster[dusterIndex].className).attr('date','arrive');
		}
	}
	$(duster[dusterIndex].className).css('left',nowLeftValue + '%');
}

function randomFun(){
	dusterIndex = Math.floor(Math.random()*2);
	gameTime = setInterval(gameTwo,50);
}



