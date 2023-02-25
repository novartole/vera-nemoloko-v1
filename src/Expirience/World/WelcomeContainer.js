import * as THREE from 'three';

import Expirience from "../Expirience.js";
import Letter from './Models/Letter.js';
import A_Letter from './Models/Letters/A.js';
import E0_Letter from './Models/Letters/E0.js';
import K_Letter from './Models/Letters/K.js';
import L_Letter from './Models/Letters/L.js';
import M_Letter from './Models/Letters/M.js';
import N_Letter from './Models/Letters/N.js';
import O0_Letter from './Models/Letters/O0.js';
import O1_Letter from './Models/Letters/O1.js';
import O2_Letter from './Models/Letters/O2.js';
import R_Letter from './Models/Letters/R.js';
import V_Letter from './Models/Letters/V.js';

export default class WelcomeContainer {
  #expirience;
  #debug;
  #scene;
  #mouse;

  #items;
  #group;

  #lastScrollValue;

  #scrollDirections;

  constructor() {
    this.#expirience = new Expirience();

    this.#debug = this.#expirience.Debug;
    this.#scene = this.#expirience.Scene;
    this.#mouse = this.#expirience.Mouse;

    this.#setup();
    this.#setModels();
  }

  #setup() {
    const group = new THREE.Group();

    group.position.y = 7;
    group.rotation.y = 0.28 * Math.PI;

    this.#group = group;

    this.#scene.add(this.#group);

    this.#items = [];

    this.#lastScrollValue = this.#mouse.scrollY;
    this.#scrollDirections = {
      UP: 0,
      DOWN: 1
    }
  }

  #setModels() {
    let letter = new V_Letter();
    this.#group.add(letter.Instance);

    letter = new E0_Letter();
    this.#group.add(letter.Instance);

    letter = new R_Letter();
    this.#group.add(letter.Instance);

    letter = new A_Letter();
    this.#group.add(letter.Instance);

    letter = new N_Letter();
    this.#group.add(letter.Instance);

    letter = new E0_Letter();
    letter.Instance.position.x = -0.75;
    this.#group.add(letter.Instance);

    letter = new M_Letter();
    this.#group.add(letter.Instance);

    letter = new O0_Letter();
    this.#group.add(letter.Instance);

    letter = new L_Letter();
    this.#group.add(letter.Instance);

    letter = new O1_Letter();
    this.#group.add(letter.Instance);

    letter = new K_Letter();
    this.#group.add(letter.Instance);

    letter = new O2_Letter();
    this.#group.add(letter.Instance);

    
    if (this.#debug.Active) {
      const debugFolder = this.#debug.UI.addFolder('Letters');

      debugFolder
        .add(this.#group.position, 'x')
        .min(0)
        .max(10)
        .step(0.01)
        .name('group pos: X');

      debugFolder
        .add(this.#group.position, 'y')
        .min(0)
        .max(10)
        .step(0.01)
        .name('group pos: Y');

      debugFolder
        .add(this.#group.position, 'z')
        .min(0)
        .max(10)
        .step(0.01)
        .name('group pos: Z');

        debugFolder
        .add(this.#group.rotation, 'x')
        .min(0)
        .max(10)
        .step(0.001)
        .name('group rot: around X');

      debugFolder
        .add(this.#group.rotation, 'y')
        .min(0)
        .max(10)
        .step(0.001)
        .name('group rot: around Y');

      debugFolder
        .add(this.#group.rotation, 'z')
        .min(0)
        .max(10)
        .step(0.001)
        .name('group rot: around Z');
    }
  }

  #getScrollDirection() {
    const currentScrollValue = this.#mouse.ScrollY;
    
    return currentScrollValue > this.#lastScrollValue ? 
      this.#scrollDirections.DOWN : this.#scrollDirections.UP;
  }

  onScroll() {
    const scrollDirection = this.#getScrollDirection();

    this.#lastScrollValue = this.#mouse.ScrollY;

    if (scrollDirection === this.#scrollDirections.DOWN) {

      //this.#group.position.y += 0.1;

    } else if (scrollDirection === this.#scrollDirections.UP) {

      //this.#group.position.y -= 0.1;

    }
  }
}