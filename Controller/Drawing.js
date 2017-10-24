class DrawingMethods {
  constructor() {
  }

  static drawPoint(color, layer, x, y) {
    layer.getPixelAt(x, y).setColor(color);
  }

  static drawLine(color, layer, x0, y0, x1, y1) {
   var dx = Math.abs(x1-x0);
   var dy = Math.abs(y1-y0);
   var sx = (x0 < x1) ? 1 : -1;
   var sy = (y0 < y1) ? 1 : -1;
   var err = dx-dy;

   while(true){
     DrawingMethods.drawPoint(color, layer, x0, y0);  // Do what you need to for this
     if ((x0==x1) && (y0==y1)) break;
     var e2 = 2*err;
     if (e2 >-dy){ err -= dy; x0  += sx; }
     if (e2 < dx){ err += dx; y0  += sy; }
   }
  }

  //Changes the color of all of the layer
  static paintWholeLayer(color, layer) {
    for (var row = 0; row < layer.getHeight(); row++) {
      for (var column = 0; column < layer.getWidth(); column++) {
        layer.getPixelAt(column, row).setColor(color);
      }
    }
  }

  static colorStringToObj(colorString) {
    var color = colorString.split(", ");
    return {r:color[0], g:color[1], b:color[2], a:color[3],};
  }
}
