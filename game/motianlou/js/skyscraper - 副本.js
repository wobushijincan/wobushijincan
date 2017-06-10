$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
        $("#game-content").width("320px");
        $("#game-content").height($("#game-content").width() * 960 / 640);
        if ($("#game-content").height() > $("#main-frame").height()) {
            $("#game-content").height($("#main-frame").height());
            $("#game-content").width($("#game-content").height() * 640 / 960);
        };
        $("#game-content").css('margin-left', -$("#game-content").width() / 2);

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
        $("#mansion-frame").css('top', $("#game-content").width() * 380 / 320);
    }
    
    var rotationAngle = 0; //箱子旋转角度
    var rotationAngle2 = 0;
    var speed = 2000; //箱子旋转一圈时间
    var rotationLngth = 80; //绳子初始长度
    var rotationLngth2 = 0; //绳子实际长度
    var rotateRadius = 30; //箱子旋转半径
    var rotateAngle = 0; //绳子旋转角度
    var material_funs;
    material_fun();
    function material_fun() {
        rotationAngle = rotationAngle + 360 * 10 / speed;
        if (rotationAngle >= 360) {
            rotationAngle = rotationAngle - 360;
        };
        rotationAngle2 = rotationAngle * 0.017453293;
        if ($("#state-div").html() == 1) {
            $("#material-frame .material-div .material-content").css({
                "-webkit-transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)",
                "transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)"
            });
        };
        rotationLngth2 = Math.sqrt(Math.pow((rotationLngth - rotateRadius * Math.cos(rotationAngle2)),2) + Math.pow((rotateRadius * Math.sin(rotationAngle2)),2));
        rotateAngle = -Math.atan((rotateRadius * Math.sin(rotationAngle2)) / (rotationLngth - rotateRadius * Math.cos(rotationAngle2))) / 0.017453293;
        $("#material-frame .rope-div .rope-content").css({
            "height": rotationLngth2,
            "-webkit-transform": "rotate(" + rotateAngle + "deg)",
            "transform": "rotate(" + rotateAngle + "deg)"
        });
        material_funs = setTimeout(material_fun, 10);
    }
    var materialTop;
    var mansionTop;
    var translateTop;
    var transformLeft;
    var transformTop;
    var speed2 = 300; //箱子掉下去所需时间
    var mansionTranTop; //大楼Y偏移
    $("#game-content").bind("touchstart", gameFun);
    function gameFun() {
        $("#game-content").unbind('touchstart');
        $("#state-div").html("0");
        materialTop = $("#material-frame .material-content").offset().top;
        mansionTop = $("#mansion-frame .mansion-content").offset().top;
        translateTop = mansionTop - materialTop - $("#material-frame .material-content").height();
        transformLeft = parseFloat($("#material-frame .material-content").css('transform').split(",")[4]);
        transformTop = parseFloat($("#material-frame .material-content").css('transform').split(",")[5]);
        var moveFuns;
        moveFun();
        function moveFun () {
            var newTranslateTop = parseFloat($("#material-frame .material-content").css('transform').split(",")[5]) + translateTop/100;
            if (newTranslateTop < translateTop + transformTop) {
                var transformValue = "translate(" + transformLeft + "px," + newTranslateTop + "px)";
                $("#material-frame .material-content").css({
                    "-webkit-transform":transformValue,
                    "transform":transformValue
                });
                moveFuns = setTimeout(moveFun, speed2 / 100);
            }else{
                if ($("#mansion-frame .mansion-floor").length == 0) {
                    newTranslateTop = translateTop + transformTop;
                    $("#material-frame .material-content").css({
                        "-webkit-transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)",
                        "transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)"
                    });
                    clearTimeout(moveFuns);
                    $("#state-div").html("1");
                    $("#mansion-frame .mansion-content").append('<div class="mansion-floor">');
                    $("#mansion-frame .mansion-content").css({
                        "-webkit-transform": "translate(0px," + (-$("#mansion-frame .mansion-floor").height()) + "px)",
                        "transform": "translate(0px," + (-$("#mansion-frame .mansion-floor").height()) + "px)"
                    });
                    $("#mansion-frame .mansion-floor").eq(0).css('margin-left', ($("#mansion-frame .mansion-content").width() - $("#mansion-frame .mansion-floor").width()) / 2 + transformLeft);
                    $("#game-content").bind("touchstart", gameFun);
                }else if ($("#mansion-frame .mansion-floor").length == 1) {
                    if (Math.abs($("#material-frame .material-content").offset().left - $("#mansion-frame .mansion-floor").eq(0).offset().left) < $("#material-frame .material-content").width() / 2){
                        newTranslateTop = translateTop + transformTop;
                        $("#material-frame .material-content").css({
                            "-webkit-transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)",
                            "transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)"
                        });
                        $("#mansion-frame .mansion-floor").eq(0).before('<div class="mansion-floor">');
                        mansionTranTop = parseFloat($("#mansion-frame .mansion-content").css('transform').split(",")[5]) - $("#material-frame .material-content").height();
                        $("#mansion-frame .mansion-content").css({
                            "-webkit-transform": "translate(0px," + mansionTranTop + "px)",
                            "transform": "translate(0px," + mansionTranTop + "px)"
                        });
                        clearTimeout(moveFuns);
                        $("#state-div").html("1");
                        $("#mansion-frame .mansion-floor").eq(0).css('margin-left', ($("#mansion-frame .mansion-content").width() - $("#mansion-frame .mansion-floor").width()) / 2 + transformLeft);
                        $("#game-content").bind("touchstart", gameFun);
                    }else{
                        if ($("#material-frame .material-content").offset().top < $("#game-content").height()) {
                            var transformValue = "translate(" + transformLeft + "px," + newTranslateTop + "px)";
                            $("#material-frame .material-content").css({
                                "-webkit-transform":transformValue,
                                "transform":transformValue
                            });
                            moveFuns = setTimeout(moveFun, speed2 / 100);
                        }else{
                            $("#material-frame .material-content").css({
                                "-webkit-transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)",
                                "transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)"
                            });
                            clearTimeout(moveFuns);
                            $("#state-div").html("1");
                            $("#game-content").bind("touchstart", gameFun);
                        };
                    };
                }else if ($("#mansion-frame .mansion-floor").length == 2) {
                    if (Math.abs($("#material-frame .material-content").offset().left - $("#mansion-frame .mansion-floor").eq(0).offset().left) < $("#material-frame .material-content").width() / 2){
                        newTranslateTop = translateTop + transformTop;
                        $("#material-frame .material-content").css({
                            "-webkit-transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)",
                            "transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)"
                        });
                        $("#mansion-frame .mansion-floor").eq(0).before('<div class="mansion-floor">');
                        mansionTranTop = parseFloat($("#mansion-frame .mansion-content").css('transform').split(",")[5]) - $("#material-frame .material-content").height();
                        $("#mansion-frame .mansion-content").css({
                            "-webkit-transform": "translate(0px," + mansionTranTop + "px)",
                            "transform": "translate(0px," + mansionTranTop + "px)"
                        });
                        $("#mansion-frame .mansion-floor").eq(0).css('margin-left', ($("#mansion-frame .mansion-content").width() - $("#mansion-frame .mansion-floor").width()) / 2 + transformLeft);
                        clearTimeout(moveFuns);
                        var moveFuns2;
                        moveFun2();
                        function moveFun2(){
                            var mansionTranVal;
                            if ( -parseFloat($("#mansion-frame .mansion-content").css('transform').split(",")[5]) > $("#material-frame .material-content").height() * 2.5) {
                                mansionTranVal = parseFloat($("#mansion-frame .mansion-content").css('transform').split(",")[5]) + $("#material-frame .material-content").height() / 10;
                                $("#mansion-frame .mansion-content").css({
                                    "-webkit-transform": "translate(0px," + mansionTranVal + "px)",
                                    "transform": "translate(0px," + mansionTranVal + "px)"
                                });
                                moveFuns2 = setTimeout(moveFun2, 10);
                            }else{
                                mansionTranVal = -$("#material-frame .material-content").height() * 2.5;
                                $("#mansion-frame .mansion-content").css({
                                    "-webkit-transform": "translate(0px," + mansionTranVal + "px)",
                                    "transform": "translate(0px," + mansionTranVal + "px)"
                                });
                                clearTimeout(moveFuns2);
                                $("#state-div").html("1");
                                $("#game-content").bind("touchstart", gameFun);
                            };
                        }
                    }else{
                        if ($("#material-frame .material-content").offset().top < $("#game-content").height()) {
                            var transformValue = "translate(" + transformLeft + "px," + newTranslateTop + "px)";
                            $("#material-frame .material-content").css({
                                "-webkit-transform":transformValue,
                                "transform":transformValue
                            });
                            moveFuns = setTimeout(moveFun, speed2 / 100);
                        }else{
                            $("#material-frame .material-content").css({
                                "-webkit-transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)",
                                "transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)"
                            });
                            $("#state-div").html("1");
                            clearTimeout(moveFuns);
                            $("#game-content").bind("touchstart", gameFun);
                        };
                    }; 
                }else{
                    if (Math.abs($("#material-frame .material-content").offset().left - $("#mansion-frame .mansion-floor").eq(0).offset().left) < $("#material-frame .material-content").width() / 2){
                        newTranslateTop = translateTop + transformTop;
                        $("#material-frame .material-content").css({
                            "-webkit-transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)",
                            "transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)"
                        });
                        $("#mansion-frame .mansion-floor").eq(0).before('<div class="mansion-floor">');
                        mansionTranTop = parseFloat($("#mansion-frame .mansion-content").css('transform').split(",")[5]) - $("#material-frame .material-content").height();
                        $("#mansion-frame .mansion-content").css({
                            "-webkit-transform": "translate(0px," + mansionTranTop + "px)",
                            "transform": "translate(0px," + mansionTranTop + "px)"
                        });
                        $("#mansion-frame .mansion-floor").eq(0).css('margin-left', ($("#mansion-frame .mansion-content").width() - $("#mansion-frame .mansion-floor").width()) / 2 + transformLeft);
                        clearTimeout(moveFuns);
                        var moveFuns2;
                        moveFun2();
                        function moveFun2(){
                            var mansionTranVal;
                            if ( -parseFloat($("#mansion-frame .mansion-content").css('transform').split(",")[5]) > $("#material-frame .material-content").height() * 2.5) {
                                mansionTranVal = parseFloat($("#mansion-frame .mansion-content").css('transform').split(",")[5]) + $("#material-frame .material-content").height() / 10;
                                $("#mansion-frame .mansion-content").css({
                                    "-webkit-transform": "translate(0px," + mansionTranVal + "px)",
                                    "transform": "translate(0px," + mansionTranVal + "px)"
                                });
                                moveFuns2 = setTimeout(moveFun2, 10);
                            }else{
                                mansionTranVal = -$("#material-frame .material-content").height() * 2.5;
                                $("#mansion-frame .mansion-content").css({
                                    "-webkit-transform": "translate(0px," + mansionTranVal + "px)",
                                    "transform": "translate(0px," + mansionTranVal + "px)"
                                });
                                clearTimeout(moveFuns2);
                                $("#state-div").html("1");
                                $("#game-content").bind("touchstart", gameFun);
                            };
                        }
                    }else{
                        if ($("#material-frame .material-content").offset().top < $("#game-content").height()) {
                            var transformValue = "translate(" + transformLeft + "px," + newTranslateTop + "px)";
                            $("#material-frame .material-content").css({
                                "-webkit-transform":transformValue,
                                "transform":transformValue
                            });
                            moveFuns = setTimeout(moveFun, speed2 / 100);
                        }else{
                            $("#material-frame .material-content").css({
                                "-webkit-transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)",
                                "transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)"
                            });
                            $("#state-div").html("1");
                            clearTimeout(moveFuns);
                            $("#game-content").bind("touchstart", gameFun);
                        };
                    };
                };
            };
        }
    }

















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
});