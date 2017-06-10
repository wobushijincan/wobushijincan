$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
    	$("#main-frame .top-words").css('top', $("#main-frame").width() * 120 / 640);
        $("#main-frame .lamp-frame").css('top', $("#main-frame").width() * 380 / 640);
        $("#main-frame .btn-div").css('top', $("#main-frame").width() * 870 / 640);
    }
});