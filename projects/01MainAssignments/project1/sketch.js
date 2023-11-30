let typedKey = '';
let font;
let pnts;

let spacing = 20;
let spaceWidth = 80;
let fontSize = 100;
let minFontSize = 50;
let maxFontSize = 400;
let lineSpacing = fontSize * 1.2;
let textW = 0;
let letterX = 50 + spacing;
let letterY = lineSpacing;

let stepSize = 2;
let danceFactor = 1;

let freeze = false;

function preload() {
  font = loadFont('data/BAUHS93.TTF'); 
  // font = loadFont('data/GILLUBCD.TTF'); 
}

function setup() {
  background(255,255,255);
	
	
  createCanvas(windowWidth, windowHeight);
  noLoop();
  // filter(POSTERIZE, 2);
  // blendMode(SCREEN);

  pnts = getPoints(typedKey);
}

function draw() {
	// background(255,255,255,0);
  background(0,0,0,0);
  if (!font) return;

 	noFill();
  // fill(255,0,0);
	
  push();

  translate(letterX, letterY);
  
  rotateFactor = 1;
  multFactor = frameCount%10;
  if (mouseButton == LEFT) rotateFactor = map(mouseX, 0, width, 0, -1);
  rotate(multFactor*0.5*radians(rotateFactor));
	console.log("rotateFactor: "+rotateFactor);

  danceFactor = 1;
  if (mouseButton == LEFT) danceFactor = map(mouseX, 0, width, 0, 3);

  
	// fontSize = 200;
	// if (mouseButton == TOP) danceFactor = map(mouseY, 0, height, 50, 400);


  if (pnts.length > 0) {
    for (let i = 0; i < pnts.length; i++) {
      pnts[i].x += random(-stepSize, stepSize) * danceFactor;
      pnts[i].y += random(-i*0.00005+stepSize, stepSize) * danceFactor;
    }
    push();
    strokeWeight(0.5*danceFactor);
    stroke(255,0,0);
    noFill();
    beginShape();
    for (let i = 0; i < pnts.length; i++) {
      vertex(pnts[i].x, pnts[i].y);
      stroke(255,0,0);
      fill(255,100,0);
      ellipse(pnts[i].x, pnts[i].y, 3+danceFactor*5, 3+danceFactor*5);
      stroke(255,0,0);
      noFill();
    }
    vertex(pnts[0].x, pnts[0].y);
    endShape();
  }
  pop();

  pop();
}

function getPoints() {
  let fontPath = font.textToPoints(typedKey, 0, 0, fontSize);
  textW = font.textBounds(typedKey, 0, 0, fontSize).w;

  return fontPath;
}

function keyPressed() {
  switch (keyCode) {
    case ENTER:
    case RETURN:
      typedKey = '';
      pnts = getPoints(typedKey);
      letterY += lineSpacing;
      letterX = 50;
      break;
    case BACKSPACE:
    case DELETE:
      background(0);
      typedKey = '';
      pnts = getPoints(typedKey);
      letterX = 50;
      letterY = lineSpacing;
      freeze = false;
      loop();
      break;
			case UP_ARROW:
      // Increase fontSize, but not exceeding the maximum
      fontSize = min(fontSize + 10, maxFontSize);
      pnts = getPoints(typedKey);
      loop();
      break;
    case DOWN_ARROW:
      // Decrease fontSize, but not going below the minimum
      fontSize = max(fontSize - 10, minFontSize);
      pnts = getPoints(typedKey);
      loop();
      break;
  }
}

function keyTyped() {
  if (keyCode >= 32) {
    if (keyCode == 32) {
      typedKey = '';
      letterX += textW + spaceWidth;
      pnts = getPoints(typedKey);
    } else {
      typedKey = key;
      letterX += textW + spacing;
      pnts = getPoints(typedKey);
    }
    freeze = false;
    loop();
  }
}
