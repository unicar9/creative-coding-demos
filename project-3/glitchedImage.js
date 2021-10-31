const maxXChange = 5;

class GlitchedImage {
  constructor(img, posX, posY, imgW, imgH) {
    this.posX = posX;
    this.posY = posY;
    this.imgW = imgW;
    this.imgH = imgH;
    this.img = img;
  }

  drawGlitch() {
    push();
    translate(this.posX, this.posY);
    let y = floor(random(this.imgH));
    let h = floor(random(5, 20));
    let xOffset = floor(random(-maxXChange, maxXChange));

    let sy = (y * this.img.width) / this.imgW;
    image(this.img, xOffset, y, this.imgW, h, 0, sy, this.img.width, h);
    pop();
  }
}
