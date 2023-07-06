import { Project } from "https://unpkg.com/leopard@^1/dist/index.esm.js";

import Stage from "./Stage/Stage.js";
import Raytracer from "./Raytracer/Raytracer.js";

const stage = new Stage({ costumeNumber: 1 });

const sprites = {
  Raytracer: new Raytracer({
    x: 128,
    y: 12,
    direction: 90,
    costumeNumber: 1,
    size: 27000,
    visible: false,
    layerOrder: 1
  })
};

const project = new Project(stage, sprites, {
  frameRate: 250 // Set to 60 to make your project run faster
});
export default project;
