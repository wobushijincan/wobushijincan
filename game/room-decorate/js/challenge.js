$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
        $(".top-frame").height($(".top-frame").width() * 156 / 640);
    	$(".room-frame").height($(".room-frame").width() * 960 / 1292);
        $(".room-place").height($("#main-frame").height() * 490 / 960);
        $(".room-frame").css('top', ($(".room-place").height() - $(".room-frame").height()) / 2);
        $(".top-frame .right-words span.info-span").css('font-size', $("#main-frame").width() * 26 / 640);
        $(".top-frame .right-words span.number-span").css('font-size', $("#main-frame").width() * 66 / 640);
    }
    $(".crest-list li .crest-div a").each(function() {
		$(this).click(function() {
	    	if ($(this).parent().parent("li").hasClass('selected')) {
	    		$(".top-frame .portrait-frame .crest-div img").attr('src', $(this).children('img').attr('src'));
	    	}else{
	    		return false;
	    	};
		});
    });
});