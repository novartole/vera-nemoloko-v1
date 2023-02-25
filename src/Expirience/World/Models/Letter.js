import * as THREE from 'three';

import Expirience from "../../Expirience.js";

export default class Letter {
  static Symbols = {
    V: 0,
    E_0: 1,
    R: 2,
    A: 3,
    N: 4,
    // E_1: 5,
    M: 6,
    O_0: 7,
    L: 8,
    O_1: 9,
    K: 10,
    O_2: 11
  }

  _expirience;
  _resources;
  _scene;

  _instance;
  get Instance() {
    return this._instance;
  }

  _initPosition;
  #symbol;

  constructor(symbol) {
    this._expirience = new Expirience();

    this._scene = this._expirience.Scene;

    this._resources = this._expirience.Resources;

    this.#symbol = symbol;

    this.#setup();
    this._setModel();
  }

  #setup() {
    this._initPosition = new THREE.Vector3(
      0,
      Math.random() * 2,
      Math.random() * 2
    );
  }

  _setModel() {
    this._instance.material.transparent = true;

    this._scene.add(this._instance);
  }

  #getPosition(symbol) {

    switch (symbol) {
      case Letter.Symbols.V:
        return new THREE.Vector3(-7.5, 0, 0);

      case Letter.Symbols.E_0:
        return new THREE.Vector3(-6, 0, 0);

      case Letter.Symbols.R:
        return new THREE.Vector3(-4.5, 0, 0);

      case Letter.Symbols.A:
        return new THREE.Vector3(-3, 0, 0);

      case Letter.Symbols.N:
        return new THREE.Vector3(-1.5, 0, 0);

      case Letter.Symbols.M:
        return new THREE.Vector3(0, 0, 0);

      case Letter.Symbols.O_0:
        return new THREE.Vector3(1.5, 0, 0);

      case Letter.Symbols.L:
        return new THREE.Vector3(3, 0, 0);

      case Letter.Symbols.O_1:
        return new THREE.Vector3(4.5, 0, 0);

      case Letter.Symbols.K:
        return new THREE.Vector3(6, 0, 0);

      case Letter.Symbols.O_2:
        return new THREE.Vector3(7.5, 0, 0);
    
      default:
        break;
    }
  }

  #getResourceItem(symbol) {
    switch (symbol) {
      case Letter.Symbols.V:
        return this._resources.Items.v_letter;

      case Letter.Symbols.E_0:
        return this._resources.Items.e0_letter;

      case Letter.Symbols.R:
        return this._resources.Items.r_letter;

      case Letter.Symbols.A:
        return this._resources.Items.a_letter;

      case Letter.Symbols.N:
        return this._resources.Items.n_letter;

      case Letter.Symbols.M:
        return this._resources.Items.m_letter;

      case Letter.Symbols.O_0:
        return this._resources.Items.o0_letter;

      case Letter.Symbols.L:
        return this._resources.Items.l_letter;

      case Letter.Symbols.O_1:
        return this._resources.Items.o1_letter;

      case Letter.Symbols.K:
        return this._resources.Items.k_letter;

      case Letter.Symbols.O_2:
        return this._resources.Items.o2_letter;
    
      default:
        break;
    }
  }
}