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
    
    addItem();
    //倒计时时间
    var timeNums = setInterval(timeNum, 10);
    var oldDate = new Date();
    function timeNum () {
        var newDate = new Date();
        var minute = 0,
            second = 0;//时间默认值 
            $("#total-span").html(oldDate - newDate + 60000);
        if (parseInt($("#total-span").html()) > 0) {
            minute = Math.floor((oldDate - newDate + 60000) / 60000);
            second = Math.floor((oldDate - newDate + 60000) / 1000) - minute * 60;
        }else{
            minute = 0;
            second = 0;
            totalNum = 0;
            clearTimeout(addItems);
            clearInterval(timeNums);
        };
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        $("#minutes-span").html(minute);
        $("#seconds-span").html(second);
    }

    var addItems;
    function addItem() {
        $("#main-content li.form0").each(function() {
            var i = Math.random() * 5;
            if (i > 4) {
                $(this).children('.form-content').html('<div class="item-div">0</div>');
                $(this).addClass('form2').removeClass('form0').attr('formNumber', '2');
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