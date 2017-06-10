$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
        $("#main-content").height($("#main-content").width());
        $("#main-content").css('margin-top', -$("#main-content").height() / 2);
        $("#main-content li.forms .form-content").height($("#main-content li.forms .form-content").width());
        $("#main-content li.forms .form-content").css('line-height', $("#main-content li.forms .form-content").height() + "px");
        $("#score-div").height($("#main-frame").width() * 58 / 640)
        $("#score-div span").css({
            "font-size": $("#main-frame").width() * 26 / 640,
            "line-height": $("#score-div").height() * 92 /100 +"px"
        });
        $("#time-number").height($("#main-frame").width() * 58 / 640);
        $("#time-number .time-content").css({
            "font-size": $("#main-frame").width() * 26 / 640,
            "line-height": $("#time-number").height() * 92 /100 +"px"
        });
    }
    var redbao=["0","0.5","5","10","100"];
    addItem();
    var timeNums = setInterval(timeNum, 10);
    function timeNum () {
        var totalNum = parseInt($("#total-span").html()),
            minute = 0,
            second = 0;//时间默认值 
        if (totalNum > 0) {
            minute = Math.floor((totalNum + 100) / 6000);
            second = Math.floor((totalNum + 100) / 100) - (minute * 60);
            totalNum--;
        }else{
            minute = 0;
            second = 0;
            totalNum = 0;
            clearTimeout(addItems);
            clearInterval(timeNums);
        };
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        $("#total-span").html(totalNum);
        $("#minutes-span").html(minute);
        $("#seconds-span").html(second);
    }
    var addItems;
    function addItem() {
        $("#main-content li.form0").each(function() {
            var i = Math.random() * 5;
            if (i > 4) {
				//概率：redbao[0]=50%;redbao[1]=20%;redbao[2]=18%;redbao[3]=10%;redbao[4]=2%;
			    var index = Math.random()*1000;//红包数组下标："谢谢参与","0.5","5","10"；0-1
			    if(index>0 && index<=500){
	                $(this).children('.form-content').html('<div class="item-div">'+redbao[0]+'</div>');
	                $(this).addClass('form2').removeClass('form0').attr('formNumber', '2');
			    }else if(index>500 && index<=700){
			    	$(this).children('.form-content').html('<div class="item-div">'+redbao[1]+'</div>');
	                $(this).addClass('form2').removeClass('form0').attr('formNumber', '2');
			    }else if(index>700 && index<=880){
			    	$(this).children('.form-content').html('<div class="item-div">'+redbao[2]+'</div>');
	                $(this).addClass('form2').removeClass('form0').attr('formNumber', '2');
			    }else if(index>880 && index<=980){
			    	$(this).children('.form-content').html('<div class="item-div">'+redbao[3]+'</div>');
	                $(this).addClass('form2').removeClass('form0').attr('formNumber', '2');
			    }else if(index>980 && index<1000){
			    	$(this).children('.form-content').html('<div class="item-div">'+redbao[4]+'</div>');
	                $(this).addClass('form2').removeClass('form0').attr('formNumber', '2');
			    }
                removeItem($(this));
            };
        });
        var addspeed = 1000 + parseInt($("#total-span").html() / 6);
        addItems = setTimeout(addItem, addspeed);
    }
    function removeItem(element) {
        var removeItems = setTimeout(function(){
            element.children('.form-content').html('');
            element.addClass('form0').removeClass('form2').attr('formNumber', '0');
        }, 2000);
        element.click(function() {
            clearTimeout(removeItems);
            if ($(this).hasClass('form2')) {
                $("#score-span").html(parseInt($("#score-span").html()) + 1);
                $(this).children('.form-content').html('');
                $(this).addClass('form0').removeClass('form2').attr('formNumber', '0');
            };
        });
    }
});