var mySwiper = null;
$(function()
{
		mySwiper = new Swiper(
		'.swiper-container',//轮播区域的DIV名字
		{
			/*pagination: '.pagination',//轮播导航标签
			paginationClickable: true,//是否允许点击轮播导航标签来切换*/
			mode: 'vertical',//轮播方向是横向还是竖向
			loop:false,//是否循环轮播
			noSwiping:true,
		
			/*followFinger:false,*/
			/*centeredSlides: true,*/
    		/*slidesPerView: 'auto',*//*是否能预览前后相邻的页面*/

			onTouchEnd:function()
			{
				console.log("ontouch end");
			},
			
			onSlideChangeStart:function()
			{
				console.log("onSlideChangeStart");
			},
			onSlideChangeEnd:function()
			{
				console.log("onSlideChangeEnd");
			},
			onSlideNext:function(idx)
			{
				if( idx.activeIndex == idx.slides.length - 1 )
				{
					$('#pageArrow').hide();
				}
				console.log("onSlideNext");
			},
			onSlidePrev:function(idx)
			{
				
					$('#pageArrow').show();
				
				
				console.log("onSlidePrev");
			},
			
		});
		console.log("初始化完毕");
});

function changePage()
{

}

//触发轮播下一页
function toPage(idx)
{
	mySwiper.swipeTo(idx);
}

//触发轮播下一页
function nextPage()
{
	mySwiper.swipeNext();
}
//触发轮播上一页
function prevPage()
{
	mySwiper.swipePrev();
}