<p>
背景：2015年时，滑屏的交互方式在运营类H5中已趋于普遍，前前后后涉及参与的这一类展示的h5大概有40多个，多数是基于jq、animate.css、与swiper为主，中间也使用过相对较小的库swipe，但这个库，对于高亮显示圆点导航有问题，同时快速滑动的时候也会产生元素重叠的问题。
</p>
<p>由于要操作的元素比较多，所以涉及到大量的图片和大量的动画，所以预加载就很有必要，同时一个成熟的动画库也很有必要，在不失真的情况下，要尽量压缩图片的大小，可以使用www.tinyping.com来压缩，CSS animations, transforms 以及 transitions 不会自动开启GPU加速，所以</p>


### 知识点：
> ###预加载：懒加载也就是延迟加载。
> 原理：
- 首先，不要将图片地址放到src属性中，而是放到其它属性(data-original)中。
- 页面加载完成后，根据scrollTop判断图片是否在用户的视野内，如果在，则将data-original属性中的值取  出存放到src属性中。
3)在滚动事件中重复判断图片是否进入视野，如果进入，则将data-original属性中的值取出存放到src属性中。
实现：
- 用CSS和JavaScript实现预加载
- 仅使用JavaScript实现预加载
- 使用Ajax实现预加载


常用代码：①
```
function preloadimages(arr){   
    var newimages=[], loadedimages=0
    var postaction=function(){}  //此处增加了一个postaction函数
    var arr=(typeof arr!="object")? [arr] : arr
    function imageloadpost(){
        loadedimages++
        if (loadedimages==arr.length){
            postaction(newimages) //加载完成用我们调用postaction函数并将newimages数组做为参数传递进去
        }
    }
    for (var i=0; i<arr.length; i++){
        newimages[i]=new Image()
        newimages[i].src=arr[i]
        newimages[i].onload=function(){
            imageloadpost()
        }
        newimages[i].onerror=function(){
            imageloadpost()
        }
    }
    return { //此处返回一个空白对象的done方法
        done:function(f){
            postaction=f || postaction
        }
    }
}
```

常用代码2：
```
function loadImage(url, callback){     
    var img = new Image();
    img.onload=function(){
        img.onload = null;
        callback(img);
    }
    img.src = url;
}
function loadOther(callback){
	var len=$('.loaded').length;
	for(var i=0;i<len;i++){		 	
		var url=$('.loaded').eq(i).attr("src2");
 		$('.loaded').eq(i).attr("src",url);
	}
}
loadImage($(".img").attr('src'),loadOther);
```



#### 参考链接：
[移动H5前端性能优化指南](http://www.cnblogs.com/langzi1989/p/5965819.html)
[Javascript实现图片的预加载的完整实现](http://www.cnblogs.com/mz121star/archive/2012/11/01/javascript_preloadimages.html)
[基于CSS3的WEBAPP横向滑动模式演化](http://ued.ctrip.com/blog/webapp-horizontal-sliding-mode-based-on-css3-evolution.html)
[使用CSS3开启GPU硬件加速提升网站动画渲染性能](http://blog.csdn.net/hsany330/article/details/50925260)