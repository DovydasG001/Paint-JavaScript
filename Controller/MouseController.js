// Contains methods to react to mouse events
// The controller takes in the current layer and the current
// drawing tool

class MouseController {
  constructor(canvas, layer, view) {
    this.canvas = canvas;
    this.layer = layer;
    this.view = view;
    this.mousePosition = {x: 0, y: 0};
    this.activateMouseListeners();
    this.mouseDown = false;
    this.mouseIn = false;
    this.shiftDown = false;
  }

  activateMouseListeners() {
    // initialize current object into new variable to give methods outside this function access to the current objects variables
    var currentObject = this;
    // adding a key listener
    document.addEventListener(
      'keydown',
      function(event) {
        if (event.key == "Shift") {currentObject.shiftDown = true;}
      }
    );
    document.addEventListener(
      'keyup',
      function(event) {
        if (event.key == "Shift") {currentObject.shiftDown = false;}
      }
    );

    // higlights the current pixelSize
    canvas.addEventListener(
      'mouseover',
      function(event) {
      }
    );

    canvas.addEventListener(
      'mousedown',
      function(event) {
        currentObject.mouseDown = true;
        if (currentObject.shiftDown) {
          currentObject.mouseMoveEvent(event);
        } else {
          currentObject.moudeDownEvent(event);
        }
      },
      false
    );

    canvas.addEventListener(
      'mousemove',
      function(event) {
        if (currentObject.mouseDown) {currentObject.mouseMoveEvent(event);}
      },
      false
    );

    canvas.addEventListener(
      'mouseup',
      function(event) {
        currentObject.mouseDown = false;
      },
      false
    );
  }

  moudeDownEvent(event){
    this.mousePosition.x = event.pageX - this.canvas.offsetLeft;
    console.log("ori_mouse.x: " + this.mousePosition.x);
    if (this.mousePosition.x != 0) {
      this.mousePosition.x--;
    }
    this.mousePosition.x = parseInt(this.mousePosition.x/this.view.pixelSize);
    console.log("mod_mouse.x: " + this.mousePosition.x);
    this.mousePosition.y = event.pageY - this.canvas.offsetTop;
    console.log("ori_mouse.y: " + this.mousePosition.y);
    if (this.mousePosition.y != 0) {
      this.mousePosition.y--;
    }
    this.mousePosition.y = parseInt(this.mousePosition.y/this.view.pixelSize);
    console.log("mod_mouse.y: " + this.mousePosition.y);
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
        {x: this.mousePosition.x, y: this.mousePosition.y}
      ),
      this.view.pixelSize);
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
