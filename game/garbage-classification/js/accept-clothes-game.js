$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
        $("#loading td").height($(window).height());
        $("#score-div").height($("#main-frame").width() * 58 / 640)
        $("#score-div span").css({
            "font-size": $("#main-frame").width() * 26 / 640,
            "line-height": $("#score-div").height() * 92 /100 +"px"
        });
        $("#time-number").height($("#main-frame").width() * 58 / 640)
        $("#time-number .time-content").css({
            "font-size": $("#main-frame").width() * 26 / 640,
            "line-height": $("#score-div").height() * 92 /100 +"px"
        });
        $(".classification").height($("#main-frame").width() * 171 / 640);
        $(".classification.class1").css('top', $("#main-frame").width() * 150 / 640);
        $(".classification.class2").css('top', $("#main-frame").width() * 150 / 640);
        $(".classification.class3").css('bottom', $("#main-frame").width() * 100 / 640);
        $(".classification.class4").css('bottom', $("#main-frame").width() * 100 / 640);
        $("#score-frame").height($("#main-frame").width() * 870 / 640);
        $("#score-frame").css({
            top: ($("#main-frame").height() - $("#score-frame").height())/2
        });
        $("#help-frame").height($("#main-frame").width() * 705 / 640);
        $("#help-frame").css({
            top: ($("#main-frame").height() - $("#help-frame").height())/2
        });
        $("#list-frame").height($("#main-frame").width() * 855 / 640);
        $("#list-frame").css({
            top: ($("#main-frame").height() - $("#list-frame").height())/2
        });
        $("#list-frame .list-content").css({
            "margin-top": $("#list-frame").height() * 0.13
        });
    }

    $(".garbage-list .garbage-div.run").css({
        '-webkit-animation': 'run 6s linear forwards',
        '-moz-animation': 'run 6s linear forwards',
        '-ms-animation': 'run 6s linear forwards',
        '-o-animation': 'run 6s linear forwards',
        'animation': 'run 6s linear forwards'
    });

    var garbageDiv = $(".garbage-list .garbage-div");
    function handleTouchEvent(event) {
        var leftVal1 = 0;
        var topVal1 = 0;
        var leftVal2 = 0;
        var topVal2 = 0;
        switch (event.type) {
            case "touchstart":
                $(this).css({
                    '-webkit-animation-name': "none",
                    '-moz-animation-name': "none",
                    '-ms-animation-name': "none",
                    '-o-animation-name': "none",
                    'animation-name': "none"
                });
                leftVal1 = event.originalEvent.touches[0].clientX;
                topVal1 = event.originalEvent.touches[0].clientY;
                $(this).css({
                    left: leftVal1,
                    top: topVal1
                });
                break;
            case "touchend":
                leftVal2 = event.originalEvent.changedTouches[0].clientX;
                topVal2 = event.originalEvent.changedTouches[0].clientY;
                var scoreNum = 0;
                $(this).css({
                    left: leftVal2,
                    top: topVal2
                });
                if ((leftVal2 <= ($(".classification.class1").width() + $(".classification.class1").offset().left + $(this).width()/2) && leftVal2 >= ($(".classification.class1").offset().left - $(this).width()/2)) && (topVal2 <= ($(".classification.class1").height() + $(".classification.class1").offset().top + $(this).height()/2) && topVal2 >= ($(".classification.class1").offset().top - $(this).height()/2))) {
                    if ($(this).hasClass('garbage1')) {
                        scoreNum = 1;
                        $(".classification.class1").prepend("<div class='bonus-points bonus-points1'><img src='images/score-ico1.png' /></div>");
                    }else if ($(this).hasClass('garbage5')){
                        scoreNum = 5;
                        $(".classification.class1").prepend("<div class='bonus-points bonus-points5'><img src='images/score-ico5.png' /></div>");
                    };
                    $(this).remove();
                    setTimeout('$(".classification.class1 .bonus-points:first-child").remove()', 500);
                }else if((leftVal2 <= ($(".classification.class2").width() + $(".classification.class2").offset().left + $(this).width()/2) && leftVal2 >= ($(".classification.class2").offset().left - $(this).width()/2)) && (topVal2 <= ($(".classification.class2").height() + $(".classification.class2").offset().top + $(this).height()/2) && topVal2 >= ($(".classification.class2").offset().top - $(this).height()/2))){
                    if ($(this).hasClass('garbage2')) {
                        scoreNum = 2;
                        $(".classification.class2").prepend("<div class='bonus-points bonus-points2'><img src='images/score-ico2.png' /></div>");
                    }else if ($(this).hasClass('garbage5')){
                        scoreNum = 5;
                        $(".classification.class2").prepend("<div class='bonus-points bonus-points5'><img src='images/score-ico5.png' /></div>");
                    };
                    $(this).remove();
                    setTimeout('$(".classification.class2 .bonus-points:first-child").remove()', 500);
                }else if((leftVal2 <= ($(".classification.class3").width() + $(".classification.class3").offset().left + $(this).width()/2) && leftVal2 >= ($(".classification.class3").offset().left - $(this).width()/2)) && (topVal2 <= ($(".classification.class3").height() + $(".classification.class3").offset().top + $(this).height()/2) && topVal2 >= ($(".classification.class3").offset().top - $(this).height()/2))){
                    if ($(this).hasClass('garbage3')) {
                        scoreNum = 3;
                        $(".classification.class3").prepend("<div class='bonus-points bonus-points3'><img src='images/score-ico3.png' /></div>");
                    }else if ($(this).hasClass('garbage5')){
                        scoreNum = 5;
                        $(".classification.class3").prepend("<div class='bonus-points bonus-points5'><img src='images/score-ico5.png' /></div>");
                    };
                    $(this).remove();
                    setTimeout('$(".classification.class3 .bonus-points:first-child").remove()', 500);
                }else if((leftVal2 <= ($(".classification.class4").width() + $(".classification.class4").offset().left + $(this).width()/2) && leftVal2 >= ($(".classification.class4").offset().left - $(this).width()/2)) && (topVal2 <= ($(".classification.class4").height() + $(".classification.class4").offset().top + $(this).height()/2) && topVal2 >= ($(".classification.class4").offset().top - $(this).height()/2))){
                    if ($(this).hasClass('garbage4')) {
                        scoreNum = 4;
                        $(".classification.class4").prepend("<div class='bonus-points bonus-points4'><img src='images/score-ico4.png' /></div>");
                    }else if ($(this).hasClass('garbage5')){
                        scoreNum = 5;
                        $(".classification.class4").prepend("<div class='bonus-points bonus-points5'><img src='images/score-ico5.png' /></div>");
                    };
                    $(this).remove();
                    setTimeout('$(".classification.class4 .bonus-points:first-child").remove()', 500);
                }else{
                    $(this).stop().animate({left: $("#main-frame").width() + 25}, 200, function() {
                        $(this).remove();
                    })
                };
                if (scoreNum == 1) {
                    $("#score-span").html(parseInt($("#score-span").html()) + 10);
                }else if(scoreNum == 2){
                    $("#score-span").html(parseInt($("#score-span").html()) + 20);
                }else if(scoreNum == 3){
                    $("#score-span").html(parseInt($("#score-span").html()) + 30);
                }else if(scoreNum == 4){
                    $("#score-span").html(parseInt($("#score-span").html()) + 40);
                }else if(scoreNum == 5){
                    $("#gift-span").html(parseInt($("#gift-span").html()) + 1);
                };
                break;
            case "touchmove":
                event.preventDefault(); //阻止滚动
                leftVal2 = event.originalEvent.changedTouches[0].clientX;
                topVal2 = event.originalEvent.changedTouches[0].clientY;
                $(this).css({
                    left: leftVal2,
                    top: topVal2
                });
                break;
        }
    }
    garbageDiv.bind("touchstart", handleTouchEvent);
    garbageDiv.bind("touchend", handleTouchEvent);
    garbageDiv.bind("touchmove", handleTouchEvent);

    var addObstacles;
    function addObstacle(){
        $(".garbage-list li").each(function() {
            var i = Math.random() * 5;
            var k = 0;
            if (i <= 3) {
                var j = Math.random() * 4;
                if (j < 1) {
                    $(this).prepend("<div class='garbage-div run garbage1'><img src='images/medal-img1.png' /></div>");
                }else if (j < 2 && j >= 1) {
                    $(this).prepend("<div class='garbage-div run garbage2'><img src='images/medal-img2.png' /></div>");
                }else if (j < 3 && j >= 2) {
                    $(this).prepend("<div class='garbage-div run garbage3'><img src='images/medal-img3.png' /></div>");
                }else if (j < 4 && j >= 3) {
                    $(this).prepend("<div class='garbage-div run garbage4'><img src='images/medal-img4.png' /></div>");
                };
                k = 1;
            }else if(i >= 4.9){
                $(this).prepend("<div class='garbage-div run garbage5'><img src='images/medal-img5.png' /></div>");
                k = 1;
            };
            if(k == 1){
                $(this).children('.garbage-div').first().bind("touchstart", handleTouchEvent);
                $(this).children('.garbage-div').first().bind("touchend", handleTouchEvent);
                $(this).children('.garbage-div').first().bind("touchmove", handleTouchEvent);
                var totalNum = $("#total-span").html();
                var timeSpeed = 6 - (5 * (60000 - totalNum) / 60000);
                var animationVar = 'run ' + timeSpeed + 's linear forwards';
                $(this).children('.garbage-div').first().css({
                    '-webkit-animation': animationVar,
                    '-moz-animation': animationVar,
                    '-ms-animation': animationVar,
                    '-o-animation': animationVar,
                    'animation': animationVar,
                    '-webkit-transform': 'rotate(' + 360 * Math.random() + 'deg)',
                    '-moz-transform': 'rotate(' + 360 * Math.random() + 'deg)',
                    '-ms-transform': 'rotate(' + 360 * Math.random() + 'deg)',
                    '-o-transform': 'rotate(' + 360 * Math.random() + 'deg)',
                    'transform': 'rotate(' + 360 * Math.random() + 'deg)'
                });
            }
        }); 
        var addspeed = 1000 + parseInt($("#total-span").html() / 60);
        addObstacles = setTimeout(addObstacle, addspeed);
    }

    //移除掉落物
    var move_obstacles = setInterval(move_obstacle, 33);
    function move_obstacle(){
        $("#main-frame .garbage-list li .garbage-div").each(function() {
            var obstacleLeft = $(this).offset().left;
            if (obstacleLeft > $("#main-frame").width()) {
                $(this).remove();
            };
        });
    }

    var timeNums;
    var oldDate = new Date();
    function timeNum () {
        var newDate = new Date();
        var minute = 0,
            second = 0;//时间默认值 
            $("#total-span").html(oldDate - newDate + 60000);
        if (parseInt($("#total-span").html()) > 0) {
            minute = Math.floor((oldDate - newDate + 60000 + 1000) / 60000);
            second = Math.floor((oldDate - newDate + 60000 + 1000) / 1000) - minute * 60;
        }else{
            minute = 0;
            second = 0;
            totalNum = 0;
            clearTimeout(addObstacles);
            clearInterval(timeNums);
            $("#number-span").html($("#score-span").html());
            $("#number-span2").html($("#score-span").html());
            $("#number-span3").html($("#score-span").html());
            $("#gift-score").html("×" + $("#gift-span").html());
            $("#end-div").show();
            $("#cover-div").show();
            $("#paper-div").show().addClass('run');
            $("#score-frame").show();
            setTimeout('$("#paper-div").hide().removeClass("run")', 1000);
            document.getElementById("media").pause();
        };
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        $("#minutes-span").html(minute);
        $("#seconds-span").html(second);
    }

    $("#score-frame .close-link").click(function() {
        $("#cover-div").hide();
        $("#paper-div").hide().removeClass('run');
        $("#score-frame").hide();
    });
    $("#replay-btn").click(function() {
        $("#score-span").html("0");
        $("#gift-span").html("0");
        $("#total-span").html("60000");
        $("#minutes-span").html("01");
        $("#seconds-span").html("00");
        $("#cover-div").hide();
        $("#end-div").hide();
        $("#paper-div").hide().removeClass('run');
        $("#score-frame").hide();
        addObstacle();
        oldDate = new Date();
        timeNums = setInterval(timeNum, 10);
        document.getElementById("media").play();
    });
    $("#replay-btn2").click(function() {
        clearTimeout(addObstacles);
        clearInterval(timeNums);
        $("#score-span").html("0");
        $("#gift-span").html("0");
        $("#total-span").html("60000");
        $("#minutes-span").html("01");
        $("#seconds-span").html("00");
        $("#cover-div").hide();
        $("#end-div").hide();
        $("#paper-div").hide().removeClass('run');
        $("#score-frame").hide();
        addObstacle();
        oldDate = new Date();
        timeNums = setInterval(timeNum, 10);
        document.getElementById("media").play();
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
        $("#score-span").html("0");
        $("#gift-span").html("0");
        $("#total-span").html("60000");
        $("#minutes-span").html("01");
        $("#seconds-span").html("00");
        $("#cover-div").hide();
        $("#end-div").hide();
        $("#help-frame").hide();
        clearTimeout(addObstacles);
        clearInterval(timeNums);
        $(".garbage-list .garbage-div").remove();
        addObstacle();
        oldDate = new Date();
        timeNums = setInterval(timeNum, 10);
        document.getElementById("media").play();
    });
    $("#list-frame .close-link").click(function() {
        $("#cover-div").hide();
        $("#list-frame").hide();
    });
    $(window).load(function(){
        addObstacle();
        timeNums = setInterval(timeNum, 10);
    })
    $('body').on('touchmove', function (event) {
        event.preventDefault();
    });
});