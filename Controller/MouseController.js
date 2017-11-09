// Contains methods to react to mouse events
// The controller takes in the current layer and the current
// drawing tool

class MouseController {
  constructor(toolController, canvas, view) {
    this.toolController = toolController;
    this.canvas = canvas;
    //this.layer = layer; // the mouse controller should not take layer
    this.view = view;
    this.mousePosition = {x: 0, y: 0};
    this.activateMouseListeners();
    this.mouseDown = false;
    this.mouseIn = false;
    this.shiftDown = false;
  }

  activateMouseListeners() {
    // initialize current object into new variable to give methods outside this function access to the current objects variables
    // CHECKING to see if current object is necessary with the arrow function notation

    // Mouse listeners for drawing
    document.addEventListener(
      'keydown',
      (event) => {
        if (event.key == "Shift") {this.shiftDown = true;}
      }
    );
    document.addEventListener(
      'keyup',
      (event) => {
        if (event.key == "Shift") {this.shiftDown = false;}
      }
    );

    // Higlights the current pixelSize
    canvas.addEventListener(
      'mouseover',
      function(event) {
      }
    );

    canvas.addEventListener(
      'mousedown',
      (event) => {
        this.mouseDown = true;
        if (this.shiftDown) {
          this.mouseMoveEvent(event);
        } else {
          this.mouseDownEvent(event);
        }
      },
      false
    );

    canvas.addEventListener(
      'mousemove',
      (event) => {
        if (this.mouseDown) {this.mouseMoveEvent(event);}
      },
      false
    );

    canvas.addEventListener(
      'mouseup',
      (event) => {
        this.mouseDown = false;
      },
      false
    );

    // Mouse listeners for input buttons
    let brushColorButton = document.getElementById("brush-color-button");
    brushColorButton.addEventListener(
      'mousedown',
      () => {
        this.view.brushColor = document.getElementById("brushColor").value;
      }
    );

    // Mouse listeners for tool selection
    let pencilIcon = document.getElementById("pencil-icon");
    pencilIcon.addEventListener(
      'click',
      () => {
        this.toolController.setCurrentTool("pencil-tool");
      },
      false
    );
    let bucketIcon = document.getElementById("bucket-icon");
    bucketIcon.addEventListener(
      'click',
      () => {
        this.toolController.setCurrentTool("bucket-tool");
      },
      false
    );
  }

  mouseDownEvent(event){
    // Transforms the mouse coordinates according to Page coordinates and View setings
    [this.mousePosition.x, this.mousePosition.y] = this.transformMouseCoordinates(event);
    // Calls drawing methods
    this.toolController.CurrentTool(
      'leftbuttondown',
      {x: this.mousePosition.x, y: this.mousePosition.y}
    );
  }

  mouseMoveEvent(event){
    // Transforms the mouse coordinates according to Page coordinates and View setings
    let [xLast, yLast] = [this.mousePosition.x, this.mousePosition.y];
    let [xNew, yNew] = this.transformMouseCoordinates(event);
    [this.mousePosition.x, this.mousePosition.y] = [xNew, yNew];
    this.toolController.CurrentTool(
      'mousemove',
      {
        xLast,
        yLast,
        xNew,
        yNew
      }
    );
  }

  // sets the layer that the mouse listener reacts to
  // as the current layer
  setCurrentLayer(layer) {
    this.layer = layer;
  }

  transformMouseCoordinates(event) {
    // Transforms the mouse coordinates from page coordinates into layer coordinates
    let x = event.pageX - this.canvas.offsetLeft;
    // Transforms the coordinates according to the size of the pixel in the View
    if (x != 0) {
      x--;
    }
    x = parseInt(x/this.view.pixelSize);
    let y = event.pageY - this.canvas.offsetTop;
    if (y != 0) {
      y--;
    }
    y = parseInt(y/this.view.pixelSize);
    return [x, y];
  }

}
