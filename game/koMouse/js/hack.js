
//	times();
//	var oldTime = new Date().getTime();
//	alert(oldTime / (3600 * 1000 *24) );
//	function times(){
//		var newTime = new Date().getMinutes();
//	}
	var addTimes = setInterval(addItem,2000);
	var removeTimes;
	function addItem(){
		$(".frame li").each(function(){
			var i = Math.random() * 5;
			if( i > 4 ){
				$(this).find(".content").addClass("red");
				var str = '<div class="redbao"><img src="images/redbao.png"/></div>';
				$(this).find(".content").html(str);
			}
			removeItem($(this));
		});
	}
	function removeItem(element){
		removeTimes = setTimeout(function(){
			element.find(".redbao").remove();
		},3000);
	}
	
//	function removeItem(element){
//		element.click(function(){
//			clearTimeout(removeTimes);
//			if($(this).find("div").hasClass("red")){
//				var str = '<div class="cuizi"><img src="images/sinker.png"/></div> <div class="gold"><img src="images/gold.png"/></div>';
//				$(this).find(".redbao").after(str);
//				setTimeout(function(){
//					element.find(".content").html('')
//				},500);
//			}
//		});
//		var removeTimes = setTimeout(function(){
//			element.find(".redbao").remove();
//		},3000);
//	}
	function hack(element){
		clearTimeout(removeTimes);
		if(element.find("div").hasClass("red")){
			var str = '<div class="cuizi"><img src="images/sinker.png"/></div> <div class="gold"><img src="images/gold.png"/></div>';
			element.find(".redbao").after(str);
			setTimeout(function(){
				element.find(".content").html('')
			},500);
		}
	}