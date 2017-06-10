$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
    }


    var oldDate = new Date();
    var timeNums = setInterval(timeNum, 1);
    function timeNum () {
        var newDate = new Date();
        var second = Math.floor((newDate - oldDate) / 1000);
        var ms = Math.floor((newDate - oldDate) % 1000);
        if (ms <= 9) {
            ms = '00' + ms
        }else if (ms <= 99 && ms > 9) {
            ms = '0' + ms
        };
        $("#ms-span").html(ms);
        $("#seconds-span").html(second);
    }
    var timeSpeed = 2500;
    var addObstacles;
    addObstacle();
    function addObstacle(){
        $(".garbage-list li").each(function() {
            var i = Math.random() * 5;
            var k = 0;
            if (i <= 4) {
                var j = Math.random() * 4;
                if (j < 1) {
                    $(this).prepend("<div class='garbage-div garbage1'><img src='images/medal-img1.png' /></div>");
                    k = 1;
                }else if (j < 2 && j >= 1) {
                    $(this).prepend("<div class='garbage-div garbage2'><img src='images/medal-img2.png' /></div>");
                    k = 1;
                }else if (j < 3 && j >= 2) {
                    $(this).prepend("<div class='garbage-div garbage3'><img src='images/medal-img3.png' /></div>");
                    k = 1;
                }else if (j < 4 && j >= 3) {
                    $(this).prepend("<div class='garbage-div garbage3'><img src='images/medal-img4.png' /></div>");
                    k = 1;
                };
            };
            if (k == 1) {
                var rightVar = $(this).children('.garbage-div').first().width();
                $(this).children('.garbage-div').first().css('right', -rightVar);
                $(this).children('.garbage-div').first().animate({
                    right: $("#main-frame").width()}, timeSpeed, "linear", function() {
                });
            };
        }); 
        var addspeed = 600 + 400 * Math.random();
        addObstacles = setTimeout(addObstacle, addspeed);
    }
    var addIntegrals;
    addIntegral();
    function addIntegral(){
        var num = 0;
        $(".integral-list li").each(function() {
            var i = Math.random() * 5;
            var $this = $(this);
            if (i <= 4) {
                num = parseInt(Math.random() * 3);
                integral_fun();
                for (var l = 1; l <= num; l++) {
                    integral_funs(l);
                };
                function integral_funs(n) {
                    setTimeout(integral_fun, 120*n);
                }
                function integral_fun(){
                    var j = Math.random() * 4;
                    if (j < 1) {
                        $this.append("<div class='integral-div integral1'></div>");
                        k = 1;
                    }else if (j < 2 && j >= 1) {
                        $this.append("<div class='integral-div integral2'></div>");
                        k = 1;
                    }else if (j < 3 && j >= 2) {
                        $this.append("<div class='integral-div integral3'></div>");
                        k = 1;
                    }else if (j < 4 && j >= 3) {
                        $this.append("<div class='integral-div integral3'></div>");
                        k = 1;
                    };
                    var rightVar = $this.children('.integral-div').last().width();
                    $this.children('.integral-div').last().css('right', -rightVar);
                    $this.children('.integral-div').last().animate({
                        right: $("#main-frame").width()}, timeSpeed, "linear", function() {
                    });
                }
            };
        }); 
        var addspeed = 600 + 400 * Math.random() + num * 120;
        addIntegrals = setTimeout(addIntegral, addspeed);
    }
    var removeObstacles = setInterval(removeObstacle, 1);
    function removeObstacle() {
        var figureTop = $("#figure-frame .figure-content").offset().top;
        var figureLeft = $("#figure-frame .figure-content").offset().left;
        var figureWidth = $("#figure-frame .figure-content").width();
        var figureHeight = $("#figure-frame .figure-content").height();
        $('.garbage-list .garbage-div').each(function() {
            if (parseInt($(this).css('right')) >= $(window).width()) {
                $(this).remove();
            };
            var obstacleTop = $(this).offset().top;
            var obstacleLeft = $(this).offset().left;
            var obstacleWidth = $(this).width();
            var obstacleHeight = $(this).height();
            if (obstacleTop >= figureTop && figureLeft >= obstacleLeft) {
                if (obstacleTop - figureTop <= figureHeight && figureLeft - obstacleLeft <= obstacleWidth) {
                    alert("Game Over!");
                    clearInterval(timeNums);
                    clearTimeout(addObstacles);
                    clearTimeout(addIntegrals);
                    clearInterval(removeObstacles);
                    $(".garbage-list .garbage-div").remove();
                    $(".integral-list .integral-div").remove();
                };
            };
            if (obstacleTop >= figureTop && obstacleLeft >= figureLeft) {
                if (obstacleTop - figureTop <= figureHeight && obstacleLeft - figureLeft <= figureWidth) {
                    alert("Game Over!");
                    clearInterval(timeNums);
                    clearTimeout(addObstacles);
                    clearTimeout(addIntegrals);
                    clearInterval(removeObstacles);
                    $(".garbage-list .garbage-div").remove();
                    $(".integral-list .integral-div").remove();
                };
            };
        });
        $('.integral-list .integral-div').each(function() {
            if (parseInt($(this).css('right')) >= $(window).width()) {
                $(this).remove();
            };
            var integralTop = $(this).offset().top;
            var integralLeft = $(this).offset().left;
            var integralWidth = $(this).width();
            var integralHeight = $(this).height();
            if (figureTop >= integralTop && figureLeft >= integralLeft) {
                if (figureTop - integralTop <= integralHeight && figureLeft - integralLeft <= integralWidth) {
                    $(this).remove();
                };
            };
            if (figureTop >= integralTop && integralLeft >= figureLeft) {
                if (figureTop - integralTop <= integralHeight && integralLeft - figureLeft <= figureWidth) {
                    $(this).remove();
                };
            };
            if (integralTop >= figureTop && figureLeft >= integralLeft) {
                if (integralTop - figureTop <= figureHeight && figureLeft - integralLeft <= integralWidth) {
                    $(this).remove();
                };
            };
            if (integralTop >= figureTop && integralLeft >= figureLeft) {
                if (integralTop - figureTop <= figureHeight && integralLeft - figureLeft <= figureWidth) {
                    $(this).remove();
                };
            };
        });
    }
    $("#main-frame").bind('click', figure_move);
    function figure_move() {
        $("#main-frame").unbind('click');
        $("#figure-frame .figure-content").animate({
            bottom: "100px"},
            300, "linear", function() {
                $("#figure-frame .figure-content").animate({
                    bottom: "0px"},
                    300, "linear", function() {
                        $("#main-frame").bind('click', figure_move);
                });
        });
    }
});