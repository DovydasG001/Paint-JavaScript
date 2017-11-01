class View {
  constructor(color) {
    this.brushColor = color;
    this.pixelSize = 100;
    this.setFormValues();
  }

  setFormValues() {
    document.getElementById("brushColor").value = this.brushColor;
  }

  static paintLayer(context, layer, pixelSize) {
    var windowRow = 0;
    var windowColumn = 0;
    for (var row = 0; row < layer.getHeight(); row++) {
      for (var column = 0; column < layer.getWidth(); column++) {
        context.fillStyle  = layer.getPixelAt(column, row).getColorString();
        context.fillRect(windowRow, windowColumn, pixelSize, pixelSize);
        windowColumn += pixelSize;
      }
      windowColumn = 0;
      windowRow += pixelSize;
    }
  }

  static refresh(context, layer, bounds, pixelSize) {
    var windowRow = Math.max(bounds.y0, 0)*pixelSize;
    var windowColumn = Math.max(bounds.x0, 0)*pixelSize;
    for (var row = Math.max(bounds.y0, 0); row < bounds.y1; row++) {
      for (var column = Math.max(bounds.x0, 0); column < bounds.x1; column++) {
        console.log("column: " + column + ", row: " + row);
        context.fillStyle  = layer.getPixelAt(column, row).getColorString();
        context.fillRect(windowColumn, windowRow, pixelSize, pixelSize);
        console.log("windowColumn: " + windowColumn + ", windowRow: " + windowRow);
        windowColumn += pixelSize;
      }
      windowColumn = Math.max(bounds.x0, 0)*pixelSize;
      windowRow += pixelSize;
    }
  }

  static findBounds(pointOne, pointTwo) {
    if (pointOne.x <= pointTwo.x) {
      if (pointOne.y <= pointTwo.y) {
        return {x0: pointOne.x-1, y0: pointOne.y-1, x1: pointTwo.x+1, y1: pointTwo.y+1};
      }else {
        return {x0: pointOne.x-1, y0: pointTwo.y-1, x1: pointTwo.x+1, y1: pointOne.y+1};
      }
    }else {
      if (pointOne.y <= pointTwo.y) {
        return {x0: pointTwo.x-1, y0: pointOne.y-1, x1: pointOne.x+1, y1: pointTwo.y+1};
      }else {
        return {x0: pointTwo.x-1, y0: pointTwo.y-1, x1: pointOne.x+1, y1: pointOne.y+1};
      }
    }
  }
}
