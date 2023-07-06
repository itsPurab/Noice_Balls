/* eslint-disable require-yield, eqeqeq */

import {
  Sprite,
  Trigger,
  Watcher,
  Costume,
  Color,
  Sound
} from "https://unpkg.com/leopard@^1/dist/index.esm.js";

export default class Raytracer extends Sprite {
  constructor(...args) {
    super(...args);

    this.costumes = [
      new Costume("costume1", "./Raytracer/costumes/costume1.svg", {
        x: 364.75675675675666,
        y: 271.7606575997387
      })
    ];

    this.sounds = [new Sound("pop", "./Raytracer/sounds/pop.wav")];

    this.triggers = [
      new Trigger(Trigger.GREEN_FLAG, this.whenGreenFlagClicked)
    ];

    this.vars.resolution = 1;
    this.vars.rayx = 0.7071067811865475;
    this.vars.rayy = 0.7071067811865475;
    this.vars.rayz = 0;
    this.vars.centerx = 111.44738919312336;
    this.vars.centery = 10.472194254468349;
    this.vars.centerz = -12.865047879430437;
    this.vars.distance = 156.23127537978425;
    this.vars.nearestdistance = 3.0971273051751993;
    this.vars.spherex = 38.55261080687664;
    this.vars.spherey = 9.527805745531651;
    this.vars.spherez = 92.86504787943043;
    this.vars.dot = 10.472194254468349;
    this.vars.length = 10200.999999999995;
    this.vars.near = 30.900861281306625;
    this.vars.objectcolor = 17;
    this.vars.normalx = -0.36362611087189234;
    this.vars.normaly = -0.0733780602584425;
    this.vars.normalz = -0.9286504787943044;
    this.vars.dotdir = 0.7071067811865475;
    this.vars.interceptx = 111.44738919312336;
    this.vars.intercepty = 10.472194254468349;
    this.vars.interceptz = -12.865047879430437;
    this.vars.lightx = 0.7071067811865475;
    this.vars.lighty = 0.7071067811865475;
    this.vars.lightz = 0;
    this.vars.shade = 0;
    this.vars.reflectionx = -0.45012977458106385;
    this.vars.reflectiony = -0.6435980602786362;
    this.vars.reflectionz = 0.619003007134196;
    this.vars.phong = 7.257065452694395e-13;
    this.vars.lightdistance = 70.71067811865476;
    this.vars.ambient = 0;
  }

