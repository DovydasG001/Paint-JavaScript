class Layer {
  constructor(width, height, visibility) {
    this.width = width;
    this.height = height;
    this.layerPixels = new Array(this.width * this.height);
    this.visibility = visibility;
    this.fillLayer(visibility);
  }

  fillLayer(visibility) {
    for (var row = 0; row < this.height; row++) {
      for (var column = 0; column < this.width; column++) {
        this.layerPixels[(row * this.width) + column] = new Pixel(visibility);
      }
    }
  }

  // Getters
  getWidth() {
    return this.width;
  }

  getHeight() {
    return this.height;
  }

  getVisibility() {
    return this.visibility;
  }

  // Setters
  setVisibility(visibility) {
    this.visibility = visibility;
  }

  // Computed Getters
  getPixelAt(x, y) {
    return this.layerPixels[(y * this.width) + x];
  }

}
