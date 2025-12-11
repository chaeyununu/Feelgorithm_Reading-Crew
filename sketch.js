window.showLogo = false;
window.customStyle = 'emotional';
const topicMap = { science:0, literature:1, art:2, philosophy:3, psychology:4 };
window.colorSetIndex = topicMap.science;
window.customTopic = 'science';
window.customMood  = 'calm';
let gradOffset = 0;
let logoScale = 1;
let targetLogoScale = 1;
let centerX = 510;
let centerY = 320;
let radius = 90;
let isHovered = false;
let particles = [];
let leafRotation = 0;
let targetRotation = 0;
let isClicked = false;
let lineOffset = 0;
let targetLineOffset = 0;

const colorSets = [
  ["#0B63C5", "rgba(88, 255, 226, 0.23)", "#5A6FFF"],
 ["#D47A68","rgba(165, 60, 90, 0.23)","rgba(255, 165, 185, 0.78)"],
  ["#FF6EC7","rgba(170, 255, 240, 0.28)","#3A0CA3"],
 ["#5F4B8B", "rgba(180, 255, 200, 0.23)", "#4B5A6F"],
["#C9B2C7", "rgba(180, 255, 250, 0.23)", "#507BAF"]
];

let hoverScales = {
  top: 1,
  bottom: 1
};



function setup() {
  createCanvas(800, 800) .parent('canvas-container');
   let saveBtn = createButton("📸");
  saveBtn.position(10, 10);
  saveBtn.mousePressed(() =>        saveCanvas('feelgorithm_logo', 'png'));
  select('canvas').hide();
  textFont('Sora');
  textSize(100);
  textAlign(CENTER);
  frameRate(30);
}

function draw() {
   if (!window.showLogo) return;      
  select('canvas').show();          

  background(0);
  gradOffset = (gradOffset + 0.01) % TWO_PI;
  if (window.showLogo) { 
  push();
  translate(width / 2, height / 2);
  scale(logoScale); 
  translate(-width / 2, -height / 2);

  updateLeafHover();
  updateLeafRotation();
  updateLineOffset();
  drawStaticElements();
  drawLogo();
  drawText();

  if (window.customStyle === "emotional") {
    drawBlush();
  }
  if (window.customStyle === "idea") {
    drawIdeaLines();
  }

  pop();
 

  drawParticles(); 
  drawTopLeaf();
  drawBottomLeaf();
  logoScale = lerp(logoScale, targetLogoScale, 0.01);
}
}

function updateLeafHover() {
  let dTop = dist(mouseX, mouseY, 305, 290);
  let targetTop = dTop < 50 ? 1.3 : 1.0;
  if (window.customStyle === "emotional") targetTop = dTop < 50 ? 1.6 : 1.0;
  hoverScales.top = lerp(hoverScales.top, targetTop, 0.05);

  let dBottom = dist(mouseX, mouseY, 230, 500);
  let targetBottom = dBottom < 50 ? 1.3 : 1.0;
  if (window.customStyle === "emotional") targetBottom = dBottom < 50 ? 1.6 : 1.0;
  hoverScales.bottom = lerp(hoverScales.bottom, targetBottom, 0.05);
}

function updateLeafRotation() {
  leafRotation = lerp(leafRotation, targetRotation, 0.08);
}

function updateLineOffset() {
  const goingOutSpeed = 0.033;  
  const returningSpeed = 0.1;  
  let speed = targetLineOffset < lineOffset ? goingOutSpeed : returningSpeed;
  lineOffset = lerp(lineOffset, targetLineOffset, speed);

}