  *raytracePoint() {
    this.vars.centerx = 0;
    this.vars.centery = 0;
    this.vars.centerz = -100;
    this.vars.rayx = this.x;
    this.vars.rayy = this.y;
    this.vars.rayz = -1 * this.toNumber(this.vars.centerz);
    this.vars.distance = Math.sqrt(
      this.toNumber(this.vars.rayx) * this.toNumber(this.vars.rayx) +
        (this.toNumber(this.vars.rayy) * this.toNumber(this.vars.rayy) +
          this.toNumber(this.vars.rayz) * this.toNumber(this.vars.rayz))
    );
    this.vars.rayx =
      this.toNumber(this.vars.rayx) / this.toNumber(this.vars.distance);
    this.vars.rayy =
      this.toNumber(this.vars.rayy) / this.toNumber(this.vars.distance);
    this.vars.rayz =
      this.toNumber(this.vars.rayz) / this.toNumber(this.vars.distance);
    this.vars.nearestdistance = 10000;
    this.warp(this.calculateDistances)();
    if (this.compare(this.vars.nearestdistance, 10000) < 0) {
      this.penColor = Color.rgb(255, 0, 0);
      this.penColor.h = this.toNumber(this.vars.objectcolor);
      this.vars.interceptx =
        this.toNumber(this.vars.centerx) +
        this.toNumber(this.vars.rayx) *
          this.toNumber(this.vars.nearestdistance) +
        this.toNumber(this.vars.normalx);
      this.vars.intercepty =
        this.toNumber(this.vars.centery) +
        this.toNumber(this.vars.rayy) *
          this.toNumber(this.vars.nearestdistance) +
        this.toNumber(this.vars.normaly);
      this.vars.interceptz =
        this.toNumber(this.vars.centerz) +
        this.toNumber(this.vars.rayz) *
          this.toNumber(this.vars.nearestdistance) +
        this.toNumber(this.vars.normalz);
      this.vars.lightx = 50 - this.toNumber(this.vars.centerx);
      this.vars.lighty = 50 - this.toNumber(this.vars.centery);
      this.vars.lightz = -100 - this.toNumber(this.vars.centerz);
      this.vars.distance = Math.sqrt(
        this.toNumber(this.vars.lightx) * this.toNumber(this.vars.lightx) +
          (this.toNumber(this.vars.lighty) * this.toNumber(this.vars.lighty) +
            this.toNumber(this.vars.lightz) * this.toNumber(this.vars.lightz))
      );
      this.vars.lightx =
        this.toNumber(this.vars.lightx) / this.toNumber(this.vars.distance);
      this.vars.lighty =
        this.toNumber(this.vars.lighty) / this.toNumber(this.vars.distance);
      this.vars.lightz =
        this.toNumber(this.vars.lightz) / this.toNumber(this.vars.distance);
      this.vars.dot =
        this.toNumber(this.vars.normalx) * this.toNumber(this.vars.lightx) +
        this.toNumber(this.vars.normaly) * this.toNumber(this.vars.lighty) +
        this.toNumber(this.vars.normalz) * this.toNumber(this.vars.lightz);
      this.vars.shade = this.vars.dot;
      if (this.compare(this.vars.shade, 0) < 0) {
        this.vars.shade = 0;
      }
      this.vars.reflectionx =
        2 * (this.toNumber(this.vars.normalx) * this.toNumber(this.vars.dot)) -
        this.toNumber(this.vars.lightx);
      this.vars.reflectiony =
        2 * (this.toNumber(this.vars.normaly) * this.toNumber(this.vars.dot)) -
        this.toNumber(this.vars.lighty);
      this.vars.reflectionz =
        2 * (this.toNumber(this.vars.normalz) * this.toNumber(this.vars.dot)) -
        this.toNumber(this.vars.lightz);
      this.vars.dot =
        -1 *
        (this.toNumber(this.vars.reflectionx) * this.toNumber(this.vars.rayx) +
          this.toNumber(this.vars.reflectiony) * this.toNumber(this.vars.rayy) +
          this.toNumber(this.vars.reflectionz) * this.toNumber(this.vars.rayz));
      if (this.compare(this.vars.dot, 0) > 0) {
        this.vars.phong =
          Math.E ** (7 * Math.log(this.toNumber(this.vars.dot)));
      } else {
        this.vars.phong = 0;
      }
      this.vars.centerx = this.vars.interceptx;
      this.vars.centery = this.vars.intercepty;
      this.vars.centerz = this.vars.interceptz;
      this.vars.rayx = this.vars.lightx;
      this.vars.rayy = this.vars.lighty;
      this.vars.rayz = this.vars.lightz;
      this.vars.nearestdistance = this.vars.distance;
      this.vars.lightdistance = this.vars.distance;
      this.warp(this.calculateDistances)();
      if (
        this.compare(this.vars.nearestdistance, this.vars.lightdistance) === 0
      ) {
        this.vars.shade =
          this.toNumber(this.vars.ambient) +
          (this.toNumber(this.vars.phong) +
            0.5 * this.toNumber(this.vars.shade));
        if (this.compare(this.vars.shade, 1) > 0) {
          this.vars.shade = 100;
        } else {
          this.vars.shade = 100 * this.toNumber(this.vars.shade);
        }
      } else {
        this.vars.shade = 100 * this.toNumber(this.vars.ambient);
      }
      if (this.compare(this.vars.shade, 50) > 0) {
        this.penColor.s =
          16 + Math.floor(1.68 * (100 - this.toNumber(this.vars.shade)));
        this.penColor.v = 100;
      } else {
        this.penColor.s = 100;
        this.penColor.v =
          14 + Math.floor(1.68 * this.toNumber(this.vars.shade));
      }
    } else {
      this.penColor = Color.rgb(0, 0, 0);
    }
    this.penDown = true;
    this.penDown = false;
  }

  *calculateDistances() {
    this.warp(this.sphereDistance)(-150, 20, 80, 100, this.stage.vars.color1);
    this.warp(this.sphereDistance)(150, 20, 80, 100, this.stage.vars.color2);
    this.warp(this.planeDistance)(
      0,
      1,
      0,
      100,
      (this.toNumber(this.stage.vars.color1) +
        this.toNumber(this.stage.vars.color2)) /
        2
    );
  }

