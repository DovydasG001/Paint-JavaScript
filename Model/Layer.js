class Layer {
  constructor(width, height) {
    this.width = width;
    this.height = height;
    this.layerPixels = new Array(this.width * this.height);
    this.fillLayer();
  }

  fillLayer() {
    for (var row = 0; row < this.height; row++) {
      for (var column = 0; column < this.width; column++) {
        this.layerPixels[(row * this.width) + column] = new Pixel();
      }
    }
  }

  // Getters
  getWidth(){
    return this.width;
  }

  getHeight(){
    return this.height;
    //return 1;
  }

  // Computed Getters
  getPixelAt(x, y) {
    return this.layerPixels[(y * this.width) + x];
  }

}
