class Pixel {
  constructor(visibility) {
    this.DISABLED_COLOR = "#000000";
    this.ENABLED_COLOR = "#000080";
    this.currentColor = this.ENABLED_COLOR;
    this.visible = visibility;
  }
}

// Getters
Pixel.prototype.getColor = function() {
  return this.currentColor;
};

Pixel.prototype.getVisibility = function() {
  return this.visible;
};

// Setters
Pixel.prototype.setColor = function(color) {
  this.currentColor = color;
};

Pixel.prototype.changeVisibility = function(visibility) {
  this.visible = visibility;
};
