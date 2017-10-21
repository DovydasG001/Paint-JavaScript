class Pixel {
  constructor() {
    this.DEFAULT_WIDTH = 1;
    this.DEFAULT_HEIGHT = 1;
    this.DISABLED_COLOR = {r:127, g:127, b:127, a:255};
    this.ENABLED_COLOR = {r:5, g:4, b:144, a:1};
    this.currentColor = this.ENABLED_COLOR;
  }

  // Getters
  getColor() {
    return this.currentColor;
  }

  // Computed Getters
  getColorString() {
    return 'rgba('+ this.currentColor.r + ', ' + this.currentColor.g + ', ' +
                 this.currentColor.b + ', ' + this.currentColor.a + ')';
  }

  // Setters
  setColor(Color) {
    this.currentColor = Color;
  }
}
