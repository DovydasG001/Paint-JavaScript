function draw() {
  var canvas = document.getElementById('canvas');

  if (canvas.getContext) {
    var context = canvas.getContext('2d');

    var newLayer = new Layer(100, 100);
    var view = new View("255, 255, 255, 255");
    var mouseController = new MouseController(canvas, newLayer, view);
    View.paintLayer(context, newLayer, view.pixelSize);

    console.log("So far so good");

  } else {
    window.alert("Browser does not support <canvas>");
  }
}
