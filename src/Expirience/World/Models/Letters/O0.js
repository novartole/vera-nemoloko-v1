import * as THREE from 'three';

import Letter from "../Letter.js";

export default class O0_Letter extends Letter {
  constructor() {
    super(Letter.Symbols.o0);

    this.#setup();
  }

  #setup() {
    
  }

  _setModel() {
    const model = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 32, 32),
      new THREE.MeshBasicMaterial({
        map: this._resources.Items.o0_letter
      })
    );

    this._initPosition.x = 2.25;

    model.position.set(...this._initPosition);

    this._instance = model;

    super._setModel();
  }

  update() {}

  onScroll() {}

  onClick() {}

  onEnterSection() {}

  onExitSection() {}

  OnIntersected() {}

  OnIntersectedOut() {}
}