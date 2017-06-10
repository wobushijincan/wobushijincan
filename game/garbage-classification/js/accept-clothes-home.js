$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
        $("#loading td").height($(window).height());
        $(".top-frame .drying-clothes img").height($(".top-frame .drying-clothes").width() * 260 / 640);
        $(".top-frame").height($(".top-frame .drying-clothes").width() * 260 / 640);
        $(".top-frame").css('top', $("#main-frame").height() * 90 / 960);
        $(".bottom-frame .egg-img img").height($(".bottom-frame .egg-img").width() * 356 / 498);
        $(".bottom-frame").height($(".bottom-frame .egg-img").width() * 356 / 498);
        $(".bottom-frame").css('top', $("#main-frame").height() * 500 / 960);
    }
    $("#main-frame").bind('click', function() {
        window.location.href='http://www.topnews9.com';
    });
    $("#help-div a").click(function() {
        $("#main-frame").unbind('click');
        $("#cover-div").show();
        $("#help-frame").show();
    });
    $("#help-frame .close-link").click(function() {
        $("#main-frame").bind('click', function() {
            window.location.href='http://www.topnews9.com';
        });
        $("#cover-div").hide();
        $("#help-frame").hide();
    });
    $("#star-btn").click(function() {
        window.location.href='http://www.topnews9.com';
    });
    $('body').on('touchmove', function (event) {
        event.preventDefault();
    });
});
$(window).load(function(){  
    $("#loading").hide();
});