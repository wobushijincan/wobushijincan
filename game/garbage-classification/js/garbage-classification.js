$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
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
                if ((leftVal2 <= ($(".classification.class1").width() + $(".classification.class1").offset().left + 25) && leftVal2 >= ($(".classification.class1").offset().left - 25)) && (topVal2 <= ($(".classification.class1").height() + $(".classification.class1").offset().top + 25) && topVal2 >= ($(".classification.class1").offset().top - 25))) {
                    if ($(this).hasClass('garbage1')) {
                        scoreNum = 1;
                    };
                    $(this).remove();
                }else if((leftVal2 <= ($(".classification.class2").width() + $(".classification.class2").offset().left + 25) && leftVal2 >= ($(".classification.class2").offset().left - 25)) && (topVal2 <= ($(".classification.class2").height() + $(".classification.class2").offset().top + 25) && topVal2 >= ($(".classification.class2").offset().top - 25))){
                    if ($(this).hasClass('garbage2')) {
                        scoreNum = 2;
                    };
                    $(this).remove();
                }else if((leftVal2 <= ($(".classification.class3").width() + $(".classification.class3").offset().left + 25) && leftVal2 >= ($(".classification.class3").offset().left - 25)) && (topVal2 <= ($(".classification.class3").height() + $(".classification.class3").offset().top + 25) && topVal2 >= ($(".classification.class3").offset().top - 25))){
                    if ($(this).hasClass('garbage3')) {
                        scoreNum = 3;
                    };
                    $(this).remove();
                }else if((leftVal2 <= ($(".classification.class4").width() + $(".classification.class4").offset().left + 25) && leftVal2 >= ($(".classification.class4").offset().left - 25)) && (topVal2 <= ($(".classification.class4").height() + $(".classification.class4").offset().top + 25) && topVal2 >= ($(".classification.class4").offset().top - 25))){
                    if ($(this).hasClass('garbage4')) {
                        scoreNum = 4;
                    };
                    $(this).remove();
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

    var addObstacles = setInterval(addObstacle, 2000);
    function addObstacle(){
        $(".garbage-list li").each(function() {
            var i = Math.random() * 5;
            if (i <= 3) {
                var j = Math.random() * 4;
                if (j < 1) {
                    $(this).prepend("<div class='garbage-div run garbage1'><img src='images/medal-img1.png' /></div>");
                }else if (j < 2 && j >= 1) {
                    $(this).prepend("<div class='garbage-div run garbage2'><img src='images/medal-img2.png' /></div>");
                }else if (j < 3 && j >= 2) {
                    $(this).prepend("<div class='garbage-div run garbage3'><img src='images/medal-img3.png' /></div>");
                }else if (j < 4 && j >= 3) {
                    $(this).prepend("<div class='garbage-div run garbage3'><img src='images/medal-img4.png' /></div>");
                };
            };
            $(this).children('.garbage-div').first().bind("touchstart", handleTouchEvent);
            $(this).children('.garbage-div').first().bind("touchend", handleTouchEvent);
            $(this).children('.garbage-div').first().bind("touchmove", handleTouchEvent);
            var totalNum = $("#total-span").html();
            var timeSpeed = 6 - (4 * (6000 - totalNum) / 6000);
            var animationVar = 'run ' + timeSpeed + 's linear forwards';
            $(this).children('.garbage-div').first().css({
                '-webkit-animation': animationVar,
                '-moz-animation': animationVar,
                '-ms-animation': animationVar,
                '-o-animation': animationVar,
                'animation': animationVar
            });
        }); 
    }

    var timeNum = setInterval(timeNum, 10);
    function timeNum () {
        var totalNum = $("#total-span").html(),
            minute = 0,
            second = 0;//时间默认值 
        if (totalNum > 0) {
            minute = Math.floor(totalNum / 6000);
            second = Math.floor(totalNum / 100) - (minute * 60) + 1;
            totalNum--;
        }else{
            minute = 0;
            second = 0;
            totalNum = 0;
        };
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        $("#total-span").html(totalNum);
        $("#minutes-span").html(minute);
        $("#seconds-span").html(second);
    }
});