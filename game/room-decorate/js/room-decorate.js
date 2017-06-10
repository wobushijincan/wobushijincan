$(function(){
    bodySize();
    window.onresize = function(){
        bodySize();
    }
    function bodySize(){
    	$("#main-frame .room-frame").height($("#main-frame").height());
    	$("#main-frame .room-frame").width($("#main-frame").height() * 1292 / 960);
    }
    $("#btn-list .choice-list li a").each(function() {
    	$(this).click(function() {
    		$(this).parent("li").addClass('selected');
    		$(this).parent("li").siblings().removeClass('selected');
    		if ($(this).parent("li").attr('id') == "floor-btn") {
    			var decorateNum = parseInt($(this).parent("li").attr('decorateNum')) + 1;
    			if (decorateNum > 4) {
    				decorateNum = 1;
    			};
    			$("#main-frame").scrollLeft($('#main-frame .room-frame .floor-frame').position().left);
    			$(this).parent("li").attr('decorateNum', decorateNum);
    			$('#main-frame .room-frame .floor-frame').html('<img src="images/floor-img' + decorateNum + '.png">')
    		}else if ($(this).parent("li").attr('id') == "metope-btn") {
    			var decorateNum = parseInt($(this).parent("li").attr('decorateNum')) + 1;
    			if (decorateNum > 4) {
    				decorateNum = 1;
    			};
    			$("#main-frame").scrollLeft($('#main-frame .room-frame .metope-frame').position().left);
    			$(this).parent("li").attr('decorateNum', decorateNum);
    			$('#main-frame .room-frame .metope-frame').html('<img src="images/metope-bg' + decorateNum + '.png">')
    		}else if ($(this).parent("li").attr('id') == "wardrobe-btn") {
    			var decorateNum = parseInt($(this).parent("li").attr('decorateNum')) + 1;
    			if (decorateNum > 4) {
    				decorateNum = 1;
    			};
    			$("#main-frame").scrollLeft($('#main-frame .room-frame .wardrobe-frame').position().left);
    			$(this).parent("li").attr('decorateNum', decorateNum);
    			$('#main-frame .room-frame .wardrobe-frame').html('<img src="images/wardrobe-img' + decorateNum + '.png">')
    		}else if ($(this).parent("li").attr('id') == "table-btn") {
    			var decorateNum = parseInt($(this).parent("li").attr('decorateNum')) + 1;
    			if (decorateNum > 4) {
    				decorateNum = 1;
    			};
    			$("#main-frame").scrollLeft($('#main-frame .room-frame .lamp-frame1').position().left);
    			$(this).parent("li").attr('decorateNum', decorateNum);
    			$('#main-frame .room-frame .table-frame').html('<img src="images/table-img' + decorateNum + '.png">')
    		}else if ($(this).parent("li").attr('id') == "desk-btn") {
    			var decorateNum = parseInt($(this).parent("li").attr('decorateNum')) + 1;
    			if (decorateNum > 4) {
    				decorateNum = 1;
    			};
    			$("#main-frame").scrollLeft($('#main-frame .room-frame .lamp-frame1').position().left);
    			$(this).parent("li").attr('decorateNum', decorateNum);
    			$('#main-frame .room-frame .desk-lamp').html('<img src="images/desk-lamp' + decorateNum + '.png">')
    		}else if ($(this).parent("li").attr('id') == "bed-btn") {
    			var decorateNum = parseInt($(this).parent("li").attr('decorateNum')) + 1;
    			if (decorateNum > 4) {
    				decorateNum = 1;
    			};
    			$("#main-frame").scrollLeft($('#main-frame .room-frame .bed-frame').position().left);
    			$(this).parent("li").attr('decorateNum', decorateNum);
    			$('#main-frame .room-frame .bed-frame').html('<img src="images/bed-img' + decorateNum + '.png">')
    		}else if ($(this).parent("li").attr('id') == "pillow-btn") {
    			var decorateNum = parseInt($(this).parent("li").attr('decorateNum')) + 1;
    			if (decorateNum > 4) {
    				decorateNum = 1;
    			};
    			$("#main-frame").scrollLeft($('#main-frame .room-frame .pillow-frame').position().left);
    			$(this).parent("li").attr('decorateNum', decorateNum);
    			$('#main-frame .room-frame .pillow-frame').html('<img src="images/pillow-img' + decorateNum + '.png">')
    		}else if ($(this).parent("li").attr('id') == "quilt-btn") {
    			var decorateNum = parseInt($(this).parent("li").attr('decorateNum')) + 1;
    			if (decorateNum > 4) {
    				decorateNum = 1;
    			};
    			$("#main-frame").scrollLeft($('#main-frame .room-frame .quilt-frame').position().left);
    			$(this).parent("li").attr('decorateNum', decorateNum);
    			$('#main-frame .room-frame .quilt-frame').html('<img src="images/quilt-img' + decorateNum + '.png">')
    		}else if ($(this).parent("li").attr('id') == "window-btn") {
    			var decorateNum = parseInt($(this).parent("li").attr('decorateNum')) + 1;
    			if (decorateNum > 4) {
    				decorateNum = 1;
    			};
    			$("#main-frame").scrollLeft($('#main-frame .room-frame .window-frame').position().left);
    			$(this).parent("li").attr('decorateNum', decorateNum);
    			$('#main-frame .room-frame .window-frame').html('<img src="images/window-img' + decorateNum + '.png">')
    		}else if ($(this).parent("li").attr('id') == "television-btn") {
    			var decorateNum = parseInt($(this).parent("li").attr('decorateNum')) + 1;
    			if (decorateNum > 4) {
    				decorateNum = 1;
    			};
    			$("#main-frame").scrollLeft($('#main-frame .room-frame .television-frame').position().left);
    			$(this).parent("li").attr('decorateNum', decorateNum);
    			$('#main-frame .room-frame .television-frame').html('<img src="images/television-img' + decorateNum + '.png">')
    		}else if ($(this).parent("li").attr('id') == "dome-btn") {
    			var decorateNum = parseInt($(this).parent("li").attr('decorateNum')) + 1;
    			if (decorateNum > 4) {
    				decorateNum = 1;
    			};
    			$("#main-frame").scrollLeft($('#main-frame .room-frame .dome-light').position().left);
    			$(this).parent("li").attr('decorateNum', decorateNum);
    			$('#main-frame .room-frame .dome-light').html('<img src="images/dome-light' + decorateNum + '.png">')
    		}else if ($(this).parent("li").attr('id') == "decoration-btn") {
    			var decorateNum = parseInt($(this).parent("li").attr('decorateNum')) + 1;
    			if (decorateNum > 3) {
    				decorateNum = 1;
    			};
    			$("#main-frame").scrollLeft($('#main-frame .room-frame .decoration-frame').position().left);
    			$(this).parent("li").attr('decorateNum', decorateNum);
    			$('#main-frame .room-frame .decoration-frame').html('<img src="images/decoration-img' + decorateNum + '.png">')
    		};
    	});
    });
    $("#btn-list .operate-list li a").each(function() {
    	$(this).click(function() {
    		$(this).parent("li").addClass('selected');
    		$(this).parent("li").siblings().removeClass('selected');
    		$("#main-frame").scrollLeft(0);
    		if ($(this).parent("li").attr('id') == "close-btn") {
    			$("#main-frame .room-frame img").remove();
    			$("#btn-list .choice-list li").attr('decorateNum', "0").removeClass('selected');
    		}else if ($(this).parent("li").attr('id') == "shrink-btn") {
    			if ($(this).parent("li").hasClass('small-view')) {
    				$(this).parent("li").removeClass('small-view');
    				$("#main-frame .room-frame").css({
    					"-webkit-transform": "scale(1,1)",
    					"transform": "scale(1,1)",
    					"-webkit-transform-origin": "left top",
    					"transform-origin": "left top"
    				});
    			}else{
    				var scaleNum = $("#main-frame").width() / $("#main-frame .room-frame").width();
    				$(this).parent("li").addClass('small-view');
    				$("#main-frame .room-frame").css({
    					"-webkit-transform": "scale(" + scaleNum + "," + scaleNum + ")",
    					"transform": "scale(" + scaleNum + "," + scaleNum + ")",
    					"-webkit-transform-origin": "left top",
    					"transform-origin": "left top"
    				});
    			};
    		}else if ($(this).parent("li").attr('id') == "check-btn"){
    			alert("2");
    		};
    	});
    });
    
});