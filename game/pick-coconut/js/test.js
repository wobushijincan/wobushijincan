$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
        $("#testImg").height($("#testImg").width());
        $("#main-frame").height("auto");
        if ($("#main-frame").height() < $(window).height()) {
            $("#main-frame").height($(window).height());
            $("#testImg").css({
                "margin-top": -$("#testImg").height() / 2,
                "margin-left": -$("#testImg").width() / 2
            });
        };
    }
    $("#obstacles-list li .obstacle").css({
        '-webkit-animation': 'run 6s linear forwards',
        '-moz-animation': 'run 6s linear forwards',
        '-ms-animation': 'run 6s linear forwards',
        '-o-animation': 'run 6s linear forwards',
        'animation': 'run 6s linear forwards'
    });
    var testImg = $("#testImg");
    function handleTouchEvent(event) {
        var leftVal;
        var topVal;
        var leftVal2;
        var topVal2;
        switch (event.type) {
            case "touchstart":
                break;
            case "touchend":
                leftVal = parseFloat($("#testImg").css('left'));
                topVal = parseFloat($("#testImg").css('top'));
                leftVal2 = event.originalEvent.changedTouches[0].clientX;
                topVal2 = event.originalEvent.changedTouches[0].clientY;
                if (Math.abs(leftVal - ($("#main-frame").width() * 20 / 100)) <= 0.00001) {
                    if (leftVal2 > leftVal) {
                        leftVal = $("#main-frame").width() * 80 / 100;
                    };
                }else if (Math.abs( leftVal - ($("#main-frame").width() * 80 / 100)) <= 0.00001) {
                    if (leftVal2 < leftVal) {
                        leftVal = $("#main-frame").width() * 20 / 100;
                    };
                };
                $("#testImg").stop().animate({'left':leftVal}, 500);
                break;
            case "touchmove":
                event.preventDefault(); //阻止滚动
                break;
        }
    }
    testImg.bind("touchstart", handleTouchEvent);
    testImg.bind("touchend", handleTouchEvent);
    testImg.bind("touchmove", handleTouchEvent);

    var addObstacles;
    function addObstacle(){
        $("#obstacles-list li").each(function() {
            if ($(this).index() == 0 || $(this).index() == 2) {
                var i = Math.random() * 5;
                var k = 0;
                if (i >= 2) {
                    $(this).prepend("<div class='obstacle obstacle1'><img src='images/medal-img2.png' /></div>");
                    k = 1;
                };
                if(k == 1){
                    var totalNum = $("#total-span").html();
                    var timeSpeed = 6 - (5 * (6000 - totalNum) / 6000);
                    var animationVar = 'run ' + timeSpeed + 's linear forwards';
                    $(this).children('.obstacle').first().css({
                        '-webkit-animation': animationVar,
                        '-moz-animation': animationVar,
                        '-ms-animation': animationVar,
                        '-o-animation': animationVar,
                        'animation': animationVar
                    });
                } 
            }else if ($(this).index() == 1) {
                var i = Math.random() * 5;
                var k = 0;
                if (i >= 3) {
                    var j = Math.random() * 2;
                    if (j < 1) {
                        $(this).prepend("<div class='obstacle obstacle1'><img src='images/medal-img2.png' /></div>");
                    }else if (j < 2 && j >= 1) {
                        $(this).prepend("<div class='obstacle obstacle2'><img src='images/medal-img3.png' /></div>");
                    };
                    k = 1;
                }else if(i <= 0.1){
                    $(this).prepend("<div class='obstacle obstacle3'><img src='images/medal-img4.png' /></div>");
                    k = 1;
                };
                if(k == 1){
                    if(i <= 0.1){
                        $(this).children('.obstacle').first().css({
                            '-webkit-animation': 'run 1.5s linear forwards',
                            '-moz-animation': 'run 1.5s linear forwards',
                            '-ms-animation': 'run 1.5s linear forwards',
                            '-o-animation': 'run 1.5s linear forwards',
                            'animation': 'run 1.5s linear forwards'
                        });
                    }else{
                        var totalNum = $("#total-span").html();
                        var timeSpeed = 6 - (5 * (6000 - totalNum) / 6000);
                        var animationVar = 'run ' + timeSpeed + 's linear forwards';
                        $(this).children('.obstacle').first().css({
                            '-webkit-animation': animationVar,
                            '-moz-animation': animationVar,
                            '-ms-animation': animationVar,
                            '-o-animation': animationVar,
                            'animation': animationVar
                        });
                    };  
                }
            };
        });
        var addspeed = 1000 + parseInt($("#total-span").html() / 6);
        addObstacles = setTimeout(addObstacle, addspeed);
    }
    setInterval(removeObstacle, 30);
    function removeObstacle() {
        var operationTop = testImg.offset().top;
        var operationLeft = testImg.offset().left;
        var operationWidth = testImg.width();
        var operationHeight = testImg.height();
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
                }else if ($(this).hasClass('obstacle2')){
                    scoreNum = 2;
                }else if ($(this).hasClass('obstacle3')){
                    scoreNum = 3;
                };
                $(this).remove();
            };
            if (scoreNum == 1) {
                $("#score-span").html(parseInt($("#score-span").html()) + 10);
            }else if(scoreNum == 2){
                $("#score-span").html(parseInt($("#score-span").html()) + 20);
            }else if(scoreNum == 3){
                $("#gift-span").html(parseInt($("#gift-span").html()) + 1);
            };
        });
    }
    var timeNums;
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
            clearTimeout(addObstacles);
            clearInterval(timeNums);
        };
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        $("#total-span").html(totalNum);
        $("#minutes-span").html(minute);
        $("#seconds-span").html(second);
    }
    $(window).load(function(){
        addObstacle();
        timeNums = setInterval(timeNum, 10);
    })
    $('body').on('touchmove', function (event) {
        event.preventDefault();
    });
});