class Model {
  constructor(pictureWidth, pictureHeight) {
    this.pictureWidth = pictureWidth;
    this.pictureHeight = pictureHeight;
    this.brusColor = "FFFFFF";
    this.pixelSize = 1;
    this.activeLayerNr = 0;
    this.layerCount = 0;
    this.currentTool = "pencil-tool";
    this.layer = [];
  }

  setCurrentTool(toolName) {
    this.currentTool = toolName;
  }

  addNewLayer(layer) {
    this.layerCount++;
    this.layer.push(layer);
    this.activeLayerNr = this.layerCount - 1;
  }

  getActiveLayer() {
    return this.layer[this.activeLayerNr];
  }

  getLayer(number) {
    return this.layer[number];
  }

  setActiveLayerNr(number) {
    this.activeLayerNr = number;
  }

}
