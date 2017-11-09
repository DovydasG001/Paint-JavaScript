class ToolController {
  constructor(view, layer, canvas) {
    this.canvas = canvas;
    this.layer = layer;
    this.view = view;
    this.currentTool = "pencil-tool";
  }

  setCurrentTool(toolName) {
    this.currentTool = toolName;
  }

  // activates the current tool
  CurrentTool(eventType, mousePosition) {
    // Currently it only activates the PencilTool
    switch (this.currentTool) {
      case "pencil-tool":
        ToolController.PencilTool(eventType, mousePosition, this);
        break;
      case "bucket-tool":
        ToolController.BucketTool(eventType, mousePosition, this);
        break;
      default:
        console.log("No such tool!");
    }
    //ToolController.PencilTool(eventType, mousePosition, this);
  }

  static BucketTool(eventType, mousePosition, object) {
    if (eventType == 'leftbuttondown') {
      ToolController.paintWholeLayer(
        "#" + object.view.brushColor,
        object.layer
      );
      object.view.refresh(
        View.findBounds(
          {x: 0, y: 0},
          {x: object.layer.width, y: object.layer.height},
          object.layer.width,
          object.layer.height
        ),
        object.view.pixelSize
      );
    }
  }

  static PencilTool(eventType, mousePosition, object) {
    // Checks if the event was a single click or a click and move
    if (eventType == 'leftbuttondown') {
      // Calls appropriate drawing method
      ToolController.drawPoint(
        "#" + object.view.brushColor,
        object.layer,
        mousePosition.x,
        mousePosition.y
      );
      // Refreshes the View to show the change
      object.view.refresh(
        View.findBounds(
          mousePosition,
          mousePosition,
          object.layer.width,
          object.layer.height
        ),
        object.view.pixelSize
      );
    } else if (eventType == 'mousemove') {
      ToolController.drawLine(
        "#" + object.view.brushColor,
        object.layer,
        mousePosition.xLast,
        mousePosition.yLast,
        mousePosition.xNew,
        mousePosition.yNew
      );
      object.view.refresh(
        View.findBounds(
          {x: mousePosition.xLast, y: mousePosition.yLast},
          {x: mousePosition.xNew, y: mousePosition.yNew},
          object.layer.width,
          object.layer.height
        ),
        object.view.pixelSize
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
