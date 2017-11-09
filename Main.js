function draw() {
  var canvas = document.getElementById('canvas');

  if (canvas.getContext) {
    var context = canvas.getContext('2d');

    var newLayer = new Layer(100, 100);
    var view = new View("FFFFFF", newLayer, canvas);
    var toolController = new ToolController(view, newLayer, canvas);
    var mouseController = new MouseController(toolController, canvas, view);
    View.paintLayer(context, newLayer, view.pixelSize);

    console.log("So far so good");

  } else {
    window.alert("Browser does not support <canvas>");
  }
}
