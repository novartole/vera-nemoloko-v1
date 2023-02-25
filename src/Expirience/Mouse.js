import * as THREE from 'three';

import Expirience from "./Expirience";

export default class Mouse extends EventTarget {
  static EVENT_NAME__ON_SCROLL = 'scroll';
  static EVENT_NAME__ON_CLICK = 'click';
  static EVENT_NAME__ON_MOUSE_MOVE= 'mousemove';

  #expirience;
  #sizes;

  #coursor;
  get Coursor() {
    return this.#coursor;
  }

  #scrollY;
  get ScrollY() {
    return this.#scrollY;
  }

  constructor() {
    super();

    this.#expirience = new Expirience();

    this.#sizes = this.#expirience.Sizes;

    this.#setup();
  }

  #setupEvents() {
    window.addEventListener('mousemove', event => {
      this.Coursor.position.set(
        event.clientX / this.#sizes.Width - 0.5,
        event.clientY / this.#sizes.Height - 0.5
      );

      this.dispatchEvent( new CustomEvent(Mouse.EVENT_NAME__ON_MOUSE_MOVE) );
    });

    window.addEventListener('scroll', () => {
      this.#scrollY = window.scrollY;
      
      this.dispatchEvent( new CustomEvent(Mouse.EVENT_NAME__ON_SCROLL) );
    });

    window.addEventListener('click', () => {

      this.dispatchEvent( new CustomEvent(Mouse.EVENT_NAME__ON_CLICK) );

    });
  }

  #setup() {
    this.#coursor = {
      position: new THREE.Vector2(0, 0)
    };

    this.#scrollY = window.scrollY;


    this.#setupEvents();
  }
}