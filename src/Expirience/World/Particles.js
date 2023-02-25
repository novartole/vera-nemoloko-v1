import * as THREE from 'three';

import Expirience from "../Expirience.js";

export default class Particles {
  #expirience;
  #scene;
  #world;
  #debug;

  _count;
  _maxDistanceToOY;
  _size;
  _heightFactor;

  #itemsCount;
  
  #debugFolder;

  #particlesGeometry;
  #particlesMaterial;

  #instance;
  get Instance() {
    return this.#instance;
  }

  constructor() {
    this.#expirience = new Expirience();

    this.#scene = this.#expirience.Scene;
    this.#world = this.#expirience.World;
    this.#debug = this.#expirience.Debug;

    this.#setup();
    this.#setInstance();
  }

  #setInstance() {
    this.generateParicles();
  }

  #setup() {
    this.#instance = null;

    this._count = 2200;
    this._maxDistanceToOY = 20;
    this._size = 0.03;
    this._heightFactor = 1;

    this.#itemsCount = this.#world.ItemsCount;

    if (this.#debug.Active) {
      const debugFolder = this.#debug.UI.addFolder('Particles');

      debugFolder
        .add(this, '_count')
        .min(0)
        .max(20000)
        .step(1)
        .name('count')
        .onFinishChange(() => this.generateParicles());

      debugFolder
        .add(this, '_size')
        .min(0.001)
        .max(0.1)
        .step(0.001)
        .name('size')
        .onFinishChange(() => this.generateParicles());

      debugFolder
        .add(this, '_maxDistanceToOY')
        .min(1)
        .max(30)
        .name('max distance: paricle-OY')
        .onFinishChange(() => this.generateParicles());

      debugFolder
        .add(this, '_heightFactor')
        .min(1)
        .max(2)
        .name('height factor')
        .onFinishChange(() => this.generateParicles());

      this.#debugFolder = debugFolder;
    }
  }

  generateParicles() {
    if (this.Instance !== null) {
      this.#particlesGeometry.dispose();
      this.#particlesMaterial.dispose();
      this.#scene.remove(this.Instance);
    }

    const positions = new Float32Array(this._count * 3);
    let i3;
    for (let index = 0; index < this._count; index++) {
      i3 = index * 3;
      positions[i3    ] = (Math.random() - 0.5) * this._maxDistanceToOY * 2;
      positions[i3 + 1] = this._heightFactor *
        (this.#world.DistanceBetweenObjects 
        - 
        Math.random() * this.#world.DistanceBetweenObjects * (this.#itemsCount + 1));
      positions[i3 + 2] = (Math.random() - 0.5) * this._maxDistanceToOY * 2;
    };

    const particlesGeometry = new THREE.BufferGeometry();
    particlesGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    this.#particlesGeometry = particlesGeometry;

    const particlesMaterial = new THREE.PointsMaterial({ 
      color: this.#world.BaseModelMaterialColor, 
      size: this._size,
      sizeAttenuation: true
    });
    this.#particlesMaterial = particlesMaterial;

    this.#instance = new THREE.Points(
      this.#particlesGeometry,
      this.#particlesMaterial
    );

    this.#scene.add(this.Instance);
  }
}