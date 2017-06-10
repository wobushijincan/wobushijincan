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
    var speed2 = 100; //箱子掉下去所需时间
    var mansionTranTop; //大楼Y偏移
    var rotateMax = 0.01;  //大楼摆动最大角度
    var rotateChange = 0.0001; //大楼摆动角度增加量
    var proportion = 0;  //楼层叠加重合比例
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
            var newTranslateTop = parseFloat($("#material-frame .material-content").css('transform').split(",")[5]) + 4;
            if (newTranslateTop + 4 < translateTop + transformTop - $("#mansion-frame .mansion-floor").height() * $("#mansion-frame .mansion-floor").length) {
                var transformValue = "translate(" + transformLeft + "px," + newTranslateTop + "px)";
                $("#material-frame .material-content").css({
                    "-webkit-transform":transformValue,
                    "transform":transformValue
                });
                moveFuns = setTimeout(moveFun, speed2 / 100);
            }else{
                if ($("#mansion-frame .mansion-floor").length >0) {
                    var materialContentLeft = $("#material-frame .material-content").offset().left;
                    var materialFloorLeft = $("#mansion-frame .mansion-floor").eq(0).offset().left;
                };
                if ($("#mansion-frame .mansion-floor").length == 0) {
                    newTranslateTop = translateTop + transformTop;
                    $("#material-frame .material-content").css({
                        "-webkit-transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)",
                        "transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)"
                    });
                    clearTimeout(moveFuns);
                    $("#state-div").html("1");
                    $("#mansion-frame .mansion-content").append('<div class="mansion-floor">');
                    $("#mansion-frame").css({
                        "-webkit-transform": "translate(0px,0px)",
                        "transform": "translate(0px,0px)"
                    });
                    $("#mansion-frame .mansion-floor").eq(0).css({
                        "bottom": "0px",
                        "left": ($("#mansion-frame .mansion-content").width() - $("#mansion-frame .mansion-floor").width()) / 2 + transformLeft
                    });
                    $("#game-content").bind("touchstart", gameFun);
                }else if ($("#mansion-frame .mansion-floor").length == 1) {
                    if (Math.abs(materialContentLeft - materialFloorLeft) < $("#material-frame .material-content").width() / 2 && newTranslateTop + 4 > translateTop + transformTop - $("#mansion-frame .mansion-floor").height() * $("#mansion-frame .mansion-floor").length && newTranslateTop < translateTop + transformTop - $("#mansion-frame .mansion-floor").height() * $("#mansion-frame .mansion-floor").length){
                        if (Math.abs(materialContentLeft - materialFloorLeft) > 0.01) {
                            proportion = Math.ceil(Math.abs(materialContentLeft - materialFloorLeft) * 10 / $("#material-frame .material-content").width());
                            rotateChange = rotateChange + 0.001 * proportion;
                            rotateMax = rotateMax + 0.05 * proportion;
                        };
                        newTranslateTop = translateTop + transformTop;
                        $("#material-frame .material-content").css({
                            "-webkit-transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)",
                            "transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)"
                        });
                        $("#mansion-frame .mansion-floor").eq(0).before('<div class="mansion-floor">');
                        $("#mansion-frame").css({
                            "-webkit-transform": "translate(0px,0px)",
                            "transform": "translate(0px,0px)"
                        });
                        clearTimeout(moveFuns);
                        $("#state-div").html("1");
                        $("#mansion-frame .mansion-floor").eq(0).css({
                            "bottom": parseFloat($("#mansion-frame .mansion-floor").eq(1).css('bottom')) + $("#mansion-frame .mansion-floor").eq(1).height(),
                            "left": parseFloat($("#mansion-frame .mansion-floor").eq(1).css('left')) + parseFloat(materialContentLeft - materialFloorLeft)
                        });
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
                    if (Math.abs(materialContentLeft - materialFloorLeft) < $("#material-frame .material-content").width() / 2 && newTranslateTop + 4 > translateTop + transformTop - $("#mansion-frame .mansion-floor").height() * $("#mansion-frame .mansion-floor").length && newTranslateTop < translateTop + transformTop - $("#mansion-frame .mansion-floor").height() * $("#mansion-frame .mansion-floor").length){
                        if (Math.abs(materialContentLeft - materialFloorLeft) > 0.01) {
                            proportion = Math.ceil(Math.abs(materialContentLeft - materialFloorLeft) * 10 / $("#material-frame .material-content").width());
                            rotateChange = rotateChange + 0.001 * proportion;
                            rotateMax = rotateMax + 0.05 * proportion;
                        };
                        newTranslateTop = translateTop + transformTop;
                        $("#material-frame .material-content").css({
                            "-webkit-transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)",
                            "transform": "translate(" + Math.sin(rotationAngle2) * rotateRadius + "px," + (-Math.cos(rotationAngle2)) * rotateRadius + "px)"
                        });
                        $("#mansion-frame .mansion-floor").eq(0).before('<div class="mansion-floor">');
                        $("#mansion-frame").css({
                            "-webkit-transform": "translate(0px,0px)",
                            "transform": "translate(0px,0px)"
                        });
                        $("#mansion-frame .mansion-floor").eq(0).css({
                            "bottom": parseFloat($("#mansion-frame .mansion-floor").eq(1).css('bottom')) + $("#mansion-frame .mansion-floor").eq(1).height(),
                            "left": parseFloat($("#mansion-frame .mansion-floor").eq(1).css('left')) + parseFloat(materialContentLeft - materialFloorLeft)
                        });
                        clearTimeout(moveFuns);
                        moveFun2();
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
                    if (Math.abs(materialContentLeft - materialFloorLeft) < $("#material-frame .material-content").width() / 2 && newTranslateTop + 4 > translateTop + transformTop - $("#mansion-frame .mansion-floor").height() * $("#mansion-frame .mansion-floor").length && newTranslateTop < translateTop + transformTop - $("#mansion-frame .mansion-floor").height() * $("#mansion-frame .mansion-floor").length){
                        if (Math.abs(materialContentLeft - materialFloorLeft) > 0.01) {
                            proportion = Math.ceil(Math.abs(materialContentLeft - materialFloorLeft) * 10 / $("#material-frame .material-content").width());
                            rotateChange = rotateChange + 0.001 * proportion;
                            rotateMax = rotateMax + 0.05 * proportion;
                        };
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
                        $("#mansion-frame .mansion-floor").eq(0).css({
                            "bottom": parseFloat($("#mansion-frame .mansion-floor").eq(1).css('bottom')) + $("#mansion-frame .mansion-floor").eq(1).height(),
                            "left": parseFloat($("#mansion-frame .mansion-floor").eq(1).css('left')) + parseFloat(materialContentLeft - materialFloorLeft)
                        });
                        clearTimeout(moveFuns);
                        moveFun2();
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
            function moveFun2(){
                var moveFuns2;
                var mansionTranVal;
                if ( parseFloat($("#mansion-frame").css('transform').split(",")[5]) < $("#material-frame .material-content").height() * ($("#mansion-frame .mansion-floor").length - 2.5)) {
                    mansionTranVal = parseFloat($("#mansion-frame").css('transform').split(",")[5]) + 6;
                    $("#mansion-frame").css({
                        "-webkit-transform": "translate(0px," + mansionTranVal + "px)",
                        "transform": "translate(0px," + mansionTranVal + "px)"
                    });
                    moveFuns2 = setTimeout(moveFun2, 10);
                }else{
                    mansionTranVal = $("#material-frame .material-content").height() * ($("#mansion-frame .mansion-floor").length - 2.5);
                    $("#mansion-frame").css({
                        "-webkit-transform": "translate(0px," + mansionTranVal + "px)",
                        "transform": "translate(0px," + mansionTranVal + "px)"
                    });
                    clearTimeout(moveFuns2);
                    $("#state-div").html("1");
                    $("#game-content").bind("touchstart", gameFun);
                };
            }
        }
    }
    // setTimeout(alert(rotateMax +" "+ rotateChange), 3000);
    rotateAdd();
    function rotateAdd() {
        var rotateNum = parseFloat($("#mansion-frame .mansion-content").attr('rotateNum'));
        rotateNum = rotateNum + rotateChange;
        if (rotateNum < rotateMax) {
            $("#mansion-frame .mansion-content").attr('rotateNum',rotateNum);
            $("#mansion-frame .mansion-content").css({
                "-webkit-transform": "rotate(" + rotateNum + "deg)",
                "transform": "rotate(" + rotateNum + "deg)"
            });
            var rotateAdds = setTimeout(rotateAdd, 10);
        }else{
            clearTimeout(rotateAdds);
            rotateReduce();
        };
    }
    function rotateReduce() {
        var rotateNum = parseFloat($("#mansion-frame .mansion-content").attr('rotateNum'));
        rotateNum = rotateNum - rotateChange;
        if (-rotateNum < rotateMax) {
            $("#mansion-frame .mansion-content").attr('rotateNum',rotateNum);
            $("#mansion-frame .mansion-content").css({
                "-webkit-transform": "rotate(" + rotateNum + "deg)",
                "transform": "rotate(" + rotateNum + "deg)"
            });
            var rotateReduces = setTimeout(rotateReduce,10);
        }else{
            clearTimeout(rotateReduces);
            rotateAdd();
        };
    }
});