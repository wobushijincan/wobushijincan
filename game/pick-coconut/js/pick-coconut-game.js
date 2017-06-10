$(function(){
    var img = $("body").find("img[src]");//图片数组
    var length = img.length;//图片数量
    var downImg = 0;//已下载数量
    var percent = 0;//百分比
    img.each(function() {
        $(this).load(function() {
            downImg ++;
            percent = parseInt(100 * downImg / length);
            var str = percent + "%";
            $("#loading-frame .progress-bar .bar-content").width($("#loading-frame .progress-bar .bar-frame").width() * percent / 100);
            if (percent == 100) {
                setTimeout('$("#loading-frame").remove()', 100);
            };
        });
    });

    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
        $("#loading-frame td").height($(window).height());
        $("#home-frame .cloud-div1").css('top', $("#home-frame").width() * 4 / 640);
        $("#home-frame .cloud-div2").css('top', $("#home-frame").width() * 43 / 640);
        $("#home-frame .top-words").css('top', $("#home-frame").width() * 53 / 640);
        $("#home-frame .top-words").height($("#home-frame").width() * 312 / 640);
        $("#home-frame .monkey-frame").css('top', $("#home-frame").width() * 438 / 640);
        $("#home-frame .monkey-frame").height($("#home-frame").width() * 382 / 640);
        $("#home-frame .shadow-div").css('top', $("#home-frame").width() * 805 / 640);
        $("#home-frame .crab-frame").css('top', $("#home-frame").width() * 798 / 640);
        $("#home-frame .click-div").css('top', $("#home-frame").width() * 610 / 640);
        $("#game-frame #score-div").height($("#game-frame").width() * 58 / 640);
        $("#game-frame #score-div").css({
            "font-size": $("#game-frame").width() * 23 / 640 + "px",
            "line-height": $("#game-frame #score-div").height() + "px"
        });
        $("#game-frame #time-number").height($("#game-frame").width() * 58 / 640);
        $("#game-frame #time-number .time-content span").css({
            "font-size": $("#game-frame").width() * 23 / 640 + "px",
            "line-height": $("#game-frame #score-div").height() + "px"
        });
        $("#game-frame #monkey-frame .monkey-climb").height($("#game-frame").width() * 207 / 640);
        $("#score-frame").height($("#game-frame").width() * 870 / 640);
        $("#score-frame").css({
            top: ($("#game-frame").height() - $("#score-frame").height())/2
        });
        $("#help-frame").height($("#game-frame").width() * 705 / 640);
        $("#help-frame").css({
            top: ($("#game-frame").height() - $("#help-frame").height())/2
        });
        $("#list-frame").height($("#game-frame").width() * 855 / 640);
        $("#list-frame").css({
            top: ($("#game-frame").height() - $("#list-frame").height())/2
        });
        $("#list-frame .list-content").css({
            "margin-top": $("#list-frame").height() * 0.13
        });
    }

    var monkeyFrame = $("#monkey-frame");
    var leftVal;
    var topVal;
    var leftVal1;
    var topVal1;
    var leftVal2;
    var topVal2;
    function handleTouchEvent(event) {
        switch (event.type) {
            case "touchstart":
                leftVal = parseFloat($("#monkey-frame").css('left'));
                topVal = parseFloat($("#monkey-frame").css('top'));
                leftVal1 = event.originalEvent.touches[0].clientX;
                topVal1 = event.originalEvent.touches[0].clientY;
                break;
            case "touchend":
                leftVal2 = event.originalEvent.changedTouches[0].clientX;
                topVal2 = event.originalEvent.changedTouches[0].clientY;
                if (Math.abs(leftVal - ($("#game-frame").width() * 7.18 / 100)) <= 3) {
                    if (leftVal2 > leftVal) {
                        leftVal = $("#game-frame").width() * 46.2 / 100;
                        $("#game-frame #monkey-frame .monkey-climb").hide();
                        $("#game-frame #monkey-frame .monkey-fly").show();
                        $("#monkey-frame").stop().animate({'left':leftVal}, 200, function(){
                            $("#monkey-frame").css('left', $("#game-frame").width() * 60.2 / 100);
                            $("#monkey-frame").addClass('right-side');
                            $("#game-frame #monkey-frame .monkey-climb").show();
                            $("#game-frame #monkey-frame .monkey-fly").hide();
                        });
                    };
                }else if (Math.abs( leftVal - ($("#game-frame").width() * 60.2 / 100)) <= 3) {
                    if (leftVal2 < leftVal) {
                        leftVal = $("#game-frame").width() * 21.18 / 100;
                        $("#game-frame #monkey-frame .monkey-climb").hide();
                        $("#game-frame #monkey-frame .monkey-fly").show();
                        $("#monkey-frame").stop().animate({'left':leftVal}, 200, function(){
                            $("#monkey-frame").css('left', $("#game-frame").width() * 7.18 / 100);
                            $("#monkey-frame").removeClass('right-side');
                            $("#game-frame #monkey-frame .monkey-climb").show();
                            $("#game-frame #monkey-frame .monkey-fly").hide();
                        });
                    };
                };
                break;
            case "touchmove":
                leftVal2 = event.originalEvent.changedTouches[0].clientX;
                topVal2 = event.originalEvent.changedTouches[0].clientY;
                var newTopVal = topVal + (topVal2 - topVal1);
                if (newTopVal < 0) {
                    newTopVal = 0;
                }else if(newTopVal > $(window).height() - $("#monkey-frame .monkey-climb").height()){
                    newTopVal = $(window).height() - $("#monkey-frame .monkey-climb").height();
                };
                $("#monkey-frame").css('top', newTopVal);
                event.preventDefault(); //阻止滚动
                break;
        }
    }
    monkeyFrame.bind("touchstart", handleTouchEvent);
    monkeyFrame.bind("touchend", handleTouchEvent);
    monkeyFrame.bind("touchmove", handleTouchEvent);

    //倒计时时间
    var timeNums;
    var oldDate = new Date();
    function timeNum () {
        var newDate = new Date();
        var minute = 0,
            second = 0,
            ms = 0;//时间默认值 
            $("#total-number").html(oldDate - newDate + 60000);
        if (parseInt($("#total-number").html()) > 0) {
            minute = Math.floor((oldDate - newDate + 60000) / 60000);
            second = Math.floor((oldDate - newDate + 60000) / 1000) - minute * 60;
            ms = Math.floor(((oldDate - newDate + 60000) - second * 1000 - minute * 60 * 1000) * 60 / 1000);
        }else{
            minute = 0;
            second = 0;
            totalNum = 0;
            ms = 0;
            clearInterval(timeNums);
            clearTimeout(addObstacles);
            $("#number-span").html($("#score-number").html());
            $("#number-span2").html($("#score-number").html());
            $("#number-span3").html($("#score-number").html());
            $("#gift-score").html("×" + $("#gift-number").html());
            $("#cover-div").show();
            $("#end-div").show();
            $("#paper-div").show().addClass('run');
            $("#score-frame").show();
            setTimeout('$("#paper-div").hide().removeClass("run")', 1000);
        };
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        if (ms <= 9) ms = '0' + ms;
        $("#minute-number").html(minute);
        $("#seconds-number").html(second);
        $("#ms-number").html(ms);
    }

    var addObstacles;
    function addObstacle(){
        $("#obstacles-list li").each(function() {
            if ($(this).index() == 0 || $(this).index() == 2) {
                var i = Math.random() * 5;
                var k = 0;
                if (i >= 2) {
                    $(this).prepend("<div class='obstacle obstacle1'><img src='images/coconut-img.png' /></div>");
                    k = 1;
                };
                if(k == 1){
                    var totalNum = $("#total-number").html();
                    var timeSpeed = 6 - (5 * (60000 - totalNum) / 60000);
                    var animationVar = 'run ' + timeSpeed + 's linear forwards';
                    $(this).children('.obstacle').first().css({
                        '-webkit-animation': animationVar,
                        'animation': animationVar
                    });
                } 
            }else if ($(this).index() == 1) {
                var i = Math.random() * 5;
                var k = 0;
                if (i >= 3) {
                    $(this).prepend("<div class='obstacle obstacle1'><img src='images/coconut-img.png' /></div>");
                    k = 1;
                }else if(i <= 0.1){
                    $(this).prepend("<div class='obstacle obstacle2'><img src='images/gift-box.png' /></div>");
                    k = 1;
                };
                if(k == 1){
                    if(i <= 0.1){
                        $(this).children('.obstacle').first().css({
                            '-webkit-animation': 'run 1.5s linear forwards',
                            'animation': 'run 1.5s linear forwards'
                        });
                    }else{
                        var totalNum = $("#total-number").html();
                        var timeSpeed = 6 - (5 * (60000 - totalNum) / 60000);
                        var animationVar = 'run ' + timeSpeed + 's linear forwards';
                        $(this).children('.obstacle').first().css({
                            '-webkit-animation': animationVar,
                            'animation': animationVar
                        });
                    };  
                }
            };
        });
        var addspeed = 1000 + parseInt($("#total-number").html() / 60);
        addObstacles = setTimeout(addObstacle, addspeed);
    }
    setInterval(removeObstacle, 30);
    function removeObstacle() {
        var operationTop = monkeyFrame.offset().top;
        var operationLeft = monkeyFrame.offset().left;
        if ($("#monkey-frame .monkey-climb").css('display') == "none") {
            var operationWidth = $("#monkey-frame .monkey-fly").width();
            var operationHeight = $("#monkey-frame .monkey-fly").height();
        }else{
            var operationWidth = $("#monkey-frame .monkey-climb").width();
            var operationHeight = $("#monkey-frame .monkey-climb").height();
        };
        $('#obstacles-list .obstacle').each(function() {
            var scoreNum = 0;
            if (parseInt($(this).css('top')) >= $(window).height()) {
                $(this).remove();
            };
            var obstacleTop = $(this).offset().top;
            var obstacleLeft = $(this).offset().left;
            var obstacleWidth = $(this).width();
            var obstacleHeight = $(this).height();
            
            if ((operationLeft <= (obstacleWidth + obstacleLeft) && operationLeft >= (obstacleLeft - operationWidth)) && (operationTop <= (obstacleHeight + obstacleTop) && operationTop >= (obstacleTop - operationHeight))) {
                if ($(this).hasClass('obstacle1')) {
                    scoreNum = 1;
                    $("#game-frame .game-content .score-frame").append("<div class='score score1'><img src='images/score-img1.png' /></div>");
                }else if ($(this).hasClass('obstacle2')){
                    scoreNum = 2;
                    $("#game-frame .game-content .score-frame").append("<div class='score score1'><img src='images/stars-img.png' /></div>");
                };
                $(this).remove();
                setTimeout('$("#game-frame .game-content .score:first-child").remove()', 300);
            };
            if (scoreNum == 1) {
                $("#score-number").html(parseInt($("#score-number").html()) + 10);
            }else if(scoreNum == 2){
                $("#gift-number").html(parseInt($("#gift-number").html()) + 1);
            };
        });
    }

    $("#home-frame").click(function() {
        $("#home-frame").remove();
        $("#game-frame").show();
        oldDate = new Date();
        timeNums = setInterval(timeNum, 10);
        addObstacle();
    });
    $("#score-frame .close-link").click(function() {
        $("#cover-div").hide();
        $("#paper-div").hide().removeClass('run');
        $("#score-frame").hide();
    });
    $("#replay-btn").click(function() {
        clearTimeout(addObstacles);
        clearInterval(timeNums);
        $("#score-number").html("0");
        $("#gift-number").html("0");
        $("#total-number").html("60000");
        $("#minutes-number").html("01");
        $("#seconds-number").html("00");
        $("#ms-number").html("00");
        $("#cover-div").hide();
        $("#end-div").hide();
        $("#paper-div").hide().removeClass('run');
        $("#score-frame").hide();
        $("#obstacles-list .obstacle").remove();
        addObstacle();
        oldDate = new Date();
        timeNums = setInterval(timeNum, 10);
    });
    $("#replay-btn2").click(function() {
        clearTimeout(addObstacles);
        clearInterval(timeNums);
        $("#score-number").html("0");
        $("#gift-number").html("0");
        $("#total-number").html("60000");
        $("#minutes-number").html("01");
        $("#seconds-number").html("00");
        $("#ms-number").html("00");
        $("#cover-div").hide();
        $("#end-div").hide();
        $("#paper-div").hide().removeClass('run');
        $("#score-frame").hide();
        $("#obstacles-list .obstacle").remove();
        addObstacle();
        oldDate = new Date();
        timeNums = setInterval(timeNum, 10);
    });
    $("#war-btn").click(function() {
        $("#score-frame").hide();
        $("#cover-div").show();
        $("#list-frame").show();
    });
    $("#war-btn2").click(function() {
        $("#score-frame").hide();
        $("#cover-div").show();
        $("#list-frame").show();
    });
    $("#help-div a").click(function() {
        $("#cover-div").show();
        $("#help-frame").show();
    });
    $("#help-frame .close-link").click(function() {
        $("#cover-div").hide();
        $("#help-frame").hide();
    });
    $("#star-btn").click(function() {
        clearTimeout(addObstacles);
        clearInterval(timeNums);
        $("#score-number").html("0");
        $("#gift-number").html("0");
        $("#total-number").html("60000");
        $("#minutes-number").html("01");
        $("#seconds-number").html("00");
        $("#ms-number").html("00");
        $("#cover-div").hide();
        $("#end-div").hide();
        $("#help-frame").hide();
        $("#obstacles-list .obstacle").remove();
        addObstacle();
        oldDate = new Date();
        timeNums = setInterval(timeNum, 10);
    });
    $("#list-frame .close-link").click(function() {
        $("#cover-div").hide();
        $("#list-frame").hide();
    });
    $('body').on('touchmove', function (event) {
        event.preventDefault();
    });
});