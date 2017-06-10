$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
    	$("#compete-frame .my-frame .room-frame").width($("#compete-frame .my-frame").height() * 1292 / 960);
    	$("#compete-frame .my-frame .room-frame").css('margin-left', -$("#compete-frame .my-frame .room-frame").width() / 2);
    	$("#result-frame .portrait-frame").css('margin-top', $("#result-frame").width() * 243 / 640);
    	$("#result-frame .win-content").css('margin-top', $("#result-frame").width() * 22 / 640);
    	$("#result-frame .btn-frame").css('margin-top', -$("#result-frame").width() * 40 / 640);
    	$("#result-frame .btn-div").css('top', $("#result-frame").width() * 60 / 640);
    }
    $("#result-frame .crest-list li .crest-div a").each(function() {
		$(this).click(function() {
	    	if ($(this).parent().parent("li").hasClass('selected')) {
	    		$("#result-frame .portrait-frame .crest-div img").attr('src', $(this).children('img').attr('src'));
	    	}else{
	    		return false;
	    	};
		});
    });
});
$(window).load(function(){
    $("#compete-frame").addClass('current');
    setTimeout(function(){
    	$("#compete-frame").hide();
    	$("#result-frame").show();
    }, 3500)
})