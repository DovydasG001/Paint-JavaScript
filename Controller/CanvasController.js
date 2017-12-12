class CanvasController {

  static repaintAllLayers(model) {
    for (var i = model.layerCount-1; i>=0; i--) {// var layer of model.layer) {
      var layer = model.getLayer(i);
      // Checks if the layer is vissible if so it is repainted
      if (layer.getVisibility()) {
        var context = document.getElementById('canvas').getContext('2d');
        var windowRow = 0;
        var windowColumn = 0;
        for (var row = 0; row < layer.getHeight(); row++) {
          for (var column = 0; column < layer.getWidth(); column++) {
            context.fillStyle  = layer.getPixelAt(column, row).getColor();
            context.fillRect(windowColumn, windowRow, model.pixelSize, model.pixelSize);
            windowColumn += model.pixelSize;
          }
          windowColumn = 0;
          windowRow += model.pixelSize;
        }
      }
    }
  }

  static repaintSegment(bounds, model) {
    // Checks to see if the layer is visible
    if (model.getActiveLayer().getVisibility()) {
      var context = document.getElementById('canvas').getContext('2d');
      var windowRow = Math.max(bounds.y0, 0)*model.pixelSize;
      var windowColumn = Math.max(bounds.x0, 0)*model.pixelSize;
      for (var row = Math.max(bounds.y0, 0); row < bounds.y1; row++) {
        for (var column = Math.max(bounds.x0, 0); column < bounds.x1; column++) {
          context.fillStyle  = model.getActiveLayer().getPixelAt(column, row).getColor();
          context.fillRect(windowColumn, windowRow, model.pixelSize, model.pixelSize);
          // Checks to see if the pixel is visible
          // if (model.getActiveLayer().getPixelAt(column, row).getVisibility()) {
          //   context.fillStyle  = model.getActiveLayer().getPixelAt(column, row).getColor();
          //   context.fillRect(windowColumn, windowRow, model.pixelSize, model.pixelSize);
          // }
          windowColumn += model.pixelSize;
        }
        windowColumn = Math.max(bounds.x0, 0)*model.pixelSize;
        windowRow += model.pixelSize;
      }
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
