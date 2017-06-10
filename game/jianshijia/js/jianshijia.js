$(function(){
    // var img = $("body").find("img[src]");//图片数组
    // var length = img.length;//图片数量
    // var downImg = 0;//已下载数量
    // var percent = 0;//百分比
    // img.each(function() {
    //     $(this).load(function() {
    //         downImg ++;
    //         percent = parseInt(100*downImg/length);
    //         if (percent >= 95) {
    //             setTimeout(function() {
    //                 $("#loading-frame").hide();
    //                 $("#home-frame").addClass('run');
    //             }, 100);
    //         };
    //     });
    // });

    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
        $("#loading-frame .loading-content").height($("#loading-frame .loading-content").width() * 133 / 169);
        $("#home-frame .gestures-frame").css('bottom', $("#home-frame").width() * 45 / 640);
        $("#home-frame .home-child").height($(window).width() * 310 / 640);
        $("#game-frame .classification").height($(window).width() * 266 / 640);
        $("#score-div").height($(window).width() * 58 / 640);
        $("#score-div span").css({
            "font-size": $(window).width() * 24 / 640,
            "line-height": $("#score-div").height() * 92 /100 +"px"
        });
        $("#game-frame #time-number").height($("#game-frame").width() * 58 / 640);
        $("#game-frame #time-number .time-content span").css({
            "font-size": $("#game-frame").width() * 23 / 640 + "px",
            "line-height": $("#game-frame #score-div").height() + "px"
        });
        $(".classification.class1").css('top', $(window).width() * 150 / 640);
        $(".classification.class2").css('top', $(window).width() * 150 / 640);
        $(".classification.class3").css('bottom', $(window).width() * 100 / 640);
        $(".classification.class4").css('bottom', $(window).width() * 100 / 640);
        $("#score-frame").height($(window).width() * 857 / 640);
        $("#score-frame").css({
            top: ($(window).height() - $("#score-frame").height())/2
        });
        $("#help-frame").height($(window).width() * 796 / 640);
        $("#help-frame").css({
            top: ($(window).height() - $("#help-frame").height())/2
        });
        $("#list-frame").height($(window).width() * 887 / 640);
        $("#list-frame").css({
            top: ($(window).height() - $("#list-frame").height())/2
        });
        $("#list-frame .list-content").css({
            "margin-top": $("#list-frame").height() * 0.12
        });
        $(".garbage-list .garbage-div.garbage").css({
            "margin-left": (-$(window).width() * 167 / 640)/2 + "px"
        });
    }

    $(".garbage-list .garbage-div.run").css({
        '-webkit-animation': 'run 6s linear forwards',
        'animation': 'run 6s linear forwards'
    });

    var childStar1;
    var childStar2;
    var childStar3;
    var childStar4;
    var childFaces;
    function childFace() {
        $("#game-frame .smiling-face").each(function() {
            if (!$(this).hasClass('run')) {
                var $this = $(this);
                var i = Math.random() * 5;
                var j = $this.index() - 1;
                var addspeed = 1000 + parseInt($("#total-span").html() / 60);
                if (i <= 3) {
                    $this.removeClass('smiling-face').addClass('crying-face');
                    $this.children('.child-div').children('img').attr('src', 'images/child-img' + j + 'A.png');
                    if ($this.index() == 2) {
                        childStar1 = setTimeout(function() {
                            $this.removeClass('crying-face').addClass('smiling-face');
                            $this.children('.child-div').children('img').attr('src', 'images/child-img' + j + 'B.png');
                        },addspeed);
                    }else if ($this.index() == 3) {
                        childStar2 = setTimeout(function() {
                            $this.removeClass('crying-face').addClass('smiling-face');
                            $this.children('.child-div').children('img').attr('src', 'images/child-img' + j + 'B.png');
                        },addspeed);
                    }else if ($this.index() == 4) {
                        childStar3 = setTimeout(function() {
                            $this.removeClass('crying-face').addClass('smiling-face');
                            $this.children('.child-div').children('img').attr('src', 'images/child-img' + j + 'B.png');
                        },addspeed);
                    }else if ($this.index() == 5) {
                        childStar4 = setTimeout(function() {
                            $this.removeClass('crying-face').addClass('smiling-face');
                            $this.children('.child-div').children('img').attr('src', 'images/child-img' + j + 'B.png');
                        },addspeed);
                    };
                };
            };
        });
        childFaces = setTimeout(childFace, 3000);
    }

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
                    if ($(".classification.class1").hasClass('crying-face')) {
                        scoreNum = 1;
                        clearTimeout(childStar1);
                        $(".classification.class1").removeClass('crying-face').addClass('smiling-face');
                        $(".classification.class1").children('.child-div').children('img').attr('src', 'images/child-img1B.png');
                        $(".classification.class1").addClass('run');
                        $(".classification.class1").prepend("<div class='bonus-points bonus-points1'><img src='images/score-ico1.png' /></div><div class='light-spot'><img src='images/light-spot.png' /></div>");
                        setTimeout(function() {
                            $(".classification.class1 .bonus-points").remove();
                            $(".classification.class1 .light-spot").remove();
                            $(".classification.class1").removeClass('run');
                        }, 600);
                    };
                    $(this).remove();
                }else if((leftVal2 <= ($(".classification.class2").width() + $(".classification.class2").offset().left + $(this).width()/2) && leftVal2 >= ($(".classification.class2").offset().left - $(this).width()/2)) && (topVal2 <= ($(".classification.class2").height() + $(".classification.class2").offset().top + $(this).height()/2) && topVal2 >= ($(".classification.class2").offset().top - $(this).height()/2))){
                    if ($(".classification.class2").hasClass('crying-face')) {
                        scoreNum = 2;
                        clearTimeout(childStar2);
                        $(".classification.class2").removeClass('crying-face').addClass('smiling-face');
                        $(".classification.class2").children('.child-div').children('img').attr('src', 'images/child-img2B.png');
                        $(".classification.class2").addClass('run');
                        $(".classification.class2").prepend("<div class='bonus-points bonus-points2'><img src='images/score-ico2.png' /></div><div class='light-spot'><img src='images/light-spot.png' /></div>");
                        setTimeout(function() {
                            $(".classification.class2 .bonus-points").remove();
                            $(".classification.class2 .light-spot").remove();
                            $(".classification.class2").removeClass('run');
                        }, 600);
                    };
                    $(this).remove();
                }else if((leftVal2 <= ($(".classification.class3").width() + $(".classification.class3").offset().left + $(this).width()/2) && leftVal2 >= ($(".classification.class3").offset().left - $(this).width()/2)) && (topVal2 <= ($(".classification.class3").height() + $(".classification.class3").offset().top + $(this).height()/2) && topVal2 >= ($(".classification.class3").offset().top - $(this).height()/2))){
                    if ($(".classification.class3").hasClass('crying-face')) {
                        scoreNum = 3;
                        clearTimeout(childStar3);
                        $(".classification.class3").removeClass('crying-face').addClass('smiling-face');
                        $(".classification.class3").children('.child-div').children('img').attr('src', 'images/child-img3B.png');
                        $(".classification.class3").addClass('run');
                        $(".classification.class3").prepend("<div class='bonus-points bonus-points3'><img src='images/score-ico3.png' /></div><div class='light-spot'><img src='images/light-spot.png' /></div>");
                        setTimeout(function() {
                            $(".classification.class3 .bonus-points").remove();
                            $(".classification.class3 .light-spot").remove();
                            $(".classification.class3").removeClass('run');
                        }, 600);
                    };
                    $(this).remove();
                }else if((leftVal2 <= ($(".classification.class4").width() + $(".classification.class4").offset().left + $(this).width()/2) && leftVal2 >= ($(".classification.class4").offset().left - $(this).width()/2)) && (topVal2 <= ($(".classification.class4").height() + $(".classification.class4").offset().top + $(this).height()/2) && topVal2 >= ($(".classification.class4").offset().top - $(this).height()/2))){
                    if ($(".classification.class4").hasClass('crying-face')) {
                        scoreNum = 4;
                        clearTimeout(childStar4);
                        $(".classification.class4").removeClass('crying-face').addClass('smiling-face');
                        $(".classification.class4").children('.child-div').children('img').attr('src', 'images/child-img4B.png');
                        $(".classification.class4").addClass('run');
                        $(".classification.class4").prepend("<div class='bonus-points bonus-points4'><img src='images/score-ico4.png' /></div><div class='light-spot'><img src='images/light-spot.png' /></div>");
                        setTimeout(function() {
                            $(".classification.class4 .bonus-points").remove();
                            $(".classification.class4 .light-spot").remove();
                            $(".classification.class4").removeClass('run');
                        }, 600);
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

    var addObstacles;
    function addObstacle(){
        $(".garbage-list li").each(function() {
            $(this).prepend("<div class='garbage-div run'><img src='images/game-glasses.png' /></div>");
            $(this).children('.garbage-div').first().css({
                "margin-top": (-$(window).width() * 104 / 640)/2 + "px"
            });
            $(this).children('.garbage-div').first().bind("touchstart", handleTouchEvent);
            $(this).children('.garbage-div').first().bind("touchend", handleTouchEvent);
            $(this).children('.garbage-div').first().bind("touchmove", handleTouchEvent);
            var totalNum = $("#total-span").html();
            var timeSpeed = 6 - (5 * (60000 - totalNum) / 60000);
            var animationVar = 'run 3s linear forwards';
            $(this).children('.garbage-div').first().css({
                '-webkit-animation': animationVar,
                'animation': animationVar
            });
        });
        var addspeed = 500 + Math.random() * 1000;
        addObstacles = setTimeout(addObstacle, addspeed);
    }
    setInterval(removeObstacle, 1000);
    function removeObstacle() {
        $('.garbage-list .garbage-div').each(function() {
            if (parseInt($(this).offset().left) <= -$(window).width() * 0.15) {
                $(this).remove();
            };
        });
    }

    //倒计时时间
    var timeNums;
    var oldDate = new Date();
    function timeNum () {
        var newDate = new Date();
        var minute = 0,
            second = 0,
            ms = 0;//时间默认值 
            $("#total-span").html(oldDate - newDate + 60000);
        if (parseInt($("#total-span").html()) > 0) {
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
            clearTimeout(childFaces);
            $("#number-span").html($("#score-span").html());
            $("#number-span2").html($("#score-span").html());
            $("#number-span3").html($("#score-span").html());
            $("#gift-score").html("×" + $("#gift-span").html());
            $("#cover-div").show();
            $("#end-div").show();
            $("#paper-div").show().addClass('run');
            $("#score-frame").show();
            setTimeout('$("#paper-div").hide().removeClass("run")', 1000);
            document.getElementById("media").pause();
        };
        if (minute <= 9) minute = '0' + minute;
        if (second <= 9) second = '0' + second;
        if (ms <= 9) ms = '0' + ms;
        $("#minutes-span").html(minute);
        $("#seconds-span").html(second);
        $("#ms-span").html(ms);
    }
    var starNum = 0;
    $("#help-div a").hover(function() {
        starNum = 1;
    }, function() {
        starNum = 0;
    });
    $("#home-cover").hover(function() {
        starNum = 1;
    }, function() {
        starNum = 0;
    });
    $("#help-frame").hover(function() {
        starNum = 1;
    }, function() {
        starNum = 0;
    });
    $("#home-frame").click(function() {
        if (starNum == 0) {
            $("#home-frame").remove();
            $("#game-frame").show();
            oldDate = new Date();
            timeNums = setInterval(timeNum, 30);
            addObstacle();
            childFace();
            document.getElementById("media").play();
            $('body').on('touchmove', function (event) {
                event.preventDefault();
            });
        };
    });
    $("#star-btn").click(function() {
        $("#home-frame").remove();
        $("#game-frame").show();
        oldDate = new Date();
        timeNums = setInterval(timeNum, 30);
        addObstacle();
        childFace();
        document.getElementById("media").play();
    });
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
        childFace();
        oldDate = new Date();
        timeNums = setInterval(timeNum, 30);
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
        childFace();
        oldDate = new Date();
        timeNums = setInterval(timeNum, 30);
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
        $("#home-cover").show();
        $("#help-frame").show();
    });
    $("#help-frame .close-link").click(function() {
        $("#home-cover").hide();
        $("#help-frame").hide();
    });
    $("#list-frame .close-link").click(function() {
        $("#cover-div").hide();
        $("#list-frame").hide();
    });
    $("#flaunt-btn1").click(function() {
        $("#share-frame").show();
    });
    $("#share-frame").click(function() {
        $("#share-frame").hide();
    });
    $(window).load(function(){
        setTimeout(function() {
            $("#loading-frame").hide();
            $("#home-frame").addClass('run');
        }, 100);
    })
});