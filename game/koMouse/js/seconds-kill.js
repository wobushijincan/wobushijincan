//topnews9公共JS
//版本号：V1.0
//作者：caobinbin 时间：2014-4-14
//Copyright &#169;2012-2013 TOPNEWS9

$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
        $("#loading td").height($(window).height());
        $("#desktop").height($(window).height());
        $("body").height($(window).height());
        $("#desktop .tabdiv").height($("#desktop").height());
        $("#loading .td").height($("#desktop").height());
        $(".page1_1").height($("#desktop").width()*72/640);
        $(".page1_1 span").css({
        	"line-height": $(".page1_1").height()+"px",
        	"font-size": $("#desktop").width()*20/320,
        });
        $(".page1_2").height($("#desktop").width()*74/640);
        $(".page1_2 span").css({
        	"line-height": $(".page1_2").height()+"px",
        	"font-size": $("#desktop").width()*20/320,
        });
        $(".frame").width($("#desktop").width()*258/320);
        $(".frame").height($(".frame").width());
//      $("#desktop").width()*51.5938/320
        $(".frame li").height($(".frame li").css("width"));
        $(".content").height($(".frame li").css("width"));
    }
});
$(window).load(function(){  
//  var img = new Image();
//  img.src = $(this).attr("src");
//  img.onload = function(){
//  	
//  };
	$("#loading").hide();
})
