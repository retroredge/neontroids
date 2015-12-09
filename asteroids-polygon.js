function drawPolygon(polygon, x, y) {
	ctx.strokeStyle = polygon.strokeStyle;
	ctx.shadowColor = polygon.color;
	ctx.lineWidth = 1.25;
	ctx.shadowBlur = 10;	
	
	ctx.save();
	ctx.beginPath();
	ctx.translate(x, y);
	for (var j = 0; j < polygon.blurCount; j++) {
		polygon.points.forEach(function(polygonPoint) {
			ctx.lineTo(polygonPoint[0], polygonPoint[1]);

		});
		ctx.closePath();
		ctx.stroke();
 	}
	ctx.restore();

}

function polygon(points, color, blurCount, strokeStyle) {
	this.points = points;
	this.color = color;
	this.blurCount = blurCount;
	this.strokeStyle = strokeStyle;
	
	this.boundingBox = function() {
		var minX = 0;
		var minY = 0;
		var maxX = 0; 
		var maxY = 0;
		this.points.forEach(function(polygonPoint) {
			if(polygonPoint[0] < minX) {
				minX = polygonPoint[0];
			}
			
			if (polygonPoint[0] > maxX) {
				maxX = polygonPoint[0];
			}
			
			if(polygonPoint[1] < minY) {
				minY = polygonPoint[1];
			}
			
			if (polygonPoint[1] > maxY) {
				maxY = polygonPoint[1];
			}
			
		});

		var box = [[minX,minY], [maxX,minY], [maxX,maxY], [minX,maxY]];
		return box;
	}

}

function scalePoint(point, scale) {
	var newPoint = [];
	newPoint.push(point[0] * scale);
	newPoint.push(point[1] * scale);
	return newPoint;
}

function rotatePoint(point, angle) {
	var newPoint = [];
    cosVal = Math.cos(degreesToRadians(angle));
    sinVal = Math.sin(degreesToRadians(angle));
    newPoint.push(point[0] * cosVal + point[1] * sinVal);
    newPoint.push(point[1] * cosVal - point[0] * sinVal);

	return newPoint;
}

function degreesToRadians(angle) {
	return Math.PI * (angle/180);
}

function hypotSquared(x, y) {
	return x*x + y*y;
}