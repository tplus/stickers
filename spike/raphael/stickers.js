(function(paper) {
	var STICKER_WIDTH = 100,
		STICKER_HEIGHT = 100;
	
	function drawSticker(x, y, text) {
		var stickerPaper = paper.rect(x, y, STICKER_WIDTH, STICKER_HEIGHT, 0).attr({
				'stroke' : '#ff3',
				'stroke-opacity': 0.7,
				'fill' : '#ff3',
				'fill-opacity' : 0.7
			}),
			stickerText = paper.text(x+STICKER_WIDTH/2, y+STICKER_HEIGHT/2, text).attr({
				'stroke' : 'blue',
				'stroke-opacity' : 0.7,
				'font' : 'Times New Roman',
				'font-size' : 14				
			}),
			sticker = paper.set();
		sticker.push(stickerPaper, stickerText);
		
		var dragStartPoint = null;
		sticker.hover(
			function() {
				sticker.forEach(function(elem){
					elem.attr({
						'stroke-opacity' : 1,
						'fill-opacity' : 1
					});					
				});
			},
			function() {
				sticker.forEach(function(elem){
					elem.attr({
						'stroke-opacity' : 0.7,
						'fill-opacity' : 0.7
					});					
				});
			}
		).drag(
			function(deltaX, deltaY){
				stickerPaper.attr({
					'x': dragStartPoint.x + deltaX,
					'y': dragStartPoint.y + deltaY
				});
				stickerText.attr({
					'x': dragStartPoint.x + STICKER_WIDTH/2 + deltaX,
					'y': dragStartPoint.y + STICKER_HEIGHT/2 + deltaY
				});
			},
			function(){
				dragStartPoint = {
					'x' : stickerPaper.attr('x'),
					'y' : stickerPaper.attr('y')
				};
				stickerPaper.attr('stroke', 'red');
				sticker.forEach(function(elem){
					elem.attr({
						'stroke-opacity' : 1,
						'fill-opacity' : 1
					});					
				});				
			},
			function(){
				dragStartPoint = null;
				stickerPaper.attr('stroke', '#ff3');
				sticker.forEach(function(elem){
					elem.attr({
						'stroke-opacity' : 0.7,
						'fill-opacity' : 0.7
					});					
				});
			}
		);
		
		return sticker;
	}

	function drawStickerBoard() {
		var stickerBoard = paper.rect(0, 0, 800, 600, 15).attr({
			'fill' : '#bff'
		});
		return stickerBoard;
	}
	
	drawStickerBoard();
	drawSticker(100, 100, 'My first sticker!');
	
})(Raphael("canvas", 800, 600));
