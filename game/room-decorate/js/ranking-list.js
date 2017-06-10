$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
    	$(".top-info").css('margin-top', $("#main-frame").width() * 55 / 640);
        $(".btn-frame").css('margin-top', -$("#main-frame").width() * 28 / 640);
        $(".top-info .bg-div img").height($("#main-frame").width() * 93 / 640);
        $(".btn-frame .btn-bg img").height($("#main-frame").width() * 155 / 640);
        var liHeights = $("#main-frame").height() - $(".top-info").height() - parseFloat($(".top-info").css('margin-top')) - $(".btn-frame").height() - parseFloat($(".btn-frame").css('margin-top')) - 30;
        if (liHeights / 6 > 58) {
            var paddingNum = (liHeights / 6 - 58) / 2;
            $(".list-div li .li-content").css('padding', paddingNum +"px 0");
            $(".list-div li .other-div").css('padding', paddingNum +"px 0");
        };
        $(".list-div li .challenge-div .challenge-left").css('line-height', $(".list-div li .challenge-div .challenge-left").height() + "px");
    }
});