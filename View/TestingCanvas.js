function draw() {
  var canvas = document.getElementById('canvas');

  if (canvas.getContext) {
    var context = canvas.getContext('2d');

    var newLayer = new Layer(800, 600);
    var mouseController = new MouseController(canvas, newLayer);
    var view = new View("255, 255, 255, 255");
    View.paintLayer(context, newLayer);

    console.log("So far so good");

  } else {
    window.alert("Browser does not support <canvas>");
  }
}

class View {
  constructor(color) {
    this.brushColor = color;
    this.setFormValues();
  }

  setFormValues() {
    document.getElementById("brushColor").value = this.brushColor;
  }

  static paintLayer(context, layer) {
    for (var row = 0; row < layer.getHeight(); row++) {
      for (var column = 0; column < layer.getWidth(); column++) {
        context.fillStyle  = layer.getPixelAt(column, row).getColorString();
        context.fillRect(column, row, 1, 1);
      }
    }
  }

  static refresh(context, layer, bounds) {
    for (var row = bounds.y0; row < bounds.y1; row++) {
      for (var column = bounds.x0; column < bounds.x1; column++) {
        context.fillStyle  = layer.getPixelAt(column, row).getColorString();
        context.fillRect(column, row, 1, 1);
      }
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
