import * as THREE from 'three';

import Expirience from "./Expirience.js";

export default class Renderer {
  #expirience;
  #sizes;
  #scene;
  #camera;
  #canvas;

  #instance;
  get Instance() {
    return this.#instance;
  }

  constructor() {
    this.#expirience = new Expirience();

    this.#canvas = this.#expirience.Canvas;
    this.#sizes = this.#expirience.Sizes;
    this.#scene = this.#expirience.Scene;
    this.#camera = this.#expirience.Camera;

    this.#setInstance();
  }

  #setInstance() {
    const renderer = new THREE.WebGLRenderer({
      canvas: this.#canvas,
      alpha: true
    });

    renderer.setSize(this.#sizes.Width, this.#sizes.Height);
    renderer.setPixelRatio(this.#sizes.PixelRatio);

    this.#instance = renderer;
  }

  
  resize() {
    this.Instance.setSize(this.#sizes.Width, this.#sizes.Height);
    this.Instance.setPixelRatio(this.#sizes.PixelRatio);
  }

  update() {
    this.Instance.render(this.#scene, this.#camera.Instance);
  }
}