
//example code from https://p5js.org/examples/simulate-forces.html

var Liquid = function(x, y, w, h, c) {
  this.x = x;
  this.y = y;
  this.w = w;
  this.h = h;
  this.c = c;
};

// Is the Mover in the Liquid?
Liquid.prototype.contains = function(m) {
  var l = m.position;
  return l.x > this.x && l.x < this.x + this.w &&
    l.y > this.y && l.y < this.y + this.h;
};

// Calculate drag force
Liquid.prototype.calculateDrag = function(m) {
  // Magnitude is coefficient * speed squared
  var speed = m.velocity.mag();
  var dragMagnitude = this.c * speed * speed;

  // Direction is inverse of velocity
  var dragForce = m.velocity.copy();
  dragForce.mult(-1);

  // Scale according to magnitude
  // dragForce.setMag(dragMagnitude);
  dragForce.normalize();
  dragForce.mult(dragMagnitude);
  return dragForce;
};

Liquid.prototype.display = function() {
  noStroke();
  fill(50);
  rect(this.x, this.y, this.w, this.h);
};

function Mover(m,x,y) {
  this.mass = m;
  this.position = createVector(x,y);
  this.velocity = createVector(0,0);
  this.acceleration = createVector(0,0);
}

// Newton's 2nd law: F = M * A
// or A = F / M
Mover.prototype.applyForce = function(force) {
  var f = p5.Vector.div(force,this.mass);
  this.acceleration.add(f);
};

Mover.prototype.update = function() {
  // Velocity changes according to acceleration
  this.velocity.add(this.acceleration);
  // position changes by velocity
  this.position.add(this.velocity);
  // We must clear acceleration each frame
  this.acceleration.mult(0);
};

Mover.prototype.display = function() {
  stroke(0);
  strokeWeight(2);
  fill(255,255);
  ellipse(this.position.x,this.position.y,this.mass*16,this.mass*16);
};

// Bounce off bottom of window
Mover.prototype.checkEdges = function() {
  if (this.position.y > (height - this.mass*8)) {
    // A little dampening when hitting the bottom
    this.velocity.y *= -0.9;
    this.position.y = (height - this.mass*8);
  }
};
