$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
        $("html").css({
        	"font-size": $(window).width() * 40 / 640 + "px"
        });
    }

    var stateNum = 0;   //被移动块的stateNum值
    var moveString = 0; //被移动块里面内容
    var rowNum = 3;     //行数
    var colNum = 3;     //列数
    var correctNum = 0; //排列正确的个数
    var oldArray = [];  //正确的序号
    // 重新加载内容
    function prepareFun() {
        $("#game").attr('class', 'column' + colNum);
        $("#game .jigsaw-list").empty();
        var totalNum = rowNum * colNum;
        for (var i = 1; i <= totalNum; i++) {
            $("#game .jigsaw-list").append('<div class="jigsaw-div" stateNum="' + i + '"><div class="move-div"><div class="image-div image-div' + i + '"></div></div></div>')
        };
        $("#game .jigsaw-div0").width($("#game .jigsaw-list .jigsaw-div").width());
        $("#game .jigsaw-div0 .move-div").height($("#game .jigsaw-div0 .move-div").width());
        $("#game .jigsaw-div0 .image-div").height($("#game .jigsaw-div0 .image-div").width());
        positionFun();
        $(".jigsaw-list .jigsaw-div .move-div").each(function(index) {
            $(this).click(function() {
                if (index == 0) {
                    if ($(".jigsaw-div0").attr("stateNum") == 0) {
                        stateNum = $(this).parent().attr("stateNum");
                        upFun(index,stateNum);
                    };
                }else{
                    if (index >= colNum && $(".jigsaw-list .jigsaw-div").eq(index - colNum).attr("stateNum") == 0) {
                        stateNum = $(this).parent().attr("stateNum");
                        upFun(index,stateNum);
                    };
                };
                if (index < $(".jigsaw-list .jigsaw-div").length - colNum && $(".jigsaw-list .jigsaw-div").eq(index + colNum).attr("stateNum") == 0) {
                    stateNum = $(this).parent().attr("stateNum");
                    downFun(index,stateNum);
                };
                if (index % colNum != 0  && $(".jigsaw-list .jigsaw-div").eq(index - 1).attr("stateNum") == 0) {
                    stateNum = $(this).parent().attr("stateNum");
                    leftFun(index,stateNum);
                };
                if ((index + 1) / colNum != 0  && $(".jigsaw-list .jigsaw-div").eq(index + 1).attr("stateNum") == 0) {
                    stateNum = $(this).parent().attr("stateNum");
                    rightFun(index,stateNum);
                };
            });
        });
    }
    prepareFun();
    //背景图片定位
    function positionFun() {
        $("#game .jigsaw-list .jigsaw-div .image-div").each(function(index) {
            $(this).height($(this).width());
        });
        for (var i = 0; i < $("#game .jigsaw-list .jigsaw-div .image-div").length; i++) {
            var position_x = (100 / (colNum - 1)) * (i % colNum) + "%";
            var position_y = (100 / (rowNum - 1)) * parseInt(i / colNum) + "%";
            $(".jigsaw-list .jigsaw-div .image-div" + (i + 1)).css('background-position', position_x +' '+ position_y);
        };
    }

    $(".jigsaw-div0 .move-div").click(function() {
        if ($(this).attr("stateNum") != 0 && $(".jigsaw-list .jigsaw-div").eq(0).attr("stateNum") == 0) {
            stateNum = $(".jigsaw-div0").attr("stateNum");
            downFun(-1,stateNum);
        };
    });

    var $this = 0;
    // 上移动
    function upFun (index,stateNum) {
    	$(".jigsaw-list .jigsaw-div").eq(index).addClass("upMove");
    	if (index == 0) {
    		setTimeout(function() {
                $this = $(".jigsaw-list .jigsaw-div").eq(index);
	    		moveString = $this.children().html();
	    		$(".jigsaw-div0").attr("stateNum", stateNum).children().html(moveString);
	    		$this.attr("stateNum", "0").removeClass("upMove").children().html('<div class="image-div image-div0"></div>').height($this.find('.image-div').width());
    		},200);
    	}else{
            setTimeout(function() {
                $this = $(".jigsaw-list .jigsaw-div").eq(index);
                moveString = $this.children().html();
                $(".jigsaw-list .jigsaw-div").eq(index - colNum).attr("stateNum", stateNum).children().html(moveString);
                $this.attr("stateNum", "0").removeClass("upMove").children().html('<div class="image-div image-div0"></div>').height($this.find('.image-div').width());
            },200);
        };
    }
    // 下移动
    function downFun (index,stateNum) {
        if (index == -1) {
            correctNum = 0;
            $(".jigsaw-div0").addClass("downMove");
            setTimeout(function() {
                moveString = $(".jigsaw-div0").children().html();
                $(".jigsaw-list .jigsaw-div").eq(0).attr("stateNum", stateNum).children().html(moveString);
                $(".jigsaw-div0").attr("stateNum", "0").removeClass("downMove").children().html('<div class="image-div image-div0"></div>').height($(".jigsaw-div0").find('.image-div').width());
                $(".jigsaw-list .jigsaw-div").each(function(index) {
                    if ($(this).attr("stateNum") == index + 1) {
                        correctNum++;
                    };
                })
                if (correctNum == $(".jigsaw-list .jigsaw-div").length) {
                    console.log("成功");
                    setTimeout(function(){
                        if (rowNum < 10) {
                            rowNum++;
                        };
                        if (colNum < 10) {
                            colNum++;
                        };
                        prepareFun();
                    },500);
                };
            },200);
        }else{
            $(".jigsaw-list .jigsaw-div").eq(index).addClass("downMove");
            setTimeout(function() {
                $this = $(".jigsaw-list .jigsaw-div").eq(index);
                moveString = $this.children().html();
                $(".jigsaw-list .jigsaw-div").eq(index + colNum).attr("stateNum", stateNum).children().html(moveString);
                $this.attr("stateNum", "0").removeClass("downMove").children().html('<div class="image-div image-div0"></div>').height($this.find('.image-div').width());
            },200);
        };
    }
    // 左移动
    function leftFun (index,stateNum) {
    	$(".jigsaw-list .jigsaw-div").eq(index).addClass("leftMove");
        setTimeout(function() {
            $this = $(".jigsaw-list .jigsaw-div").eq(index);
            moveString = $this.children().html();
            $(".jigsaw-list .jigsaw-div").eq(index - 1).attr("stateNum", stateNum).children().html(moveString);
            $this.attr("stateNum", "0").removeClass("leftMove").children().html('<div class="image-div image-div0"></div>').height($this.find('.image-div').width());
        },200);
    }
    // 右移动
    function rightFun (index,stateNum) {
    	$(".jigsaw-list .jigsaw-div").eq(index).addClass("rightMove");
        setTimeout(function() {
            $this = $(".jigsaw-list .jigsaw-div").eq(index);
            moveString = $this.children().html();
            $(".jigsaw-list .jigsaw-div").eq(index + 1).attr("stateNum", stateNum).children().html(moveString);
            $this.attr("stateNum", "0").removeClass("rightMove").children().html('<div class="image-div image-div0"></div>').height($this.find('.image-div').width());
        },200);
    }

    $("#game .btn-div a").click(function() {
        $("#game .jigsaw-div0").attr("stateNum", "0")
        $("#game .jigsaw-div0 .move-div").html('<div class="image-div image-div0"></div>');
        placeindex();
        $(".jigsaw-list .jigsaw-div").each(function(index) {
            $(this).attr("stateNum", oldArray[index]).children().html('<div class="image-div image-div' + oldArray[index] + '"></div>');
        });
        positionFun();
    });
    // 重新打乱顺序
    var sameNum = 0;   //打乱顺序之后，相同的个数
    function placeindex(){
        oldArray = [];
        $(".jigsaw-list .jigsaw-div").each(function(index) {
            if (index == 0) {
                oldArray.push(index);
            }else{
                oldArray.push(index + 1);
            };
        });
        console.log(oldArray);
        //返回0的数组下标
        // oldArray.indexof = function(value) {
        //     var a = this;//为了增加方法扩展适应性。我这稍微修改了下
        //     for (var i = 0; i < a.length; i++) {
        //         if (a[i] == value)
        //             return i;
        //     }
        // }
        for (var i = 0; i < 1000; i++) {
            var arry0 = oldArray.indexOf(0);
            var j = Math.floor(Math.random() * 4) + 1;
            switch(j){
                case 1:
                    if (arry0 - colNum >= 0) {
                        reforeFun (oldArray,arry0,arry0 - colNum)
                    };
                    break;
                case 2:
                    if ((arry0 + 1) % colNum != 0) {
                        reforeFun (oldArray,arry0,arry0 + 1)
                    };
                    break;
                case 3:
                    if (arry0 + colNum < oldArray.length) {
                        reforeFun (oldArray,arry0,arry0 + colNum)
                    };
                    break;
                case 4:
                    if (arry0 % colNum != 0) {
                        reforeFun (oldArray,arry0,arry0 - 1)
                    };
                    break;
            }
            console.log(i +" "+ j +" "+ oldArray);
            if (i > 20 && oldArray[0] == 0) {
                break;
            };
            if (i == 999 && oldArray[0] != 0) {
                placeindex();
            };
        };
        console.log(oldArray);
        oldArray[0] = 1;
        sameNum = 0;
        for (var i = 0; i < oldArray.length; i++) {
            if (oldArray[i] == i + 1) {
                sameNum++;
            };
        };
        console.log(sameNum);
        if (sameNum / oldArray.length > 0.5) {
            placeindex();
        };
    }
    //调换数组中2个元素顺序
    function reforeFun (arry,a,b) {
        var c;
        c = arry[a];
        arry[a] = arry[b];
        arry[b] = c;
    }
});