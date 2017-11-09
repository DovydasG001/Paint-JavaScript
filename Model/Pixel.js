class Pixel {
  constructor() {
    this.DISABLED_COLOR = "#000000";
    this.ENABLED_COLOR = "#000080";
    this.currentColor = this.ENABLED_COLOR;
  }
}

// Getters
Pixel.prototype.getColor = function() {
  return this.currentColor;
};

// Setters
Pixel.prototype.setColor = function(Color) {
  this.currentColor = Color;
};
