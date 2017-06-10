bodySize();
window.onresize = function(){
	bodySize();
}
function bodySize(){
	$("html").css("font-size",$(window).width() * 40 / 640);
}
$('body').on('touchmove',function(event){
	event.preventDefault();
});