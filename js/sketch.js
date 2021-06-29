import { Box } from "./box.js";
import { Liquid } from "./liquid.js";
import { Arrow } from "./arrow.js";

const g = 9.81;
const FPS = 144;

const canvasWidth = document.body.clientWidth - 50;
const canvasHeight = 1.2 * document.body.clientHeight;

const liquidStartHeight = 0.65 * canvasHeight;

let canvas;
let liquid;
let boxes = [];

let liquidDensitySlider;
let boxDensitySlider;
let liquidResistanceSlider;

let liquidDensityText;
let boxDensityText;
let liquidResistanceText;
let boxHeightText;

const liquidDensity = 1;
const boxDensity = 0.3;
const liquidResistance = 500;

const initializeInfoTexts = () => {
  liquidDensityText = createP();
  boxDensityText = createP();
  liquidResistanceText = createP();
  boxHeightText = createP();
};

const initializeSliders = () => {
  liquidDensitySlider = createSlider(0, 10, liquidDensity, 0.1);
  liquidDensitySlider.style("width", "200px");

  boxDensitySlider = createSlider(0, 1, boxDensity, 0.05);
  boxDensitySlider.style("width", "200px");

  liquidResistanceSlider = createSlider(0, 5000, liquidResistance, 50);
  liquidResistanceSlider.style("width", "200px");
};

const setup = () => {
  frameRate(FPS);

  canvas = createCanvas(canvasWidth, canvasHeight);
  liquid = new Liquid(
    0,
    liquidStartHeight,
    width,
    canvasHeight - liquidStartHeight,
    liquidDensity
  );
  initializeInfoTexts();
  initializeSliders();
};

const draw = () => {
  background(255, 255, 255);

  let deltaTime = window.performance.now() - canvas._pInst._lastFrameTime;
  deltaTime *= 0.01;

  liquid.liquidDensity = liquidDensitySlider.value();
  liquid.display();

  for (const box of boxes) {
    box.density = boxDensitySlider.value();
    box.calculateMass();

    const gravityForce = box.mass * g;
    const gravityVector = new Arrow(
      box.position.x,
      box.position.y,
      gravityForce / box.mass,
      [255, 0, 0]
    );
    box.applyForce(createVector(0, gravityForce));

    let buoyantVector;
    let stokesVector;

    if (liquid.contains(box)) {
      const submergedVolume =
        box.width * box.width * liquid.calculateSubmergedHeight(box);

      const buoyantForce = liquid.liquidDensity * submergedVolume * g;
      buoyantVector = new Arrow(
        box.position.x,
        box.position.y,
        -buoyantForce / box.mass,
        [0, 255, 0]
      );
      box.applyForce(createVector(0, -buoyantForce));

      let stokesForce =
        -liquidResistanceSlider.value() * box.width * box.velocity.y;

      box.applyForce(createVector(0, stokesForce));

      if (Math.abs(stokesForce) < 0.00001) {
        stokesForce = 0;
      }

      stokesVector = new Arrow(
        box.position.x,
        box.position.y,
        stokesForce / box.mass,
        [0, 255, 255]
      );
    }

    box.update(deltaTime);
    box.collideWithWall(liquid);
    box.display();

    [gravityVector, buoyantVector, stokesVector].forEach((arrow) => {
      if (arrow) arrow.draw();
    });

    boxHeightText.html(
      `Position of the box above the liquid level: ${(
        liquidStartHeight - box.position.y
      ).toFixed(2)}`
    );
  }

  liquidDensityText.html(`Liquid density: ${liquidDensitySlider.value()}`);
  boxDensityText.html(`Box density: ${boxDensitySlider.value()}`);
  liquidResistanceText.html(
    `Liquid resistance coefficient: ${liquidResistanceSlider.value()}`
  );
};

const mousePressed = () => {
  if (mouseButton === LEFT) {
    if (mouseY < canvasHeight) {
      boxes.push(new Box(mouseX, mouseY, 150, 100, boxDensitySlider.value()));
    }
  }
};

window.setup = setup;
window.draw = draw;
window.mousePressed = mousePressed;