function drawStaticElements() {
  push();
  noFill();
  translate(39, -40);
  scale(0.92);
  strokeWeight(window.customStyle === "listener" ? 15 : 19);
  stroke(currentColorSet()[0]);

  beginShape();
  vertex(246.5, 193.5);
  bezierVertex(221.667, 203.5, 171.6, 237.9, 170, 295.5);
  bezierVertex(168.4, 353.1, 201, 389.167, 217.5, 400);
  vertex(487.5, 400);
  bezierVertex(511.333, 400.5, 564.4, 415.8, 586, 473);
  bezierVertex(613, 544.5, 571.5, 588.5, 541, 611.5);
  endShape();

 if (window.customStyle === "logical") {
  noFill();
  stroke(255);   
  strokeWeight(19); 


  push();
  translate(255 + 30, 229 + 30); 
  rotate(radians(30));           
  rect(0, 0, 60, 60, 20);
  pop();

  rect(213, 450, 60, 60, 20);
    beginShape();
  vertex(271, 397.5);
  bezierVertex(266.333, 386.333, 260.4, 358, 274, 334);
  endShape();

  line(228.6 - lineOffset, 450, 570, 450);
  stroke(currentColorSet()[0]);
  line(294, 188, 547, 190);
    
} else {
    push();
   stroke(255);
  strokeWeight(window.customStyle === "listener" ? 13 : 19);
  
  beginShape();
  vertex(271, 397.5);
  bezierVertex(266.333, 386.333, 260.4, 358, 274, 334);
  endShape();

  line(228.6 - lineOffset, 450, 570, 450);
  stroke(currentColorSet()[0]);
  strokeWeight(window.customStyle === "listener" ? 15 : 18);
  line(294, 188, 547, 190);
    translate(305, 290);
    scale(hoverScales.top);
    translate(-305, -290);
  strokeWeight(window.customStyle === "listener" ? 13 : 18);
  stroke(255);
    beginShape();
    vertex(274, 334);
    bezierVertex(271.667, 311.167, 280.9, 262.2, 336.5, 249);
    bezierVertex(341.167, 267.167, 335.2, 309.6, 274, 334);
    endShape(CLOSE);
    stroke(255);
    beginShape();
    vertex(275.5, 333.5);
    bezierVertex(264, 311, 284.9, 254.9, 342.5, 242.5);
    bezierVertex(347, 266.833, 337.1, 321.1, 275.5, 333.5);
    endShape(CLOSE);
  
    pop();
    push();
   stroke(255);
    translate(230, 500);
    rotate(leafRotation);
    scale(hoverScales.bottom);
    translate(-230, -500);
    beginShape();
    vertex(222, 459);
    bezierVertex(232.333, 473.5, 246.8, 511.3, 222, 546.5);
    bezierVertex(209.833, 533.667, 192.8, 498.2, 222, 459);
    endShape(CLOSE);
    beginShape();
    vertex(222.5, 458);
    bezierVertex(237, 473.167, 257.3, 511.8, 222.5, 545);
    bezierVertex(207.167, 531.333, 185.7, 494.8, 222.5, 458);
    endShape(CLOSE);
    pop();
  }
 
 
  stroke(currentColorSet()[0]);
  strokeWeight(window.customStyle === "listener" ? 15 : 19);
  beginShape();
  vertex(246.5, 193.5);
  bezierVertex(221.667, 203.5, 171.6, 237.9, 170, 295.5);
  bezierVertex(168.4, 353.1, 201, 389.167, 217.5, 400);
  vertex(487.5, 400);
  bezierVertex(511.333, 400.5, 564.4, 415.8, 586, 473);
  bezierVertex(613, 544.5, 571.5, 588.5, 541, 611.5);
  endShape();
 strokeWeight(window.customStyle === "listener" ? 14 : 18);
  
  ellipse(272, 185, 40, 40);
  ellipse(521.5, 623, 40, 40);
  pop();
}

function drawIdeaLines() {
  let glowX = 195;
  let glowY = 147.9;
  let glowR = 3 + sin(frameCount * 0.1) * 19;

  drawRadialGradient(glowX, glowY, glowR,
    color(255, 255, 100, 120), color(255, 255, 100, 0));
stroke(255);
  strokeWeight(3);

  let cx = 196;
  let cy = 148;
  let radius = 30;     
  let length = 12;    
  let count = 7;

  for (let i = 0; i < count; i++) {
    let angle = TWO_PI * i / count;
    let x1 = cx + cos(angle) * radius;
    let y1 = cy + sin(angle) * radius;
    let x2 = cx + cos(angle) * (radius + length);
    let y2 = cy + sin(angle) * (radius + length);
    line(x1, y1, x2, y2);
  }
 
}

function drawBlush() {
  
  noStroke();

  let leftX = 300 - 48;
  let leftY = 170 + 42;
  let leftR = 55 + sin(frameCount * 0.05) * 5;

  let rightX = 97 + 52;
  let rightY = 435 + 38;
  let rightR = 40 + cos(frameCount * 0.05) * 5;

  drawRadialGradient(leftX, leftY, leftR,
    color(255, 120, 100, 40), color(255, 180, 200, 10));
    
  drawRadialGradient(rightX, rightY, rightR,
    color(255, 120, 100, 40), color(255, 180, 200, 10));
  
}
function drawRadialGradient(x, y, r, innerCol, outerCol) {
  for (let i = r; i > 0; i--) {
    let inter = map(i, 0, r, 0, 1);
    let c = lerpColor(innerCol, outerCol, inter);
    fill(c);
    ellipse(x, y, i * 2);
  }
}

