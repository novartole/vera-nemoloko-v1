import * as THREE from 'three';

import Letter from "../Letter.js";

export default class M_Letter extends Letter {
  constructor() {
    super(Letter.Symbols.M);

    this.#setup();
  }

  #setup() {
    
  }

  _setModel() {
    const model = new THREE.Mesh(
      new THREE.PlaneGeometry(1, 1, 32, 32),
      new THREE.MeshBasicMaterial({
        map: this._resources.Items.m_letter
      })
    );

    this._initPosition.x = 0.75;

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