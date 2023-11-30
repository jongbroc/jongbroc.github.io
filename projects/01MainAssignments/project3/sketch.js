let circleY;
let lineX;
let draggingCircle = false;
let factor = 0
let combination = 0;
let cursor;
let cursorPosY;
let mouseFactor = 0;
let timer = 0;

function preload() {
  cursor = loadImage('data/cursor.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  noCursor();
  noStroke();
  lineX = width/2;
  linePos1 = 300;
  linePos2 = 700;
  circleY = linePos2
  size = 100;
  
}

function draw() {
  background(map(circleY,linePos1,linePos2,50,255));

  // Draw line
  // stroke(0);
  // strokeWeight(2);
  push();
  stroke(100);
  strokeWeight(20);
  fill(100)
  rect(lineX-size/2,linePos1-size/2,size,linePos2-linePos1+size,size);
  stroke(220);
  strokeWeight(70);
  line(width/2, linePos1, lineX, combination);
  pop();
  
  cursorPosY = mouseY+mouseFactor;
  // map(circleY, linePos1, linePos2,200,0);
  combination = circleY+mouseFactor;

  if(combination<=linePos2){
  factor += map(circleY, linePos1, linePos2, 5, 0);
  mouseFactor += factor;
  }
  else{
    factor = 0;
    if(factor == 0 && timer<500){
      
      timer = 0
      timer++
      
      mouseFactor = map(circleY, linePos1, linePos2, 1, 0);
    }
    circleY = linePos2;
  }

  
  
  
  
  // factor += 5;
  
  // Draw circle
 
  fill(220);
  stroke(100)
  strokeWeight(10);
  ellipse(width/2, combination, size, size);

  // Display value
  // fill(0);
  // textSize(20);
  // text("Value: " + int(map(circleY, 50, 150, 100, 0)), 10, 30);
  // text("CircleY: " + circleY+" factor: "+factor, 10, 60);
  // text("CircleY: " + circleY+" factor: "+factor+" mFac: "+mouseFactor, 10, 60);
  
  
  image(cursor,mouseX, cursorPosY,20,20);
    
}

function mousePressed() {
  let d = dist(mouseX, mouseY, width/2, combination);
  if (d < size/2) {
    draggingCircle = true;

  }
}

function mouseReleased() {
  draggingCircle = false;
}

function mouseDragged() {
  if (draggingCircle) {
    circleY = constrain(mouseY, linePos1, linePos2);
    factor = 0;
  }
}