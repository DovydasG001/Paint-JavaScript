// Contains methods to react to mouse events
// The controller takes in the current layer and the current
// drawing tool

class MouseController {
  constructor(model) {
    this.model = model;
    this.canvas = document.getElementById("canvas");
    this.mousePosition = {x: 0, y: 0};
    this.mouseDown = false;
    this.mouseIn = false;
    this.shiftDown = false;
    this.activateMouseListeners();
  }

  activateMouseListeners() {
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

    // Mouse listeners for tool selection
    let pencilIcon = document.getElementById("pencil-icon");
    pencilIcon.addEventListener(
      'click',
      () => {
        this.model.setCurrentTool("pencil-tool");
      },
      false
    );
    let bucketIcon = document.getElementById("bucket-icon");
    bucketIcon.addEventListener(
      'click',
      () => {
        this.model.setCurrentTool("bucket-tool");
      },
      false
    );

    // Listeners for Layer menu
    let addLayerButton = document.getElementById("add-layer-button");
    addLayerButton.addEventListener(
      'click',
      () => {
        MouseController.createNewLayer(this.model);
      },
      false
    );

  }

  mouseDownEvent(event){
    // Transforms the mouse coordinates according to Page coordinates and View setings
    [this.mousePosition.x, this.mousePosition.y] = this.transformMouseCoordinates(event);
    // Calls drawing methods
    ToolController.callCurrentTool(
      'leftbuttondown',
      {x: this.mousePosition.x, y: this.mousePosition.y},
      this.model
    );
  }

  mouseMoveEvent(event){
    // Transforms the mouse coordinates according to Page coordinates and View setings
    let [xLast, yLast] = [this.mousePosition.x, this.mousePosition.y];
    let [xNew, yNew] = this.transformMouseCoordinates(event);
    [this.mousePosition.x, this.mousePosition.y] = [xNew, yNew];
    ToolController.callCurrentTool(
      'mousemove',
      {
        xLast,
        yLast,
        xNew,
        yNew
      },
      this.model
    );
  }

  transformMouseCoordinates(event) {
    // Transforms the mouse coordinates from page coordinates into layer coordinates
    let canvasContainer = document.getElementById("canvascontainer");
    let x = event.pageX - this.canvas.offsetLeft + canvasContainer.scrollLeft;
    // Transforms the coordinates according to the size of the pixel in the View
    if (x != 0) {
      x--;
    }
    x = parseInt(x/this.model.pixelSize);
    let y = event.pageY - this.canvas.offsetTop + canvasContainer.scrollTop;
    if (y != 0) {
      y--;
    }
    y = parseInt(y/this.model.pixelSize);
    return [x, y];
  }

  static createNewLayer(model) {
    // Sets the visibility of the layer to false if this is not the first layer
    if (model.layerCount == 0) {
      var layerVisibility = true;
    } else {
      var layerVisibility = false;
    }
    // Adds new layer to Model
    model.addNewLayer(new Layer(model.pictureWidth, model.pictureHeight, layerVisibility));
    //*** At this point there is 1 layer, the layerCount is 1, the active layer is 0

    //Adds a new layer selector to the layer menu
    document.getElementById("layer-menu").appendChild(generateLayerSelectors(model.layerCount));


    // Add event listener for layer selector
    var layer = document.getElementById("layer-" + model.layerCount);
    // Set number of current layer
    var layerNumber = model.layerCount;

    // Set layer selector to show active and the other ones to inactive
    let allLayerSelectors = document.querySelectorAll(".layer");
    allLayerSelectors.forEach(
      (currentValue) => {
        currentValue.style["background-color"] = "white";
      }
    );
    layer.style["background-color"] = "gray";
    // // Change the current active layer in Model
    // model.setActiveLayerNr(layerNumber);

    // Listener to change whole layer visibility
    console.log("layer number that is used to set the listener: " + layerNumber);
    // layerNumber++;
    let layerVisibilityCheckbox = document.getElementById("layer-" + layerNumber + "-checkbox");
    var layerObject = model.getLayer(layerNumber-1);
    layerVisibilityCheckbox.addEventListener(
      'click',
      () => {
        if (layerVisibilityCheckbox.src.includes("-checked")) {
          layerVisibilityCheckbox.src = layerVisibilityCheckbox.src.replace("-ch", "-unch");
          layerObject.setVisibility(false);
        } else {
          layerVisibilityCheckbox.src = layerVisibilityCheckbox.src.replace("-unch", "-ch");
          layerObject.setVisibility(true);
        }
        CanvasController.repaintAllLayers(model);
      },
      false
    );

    // Listener to change the active layer and make that change visible
    layer.addEventListener(
      'click',
      () => {
        if (layer.style["background-color"] == "white") {
          // Make all the other layer selectors white
          let allLayerSelectors = document.querySelectorAll(".layer");
          allLayerSelectors.forEach(
            (currentValue) => {
              currentValue.style["background-color"] = "white";
            }
          );
          layer.style["background-color"] = "gray";
          // Change the current active layer in Model
          model.setActiveLayerNr(layerNumber-1);
        };
      },
      false
    );
  }

}
