ves(function(){
		var $$=ves;
		var screenH=$$(document).height();
		var mySwiper = null;
		console.log(screenH);
		$$('.loadin_wrap').height(screenH);		
		console.log($$('.loadin_wrap').height());
		//加载效果
		$$('.loadmask').addClass('loadingMaskAni');
		console.log($$('.loadmask').hasClass('loadingMaskAni'));
		var imgSrcList=[];
		$$('body').find('img').each(function(){
			imgSrcList.push($$(this).attr('src'));
		});
		var len=imgSrcList.length;
		var count=0;
		var setTO=null;				
		if(len!=0){
			for(i=0;i<len;i++){
				var src=imgSrcList[i];
				var imgObject=new Image();
				imgObject.src=src;
				imgObject.onload=function(){
					count++;
					num_percent=parseInt(count/len*100,10);
					$$('.loadTxt').text(num_percent+'%');
					if(num_percent>100){
						num_percent=100;	
					}
					if(num_percent>98){
						$$('.loadmask').removeClass('loadingMaskAni');
						$$('.loadin_wrap').css('display','none');
						$$('.main').css('display','block').height(screenH);
						just_play();
						mySwiper = new Swiper('.swiper-container',{
				            direction:"vertical",
				            speed : 1000,
				            longSwipesRatio : 0.3,
				            grabCursor:true,
							runCallbacksOnInit : true,
							mousewheelControl : true,
							onInit:function(swiper){
								zhuAni();
							},
		       				onSlideChangeStart: function(swiper) {
		       					//当滑块滑到下一块时
								var thisIndex=swiper.activeIndex;
								if(thisIndex==0){
									zhuAni();		
									$$('.gb-1').css('display','block');
					        		$$('.gb-2').removeClass('on').css('opacity','0');
								}
								if(thisIndex==1){
									$$('.gb-1').on('webkitAnimationEnd',function(){
										setTimeout(function(){
											$$('.gb-1').css('display','none');
											$$('.gb-2').addClass('on');
										},5000);
									});
								}
								if(thisIndex==4){
									$$('.p5-7').on('webkitAnimationEnd',function(){
										setTimeout(function(){													
											$$('.scroll_1').css('display','none');
											$$('.scrollWrap_1').css('display','block');
											moveFun('.scrollWrap_1','left');
										},1000);
									});
									$$('.p5-9').on('webkitAnimationEnd',function(){
										setTimeout(function(){													
											$$('.scroll_2').css('display','none');
											$$('.scrollWrap_2').css('display','block');
											moveFun('.scrollWrap_2','right');
										},1000);
									});
								}
								if(thisIndex==6){
									$$('.p7-cir1').addClass('ani_1');
									$$('.p7-2').on('webkitAnimationEnd',function(){
										setTimeout(function(){
											$$('.p7-cir1').removeClass('ani_1').addClass('ani_2').css('opacity','1');
										},1000);
									});
								}
								if(thisIndex==7){
									$$('.p7-cir1').removeClass('ani_2').css('opacity','0');
								}
					        },
					        onSlideNextStart: function(swiper){
					        	var thisIndex=swiper.activeIndex;
					        	if(thisIndex==5){
					        		$$('.scroll_1,.scroll_2').css('display','block');
					        		$$('.scrollWrap').css('display','none');	
					        		for(var i=0;i<myRollArr.length;i++){
					        			clearInterval(myRollArr[i]);
					        		}
					        	}
					        },
					        onSlidePrevStart: function(swiper){
					        	var thisIndex=swiper.activeIndex;
					        	if(thisIndex==3){
									$$('.scroll_1,.scroll_2').css('display','block');
					        		$$('.scrollWrap').css('display','none');
					        		for(var i=0;i<myRollArr.length;i++){
					        			clearInterval(myRollArr[i]);
					        		}							        		
					        	}
					        },
					        onSlideChangeEnd: function(swiper){
					        	var thisIndex=swiper.activeIndex;
					        	if(thisIndex==1){
					        		clearInterval(setTO);
					        	}
					        	if(thisIndex==2){
					        		$$('.gb-1').css('display','block');
					        		$$('.gb-2').removeClass('on').css('opacity','0');
					        	}									   
						    }
						});
					}
				}
			}
		}				
		
		function zhuAni(){
			var count=0;
			setTO=setInterval(function(){
				count++;
				if(count%2==0){
					$$('.zhu_1').css('display','none');
					$$('.zhu_2').css('display','block');
				}else{
					$$('.zhu_2').css('display','none');
					$$('.zhu_1').css('display','block');
				}
			},300);
		}
		
		function play_music(){
		    if ($$('#mc_play').hasClass('on')){
		        $$('#mc_play audio')[0].pause();
		        $$('#mc_play').attr('class','stop');
		    }else{
		        $$('#mc_play audio')[0].play();
		        $$('#mc_play').attr('class','on');
		    }
		}
		function just_play(){
		    $$('#mc_play audio')[0].play();
		    $$('#mc_play').attr('class','on');
		} 				
		$$('#mc_play').on('click',function(){
			play_music();
		});
		var myRollArr=[];
		function moveFun(ele,direction){
			//向左移动
			var oDiv=$$(ele);
			var oUl=oDiv.children('ul');
			var oLi=oUl.find('li').eq(0)
			var new_li=$$('<li class="clone"></li>');
			new_li.html(oLi.html());
			oUl.append(new_li);
			oUl.width(oLi.width()*2).height(oLi.height());					
			oLi.width(oDiv.width());
			new_li.width(oDiv.width());
			oDiv.height(oLi.height());
			var x=0;	
			var myRoll=null;				
			if(direction=='left'){
				//向左滚动
				x=0;
			}else if(direction=='right'){
				//向右滚动
				x=-oUl.width()/2;
			}
			function move(){
				x++;
				if(direction=='left'){
					if(x>=oUl.width()/2){
						x=0;
					}
					oUl.css({
						'transform':'translate3d(-'+x+'px,0px,0px)'
					});
				}else if(direction=='right'){
					if(x>=0){
						x=-oUl.width()/2;
					}
					oUl.css({
						'transform':'translate3d('+x+'px,0px,0px)'
					});
				}
			}
			myRoll=setInterval(move,30);
			myRollArr.push(myRoll);
		}
});