function drawLogo() {
  translate(94, -18);
  let ctx = drawingContext;
  ctx.save();
  ctx.lineJoin = "round";

  let time = frameCount * 0.01;
  let strengthMultiplier = window.customMood === "calm" ? 0.5 : window.customMood === "energetic" ? 2 : 1;

  let x1 = 510 + sin(gradOffset * 2.5) * 20;
  let y1 = 180 + cos(gradOffset * 2.5) * 20;
  let x2 = 580 + cos(gradOffset * 2.5) * 20;
  let y2 = 320 + sin(gradOffset * 2.5) * 20;
  let grad = ctx.createLinearGradient(x1, y1, x2, y2);
  grad.addColorStop(0.02, currentColorSet()[0]);
  grad.addColorStop(0.8, currentColorSet()[1]);
  grad.addColorStop(0.2, currentColorSet()[2]);
  ctx.fillStyle = grad;
  ctx.globalAlpha = 0.95 + sin(frameCount * 0.15) * 0.1;

  ctx.scale(1.1 * logoScale, 1.1 * logoScale);
  ctx.translate(-105, -45);

  for (let offset = -3; offset <= 3; offset++) {
    let t = frameCount * 0.025 + offset * 0.4;
    let noiseFactorTop = 0.4;
    let noiseFactorMidBottom = 1.5;
    let noiseWeight = map(offset, -3, 3, 0, 1);
    let strength = lerp(noiseFactorTop, noiseFactorMidBottom, noiseWeight) * strengthMultiplier;

   let noiseX = noise(t) * 12 * strength - 6 * strength;
let noiseY = noise(t + 10) * 12 * strength - 6 * strength;

    ctx.beginPath();
    ctx.moveTo(438 + 90.87 + offset + noiseX, 175 + 88 + noiseY);
    ctx.bezierCurveTo(438 + 64.34 + offset + noiseX, 175 + 110.85 + noiseY, 438 + 29.37 + offset + noiseX, 175 + 157.5 + noiseY, 438 + 58.37 + offset + noiseX, 175 + 187 + noiseY);
    ctx.bezierCurveTo(438 + 28 + offset + noiseX, 175 + 182 + noiseY, 438 + 18 + offset + noiseX, 175 + 172 + noiseY, 438 + 10 + offset + noiseX, 175 + 150 + noiseY);
    ctx.bezierCurveTo(438 + -10.63 + offset + noiseX, 175 + 80.5 + noiseY, 438 + 75.37 + offset + noiseX, 185 + 54.5 + noiseY, 452 + 60.37 + offset + noiseX, 175 + 1 + noiseY);
    ctx.bezierCurveTo(440 + 107.37 + offset + noiseX, 175 + 18 + noiseY, 438 + 126.87 + offset + noiseX, 175 + 57 + noiseY, 438 + 90.87 + offset + noiseX, 175 + 88 + noiseY);
    ctx.closePath();
    ctx.fill();
  }

  ctx.restore();
}

function drawText() {
  fill(255);
  noStroke();
  text("Feelgorithm", width / 2.65, height - 90);
}

function mouseMoved() {
  let d = dist(mouseX, mouseY, centerX, centerY);
  isHovered = d < radius;
}

function mousePressed() { targetLogoScale = 1.06; 
  targetRotation = -PI / -6;    
  targetLineOffset = -60;
  
}

function mouseReleased() {
  isClicked = false;
  targetRotation = 0;
  targetLineOffset = 0;
  targetLogoScale = 1;
}
function drawTopLeaf() {
  if (window.customStyle === "logical") return;

  push();
  noFill(); 
  translate(39, -40);
  scale(0.92);
  translate(305, 290);
  scale(hoverScales.top);
  translate(-305, -290);
  stroke(255);
  strokeWeight(window.customStyle === "listener" ? 13 : 19);

  beginShape();
  vertex(274, 334);
  bezierVertex(271.667, 311.167, 280.9, 262.2, 336.5, 249);
  bezierVertex(341.167, 267.167, 335.2, 309.6, 274, 334);
  endShape(CLOSE);

  beginShape();
  vertex(275.5, 333.5);
  bezierVertex(264, 311, 284.9, 254.9, 342.5, 242.5);
  bezierVertex(347, 266.833, 337.1, 321.1, 275.5, 333.5);
  endShape(CLOSE);
  pop();
}

function drawBottomLeaf() {
  if (window.customStyle === "logical") return;

  push();
  noFill(); 
  translate(39, -40);
  scale(0.92);
  translate(230, 500);
  rotate(leafRotation);
  scale(hoverScales.bottom);
  translate(-230, -500);
  stroke(255);
  strokeWeight(window.customStyle === "listener" ? 13 : 19);

  beginShape();
  vertex(222, 459);
  bezierVertex(232.333, 473.5, 246.8, 511.3, 222, 546.5);
  bezierVertex(209.833, 533.667, 192.8, 498.2, 222, 459);
  endShape(CLOSE);

  beginShape();
  vertex(222.5, 458);
  bezierVertex(237, 473.167, 257.3, 511.8, 222.5, 545);
  bezierVertex(207.167, 531.333, 185.7, 494.8, 222.5, 458);
  endShape(CLOSE);
  pop();
}


function currentColorSet() {
  window.colorSetIndex = topicMap[window.customTopic];
  return colorSets[window.colorSetIndex];
}

function drawParticles() {
  if (frameCount % 2 === 0) {
    let p = {
      x: mouseX + random(-10, 10),
      y: mouseY + random(-10, 10),
      vx: random(-0.5, 0.5),
      vy: random(-1, -3),
      size: random(1, 3),
      alpha: 255,
      color: color(random(200, 255), random(200, 255), 255, 200)
    };
    particles.push(p);
  }

  for (let i = particles.length - 1; i >= 0; i--) {
    let p = particles[i];
    noStroke();
    fill(p.color.levels[0], p.color.levels[1], p.color.levels[2], p.alpha);
    ellipse(p.x, p.y, p.size);
    p.x += p.vx;
    p.y += p.vy;
    p.alpha -= 3;
    if (p.alpha <= 0) {
      particles.splice(i, 1);
    }
  }
}

