let centerCircle;
let particles = [];
let factor = 0;
let cursor;

function preload() {
  cursor = loadImage('data/cursor.png');
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  centerCircle = new Circle(width / 2, height/2-500, 50, color(255));
}

function draw() {
  background(255);

  noCursor();

  // Draw and update the center circle
  centerCircle.display();
  centerCircle.update();

  // Emit particles
  if (frameCount % 10 === 0) {
    centerCircle.emitParticles();
  }

  // Draw and update particles
  for (let i = particles.length - 1; i >= 0; i--) {
    particles[i].display();
    particles[i].update();

    // Remove particles if they are out of the canvas
    if (particles[i].isOutOfCanvas()) {
      particles.splice(i, 1);
    }
  }

  //calculate the angle that is wanted and the a
  let centerX = width / 2;
  let centerY = height / 2-500;

  // Get the cursor position
  let cursorX = mouseX;
  let cursorY = mouseY;

  // Calculate the angle between the cursor and the center
  let cursorAngle = atan2(cursorY - centerY, cursorX - centerX);
  cursorAngle = degrees(cursorAngle); // Convert radians to degrees

  // Normalize the angles to be within [0, 360)
  cursorAngle = (cursorAngle + 360) % 360;

  // Define the angle range
  let startAngle = 60;
  let endAngle = 120;

  // Check if the cursor is in the specified angle range
  let isInAngleRange = isCursorInAngleRange(cursorAngle, startAngle, endAngle);

  // Draw a circle at the center
  // fill(255, 0, 0);
  // ellipse(centerX, centerY, 10, 10);

  // Draw a line from the center to the cursor
  // line(centerX, centerY, cursorX, cursorY);

  // Display the result
  // textSize(16);
  // fill(0);
  // text(`Is cursor in angle range? ${isInAngleRange}`, 10, height - 20);



  // if mouse position is in a certain range between the two angles
  // factor += 0.1;
  
  if (isInAngleRange){
    factor += 5;
  }
  else{
    factor = 0;
  }
  // circle(mouseX, mouseY+factor, 50,50);

  //if the mouse is in out of the range
  // circle(mouseX, mouseY+factor, 15,15);
  

  //button click me
  push()
  translate(width/2-65,height/2-350);
  fill(255,0,0);
  rect(0, 0,120,40,10);
  textSize(16);
  fill(255);
  text(`Unsubscribe`, 15, 25);
  pop();
  console.log("bool: "+factor);

  image(cursor,mouseX, mouseY+factor,20,20);
}

function isCursorInAngleRange(cursorAngle, startAngle, endAngle) {
  // Normalize angles to be within [0, 360)
  cursorAngle = (cursorAngle + 360) % 360;
  startAngle = (startAngle + 360) % 360;
  endAngle = (endAngle + 360) % 360;

  // Check if the cursor angle is within the specified range
  return startAngle <= cursorAngle && cursorAngle <= endAngle;
}

class Circle {
  constructor(x, y, radius, col) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.col = col;
    this.angleRange = {
      min: radians(120),
      max: radians(60),
    };
  }

  display() {
    fill(this.col);
    noStroke();
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
  }

  update() {
    // Update circle properties if needed
  }

  emitParticles() {
    let particleCount = 10;
    let angleStep = (this.angleRange.max - this.angleRange.min) / particleCount;

    for (let i = 0; i < particleCount; i++) {
      let angle = this.angleRange.min + i * angleStep;
      let particle = new Particle(this.x, this.y, angle);
      particles.push(particle);
    }
  }
}

class Particle {
  constructor(x, y, angle) {
    this.x = x;
    this.y = y;
    this.radius = 5;
    this.angle = angle;
    this.speed = random(1, 5);
    this.gravity = 0.1;
  }

  display() {
    // fill(255, 200, 0); // Yellow color
    push();
    stroke(0);
    ellipse(this.x, this.y, this.radius * 2, this.radius * 2);
    pop();
  }

  update() {
    this.x += this.speed * cos(this.angle);
    this.y += this.speed * sin(this.angle);
    this.speed += this.gravity;
  }

  isOutOfCanvas() {
    return this.y > height + this.radius;
  }
}
