class ToolController {

  // activates the current tool
  static callCurrentTool(eventType, mousePosition, model) {
    // Currently it only activates the PencilTool
    switch (model.currentTool) {
      case "pencil-tool":
        ToolController.PencilTool(eventType, mousePosition, model);
        break;
      case "bucket-tool":
        ToolController.BucketTool(eventType, mousePosition, model);
        break;
      default:
        console.log("No such tool!");
    }
  }

  static BucketTool(eventType, mousePosition, model) {
    if (eventType == 'leftbuttondown') {
      ToolController.paintWholeLayer(
        "#" + document.getElementById("brushColor").value,
        model.getActiveLayer()
      );
      CanvasController.repaintSegment(
        CanvasController.findBounds(
          {x: 0, y: 0},
          {x: model.getActiveLayer().width, y: model.getActiveLayer().height},
          model.getActiveLayer().width,
          model.getActiveLayer().height
        ),
        model
      );
    }
  }

  static PencilTool(eventType, mousePosition, model) {
    // Checks if the event was a single click or a click and move
    if (eventType == 'leftbuttondown') {
      // Calls appropriate drawing method
      ToolController.drawPoint(
        "#" + document.getElementById("brushColor").value,
        model.getActiveLayer(),
        mousePosition.x,
        mousePosition.y
      );
      // Repaints the canvas to show the change
      CanvasController.repaintSegment(
        CanvasController.findBounds(
          mousePosition,
          mousePosition,
          model.getActiveLayer().width,
          model.getActiveLayer().height
        ),
        model
      );
    } else if (eventType == 'mousemove') {
      ToolController.drawLine(
        "#" + document.getElementById("brushColor").value,
        model.getActiveLayer(),
        mousePosition.xLast,
        mousePosition.yLast,
        mousePosition.xNew,
        mousePosition.yNew
      );
      CanvasController.repaintSegment(
        CanvasController.findBounds(
          {x: mousePosition.xLast, y: mousePosition.yLast},
          {x: mousePosition.xNew, y: mousePosition.yNew},
          model.getActiveLayer().width,
          model.getActiveLayer().height
        ),
        model
      );
    }
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
     ToolController.drawPoint(color, layer, x0, y0);
     if ((x0==x1) && (y0==y1)) break;
     var e2 = 2*err;
     if (e2 >-dy){ err -= dy; x0  += sx; }
     if (e2 < dx){ err += dx; y0  += sy; }
   }
  }

  //Changes the color of all of the layer
  static paintWholeLayer(color, layer) {
    console.log("I run!");
    for (var row = 0; row < layer.getHeight(); row++) {
      for (var column = 0; column < layer.getWidth(); column++) {
        layer.getPixelAt(column, row).setColor(color);
      }
    }
  }

}
