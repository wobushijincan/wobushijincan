$(function(){

    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
        $("#loading-frame td").height($(window).height());
        $("#home-frame .top-words").css('top', $("#home-frame").width() * 66 / 640);
        $("#home-frame .gestures-frame").css('bottom', $("#home-frame").width() * 45 / 640);
        $("#home-frame .home-woman").css('bottom', $("#home-frame").width() * 115 / 640);
    }

    $("#home-frame").click(function() {
        window.location.href='meidaila-game.html';
    });
    $("#help-div a").click(function() {
        $("#cover-div").show();
        $("#help-frame").show();
    });
    $("#help-frame .close-link").click(function() {
        $("#cover-div").hide();
        $("#help-frame").hide();
    });
    $("#star-btn").click(function() {
        window.location.href='meidaila-game.html';
    });
    $(window).load(function(){
        setTimeout(function() {
            $("#loading-frame").hide();
            $("#home-frame").addClass('run');
        }, 100);
    });
    $('body').on('touchmove', function (event) {
        event.preventDefault();
    });
});