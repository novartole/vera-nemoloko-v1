import * as THREE from 'three';
import Expirience from "../Expirience";

export default class Environment {
  #expirience;
  #scene;

  #directionLight

  constructor() {
    this.#expirience = new Expirience();

    this.#scene = this.#expirience.Scene;

    this.#setDirectionLight();
  }

  #setDirectionLight() {
    const directionLight = new THREE.DirectionalLight('#ffffff', 1);
    directionLight.position.set(1, 1, 0);

    this.#directionLight = directionLight;

    this.#scene.add(this.#directionLight);
  }
}