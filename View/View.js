class View {
  constructor(color, layer, canvas) {
    this.brushColor = color;
    this.pixelSize = 10;
    this.setInputFieldValues();
    this.currentLayer = layer;
    this.canvas = canvas;
    this.context = canvas.getContext('2d');
  }

  setInputFieldValues() {
    document.getElementById("brushColor").value = this.brushColor;
  }

  static paintLayer(context, layer, pixelSize) {
    var windowRow = 0;
    var windowColumn = 0;
    for (var row = 0; row < layer.getHeight(); row++) {
      for (var column = 0; column < layer.getWidth(); column++) {
        // context.fillStyle  = layer.getPixelAt(column, row).getColorString();
        context.fillStyle  = layer.getPixelAt(column, row).getColor();
        context.fillRect(windowRow, windowColumn, pixelSize, pixelSize);
        windowColumn += pixelSize;
      }
      windowColumn = 0;
      windowRow += pixelSize;
    }
  }

  refresh(bounds, pixelSize) {
    var windowRow = Math.max(bounds.y0, 0)*pixelSize;
    var windowColumn = Math.max(bounds.x0, 0)*pixelSize;
    for (var row = Math.max(bounds.y0, 0); row < bounds.y1; row++) {
      for (var column = Math.max(bounds.x0, 0); column < bounds.x1; column++) {
        // this.context.fillStyle  = this.currentLayer.getPixelAt(column, row).getColorString();
        this.context.fillStyle  = this.currentLayer.getPixelAt(column, row).getColor();
        this.context.fillRect(windowColumn, windowRow, pixelSize, pixelSize);
        windowColumn += pixelSize;
      }
      windowColumn = Math.max(bounds.x0, 0)*pixelSize;
      windowRow += pixelSize;
    }
  }

  static findBounds(pointOne, pointTwo, maxX, maxY) {
    return {
      x0: Math.max(Math.min(pointOne.x, pointTwo.x) - 1, 0),
      y0: Math.max(Math.min(pointOne.y, pointTwo.y) - 1, 0),
      x1: Math.min(Math.max(pointOne.x, pointTwo.x) + 1, maxX),
      y1: Math.min(Math.max(pointOne.y, pointTwo.y) + 1, maxY)
    };
  }

}
