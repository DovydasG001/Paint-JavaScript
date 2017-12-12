function draw() {
  // Shows the canvas after the user specifies the dimensions of canvas
  // and hides the canvas properties input form
  document.getElementById("new-drawing-attributes").style.display = "none";
  document.getElementById("drawing").style.display = "block";

  var canvas = document.getElementById('canvas');
  var canvascontainer = document.getElementById("canvascontainer");

  // Sets the canvas size and positions it accordingly in the canvas container
  var pictureWidth = parseInt(document.getElementById("width").value);
  var pictureHeight = parseInt(document.getElementById("height").value);
  prepareCanvasArea(pictureWidth, pictureHeight);

  // Initializes all objects and draws the canvas
  if (canvas.getContext) {
    var context = canvas.getContext('2d');
    var model = new Model(pictureWidth, pictureHeight);
    MouseController.createNewLayer(model);
    var mouseController = new MouseController(model);
    CanvasController.repaintSegment({x0: 0, y0: 0, x1: pictureWidth, y1: pictureHeight}, model);
    console.log("So far so good");
  } else {
    window.alert("Browser does not support <canvas>!");
  }
}

function prepareCanvasArea(pictureWidth, pictureHeight) {
  canvascontainer.style.width = (window.innerWidth * 0.8) + "px";
  canvascontainer.style.height = (window.innerHeight * 0.95) + "px";
  canvas.style["margin-left"] = Math.max((Math.round(window.innerWidth * 0.8) - pictureWidth)/2, 0) + "px";
  canvas.style["margin-right"] = canvas.style["margin-left"];
  canvas.style["margin-top"] = Math.max((Math.round(window.innerHeight * 0.95) - pictureHeight)/2, 0) + "px";
  canvas.style["margin-bottom"] = canvas.style["margin-top"];
  canvas.width = pictureWidth;
  canvas.height = pictureHeight;
}

function generateLayerSelectors(number) {
  let divContainer = document.createElement("div");
  divContainer.id = "layer-" + number;
  divContainer.style["background-color"] = "white";
  divContainer.className = "layer";
  divContainer.appendChild(document.createTextNode("Layer " + number));
  let layerController = document.createElement("input");
  layerController.id = "layer-" + number + "-checkbox";
  layerController.type = "image";
  layerController.src = "../Images/Checkbox-checked.png";
  divContainer.appendChild(layerController);
  return divContainer;
}

function addNewLayer() {
  //Adds a new layer selector
  document.getElementById("layer-menu").appendChild(generateLayerSelectors(document.querySelectorAll(".layer").length+1));
  // Add event listener for layer selector
  var layer = document.getElementById("layer-"+document.querySelectorAll(".layer").length);
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
      };
    },
    false
  );
}

function relPathToAbs(sRelPath) {
  var nUpLn, sDir = "", sPath = location.pathname.replace(/[^\/]*$/, sRelPath.replace(/(\/|^)(?:\.?\/+)+/g, "$1"));
  for (var nEnd, nStart = 0; nEnd = sPath.indexOf("/../", nStart), nEnd > -1; nStart = nEnd + nUpLn) {
    nUpLn = /^\/(?:\.\.\/)*/.exec(sPath.slice(nEnd))[0].length;
    sDir = (sDir + sPath.substring(nStart, nEnd)).replace(new RegExp("(?:\\\/+[^\\\/]*){0," + ((nUpLn - 1) / 3) + "}$"), "/");
  }
  return sDir + sPath.substr(nStart);
}
