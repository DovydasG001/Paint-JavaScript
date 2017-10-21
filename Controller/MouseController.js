// Contains methods to react to mouse events
// The controller takes in the current layer and the current
// drawing tool

class MouseController {
  constructor(canvas, layer) {
    this.canvas = canvas;
    this.layer = layer;
    this.mousePosition = {x: 0, y: 0};
    this.activateMouseListeners();
    this.mouseDown = false;
    this.mouseIn = false;
    this.shiftDown = false;
  }

  activateMouseListeners() {
    var currentObject = this;
    // adding a key listener
    document.addEventListener('keydown', function(event) {
      if (event.key == "Shift") {
        currentObject.shiftDown = true;
      }
    });
    document.addEventListener('keyup', function(event) {
      if (event.key == "Shift") {
        currentObject.shiftDown = false;
      }
    });

    canvas.addEventListener('mousedown', function(event) {
      currentObject.mouseDown = true;
      if (currentObject.shiftDown) {
        currentObject.mouseMoveEvent(event);
      }
      else {
        currentObject.moudeDownEvent(event);
      }
    }, false);

    canvas.addEventListener('mousemove', function(event) {
      if (currentObject.mouseDown) {
        currentObject.mouseMoveEvent(event);
      }
    }, false);

    canvas.addEventListener('mouseup', function(event) {
      currentObject.mouseDown = false;
    }, false);
  }

  moudeDownEvent(event){
    this.mousePosition.x = event.pageX - this.canvas.offsetLeft;
    this.mousePosition.y = event.pageY - this.canvas.offsetTop;
    DrawingMethods.drawPoint(
      DrawingMethods.colorStringToObj(
        document.getElementById('brushColor').value
      ),
      this.layer,
      this.mousePosition.x,
      this.mousePosition.y);
    View.refresh(
      this.canvas.getContext('2d'),
      this.layer,
      View.findBounds(
        {x: this.mousePosition.x, y: this.mousePosition.y},
        {x: this.mousePosition.x, y: this.mousePosition.y})
      );
  }

  mouseMoveEvent(event){
    var lastMousePosition = {
      x: this.mousePosition.x,
      y: this.mousePosition.y
    };
    this.mousePosition.x = event.pageX - this.canvas.offsetLeft;
    this.mousePosition.y = event.pageY - this.canvas.offsetTop;
    DrawingMethods.drawLine(
      DrawingMethods.colorStringToObj(
        document.getElementById('brushColor').value
      ),
      this.layer,
      lastMousePosition.x, lastMousePosition.y,
      this.mousePosition.x, this.mousePosition.y);

    View.refresh(
      this.canvas.getContext('2d'),
      this.layer,
      View.findBounds(
        {x: lastMousePosition.x, y: lastMousePosition.y},
        {x: this.mousePosition.x, y: this.mousePosition.y})
      );
  }

  // sets the layer that the mouse listener reacts to
  // as the current layer
  setCurrentLayer(layer) {
    this.layer = layer;
  }
}
