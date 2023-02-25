import * as THREE from 'three';

import Expirience from "../../Expirience";

export default class Plane {
  #expirience;
  #scene;
  #debug;

  #instance;
  get Instance() {
    return this.#instance;
  }

  #initPosition;
  get InitPosition() {
    return this.#initPosition;
  }

  constructor() {
    this.#expirience = new Expirience();
    
    this.#scene = this.#expirience.Scene;
    this.#debug = this.#expirience.Debug;


    this.#setModel();
  }

  #setup() {
    this.#initPosition = new THREE.Vector3();
  }

  #setModel() {
    const model = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 1, 1),
      new THREE.MeshToonMaterial()
    );

    // add rotation

    this.#instance = model;

    this.#scene.add(this.#instance);
    
    if (this.#debug.Active) {
      const debugFolder = this.#debug.UI.addFolder('Weclome container');

      debugFolder.add(model.position, 'y')
        .min(0)
        .max(10)
        .step(0.001);
    }
  }

  onScrollOut() {}

  onIntersected() {}

  onIntersectedOut() {}

  onClick() {}

  update() {}
}