  *sphereDistance(x, y, z, radius, color) {
    this.vars.spherex = this.toNumber(x) - this.toNumber(this.vars.centerx);
    this.vars.spherey = this.toNumber(y) - this.toNumber(this.vars.centery);
    this.vars.spherez = this.toNumber(z) - this.toNumber(this.vars.centerz);
    this.vars.dot =
      this.toNumber(this.vars.spherex) * this.toNumber(this.vars.rayx) +
      this.toNumber(this.vars.spherey) * this.toNumber(this.vars.rayy) +
      this.toNumber(this.vars.spherez) * this.toNumber(this.vars.rayz);
    this.vars.length =
      this.toNumber(this.vars.spherex) * this.toNumber(this.vars.spherex) +
      this.toNumber(this.vars.spherey) * this.toNumber(this.vars.spherey) +
      this.toNumber(this.vars.spherez) * this.toNumber(this.vars.spherez);
    if (
      this.compare(this.vars.dot, 0) > 0 &&
      this.compare(
        this.toNumber(this.vars.length) -
          this.toNumber(this.vars.dot) * this.toNumber(this.vars.dot),
        this.toNumber(radius) * this.toNumber(radius)
      ) < 0
    ) {
      this.vars.near = Math.sqrt(
        this.toNumber(radius) * this.toNumber(radius) -
          (this.toNumber(this.vars.length) -
            this.toNumber(this.vars.dot) * this.toNumber(this.vars.dot))
      );
      if (
        this.compare(
          this.vars.length,
          this.toNumber(radius) * this.toNumber(radius)
        ) > 0 &&
        this.compare(
          this.toNumber(this.vars.dot) - this.toNumber(this.vars.near),
          this.vars.nearestdistance
        ) < 0
      ) {
        this.vars.nearestdistance =
          this.toNumber(this.vars.dot) - this.toNumber(this.vars.near);
        this.vars.objectcolor = color;
        this.vars.normalx =
          this.toNumber(this.vars.centerx) +
          this.toNumber(this.vars.rayx) *
            this.toNumber(this.vars.nearestdistance) -
          this.toNumber(x);
        this.vars.normaly =
          this.toNumber(this.vars.centery) +
          this.toNumber(this.vars.rayy) *
            this.toNumber(this.vars.nearestdistance) -
          this.toNumber(y);
        this.vars.normalz =
          this.toNumber(this.vars.centerz) +
          this.toNumber(this.vars.rayz) *
            this.toNumber(this.vars.nearestdistance) -
          this.toNumber(z);
        this.vars.distance = Math.sqrt(
          this.toNumber(this.vars.normalx) * this.toNumber(this.vars.normalx) +
            (this.toNumber(this.vars.normaly) *
              this.toNumber(this.vars.normaly) +
              this.toNumber(this.vars.normalz) *
                this.toNumber(this.vars.normalz))
        );
        this.vars.normalx =
          this.toNumber(this.vars.normalx) / this.toNumber(this.vars.distance);
        this.vars.normaly =
          this.toNumber(this.vars.normaly) / this.toNumber(this.vars.distance);
        this.vars.normalz =
          this.toNumber(this.vars.normalz) / this.toNumber(this.vars.distance);
      }
    }
  }

  *planeDistance(normalx, normaly, normalz, distance, color) {
    this.vars.dotdir =
      this.toNumber(normalx) * this.toNumber(this.vars.rayx) +
      this.toNumber(normaly) * this.toNumber(this.vars.rayy) +
      this.toNumber(normalz) * this.toNumber(this.vars.rayz);
    this.vars.dot =
      this.toNumber(normalx) * this.toNumber(this.vars.centerx) +
      this.toNumber(normaly) * this.toNumber(this.vars.centery) +
      this.toNumber(normalz) * this.toNumber(this.vars.centerz);
    this.vars.distance =
      (this.toNumber(this.vars.dot) + this.toNumber(distance)) /
      this.toNumber(this.vars.dotdir);
    if (
      !(this.toNumber(this.vars.dotdir) === 0) &&
      this.compare(this.vars.distance, 0) < 0 &&
        this.compare(
          -1 * this.toNumber(this.vars.distance),
          this.vars.nearestdistance
        ) < 0
    ) {
      this.vars.nearestdistance = -1 * this.toNumber(this.vars.distance);
      this.vars.objectcolor = color;
      this.vars.normalx = normalx;
      this.vars.normaly = normaly;
      this.vars.normalz = normalz;
    }
  }

  *whenGreenFlagClicked() {
    this.vars.ambient = 0;
    this.clearPen();
    this.vars.resolution = 1;
    this.penSize = this.toNumber(this.vars.resolution);
    this.y = -180;
    for (let i = 0; i < 360 / this.toNumber(this.vars.resolution); i++) {
      this.x = -240;
      for (let i = 0; i < 480 / this.toNumber(this.vars.resolution); i++) {
        yield* this.raytracePoint();
        this.x += this.toNumber(this.vars.resolution);
        yield;
      }
      this.y += this.toNumber(this.vars.resolution);
      yield;
    }
  }
}
