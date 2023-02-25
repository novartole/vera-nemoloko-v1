import * as THREE from 'three';

import Element from '../Models/Element';

export default class Knot extends Element {
  #randomness;

  constructor() {
    super();

    this.#setup();
  }

  #setup() {
    this.#randomness = Math.random();
  }

  _setElement() {
    const model = new THREE.Mesh(
      new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16),
      new THREE.MeshToonMaterial({ 
        color: new THREE.Color('#ffeded'),
        transparent: true,
        opacity: 0.5,
        gradientMap: this._resources.Items.testModelTexture
      })
    );

    this._instance = model;

    super._setElement();
  }

  update() {
    super.update();

    this.Instance.rotation.x += 0.003 * this._time.Delta * this.#randomness * 0.5;
    this.Instance.rotation.y += 0.003 * this._time.Delta * this.#randomness * 0.5;
  }
}