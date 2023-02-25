import * as THREE from 'three';

import Expirience from "./Expirience.js";

export default class Raycaster extends EventTarget {
  static EVENT_NAME__ON_AFTER_ENTERED = 'onAfterEntered';
  static EVENT_NAME__ON_BEFORE_LEAVED = 'onBeforeLeaved';

  #expirience;
  #mouse;
  #camera;

  #objectsToIntersect;

  #itersectedObject;
  get ItersectedObject() {
    return this.#itersectedObject;
  }

  constructor() {
    super();

    this.#expirience = new Expirience();

    this.#mouse = this.#expirience.Mouse;
    this.#camera = this.#expirience.Camera;

    this.#setup();
    this.#setInstance()
  }

  #setup() {
    this.#objectsToIntersect = new Set();

    this.#itersectedObject = null;
  }

  #setInstance() {
    const raycaster = new THREE.Raycaster();

    this.instance = raycaster;
  }


  setObjectToIntersect(object) {
    this.#objectsToIntersect.add(object);
  }

  update() {
    const coursor = {
      x: this.#mouse.Coursor.position.x * 2,
      y: - this.#mouse.Coursor.position.y * 2
    };

    this.instance.setFromCamera(coursor, this.#camera.Instance);

    if (this.#objectsToIntersect.size > 0) {
      const objs = [];
      for (const obj of this.#objectsToIntersect) {

        objs.push(obj);
        
      }

      const intersections = this.instance.intersectObjects(objs);
      
      if (intersections.length > 0) {
        if (this.ItersectedObject === null) {
          this.#itersectedObject = intersections[0];

          this.dispatchEvent( new CustomEvent(Raycaster.EVENT_NAME__ON_AFTER_ENTERED) );
        }
      } else {
        if (this.ItersectedObject !== null) {
          this.dispatchEvent( new CustomEvent(Raycaster.EVENT_NAME__ON_BEFORE_LEAVED) );
          
          this.#itersectedObject = null;
        }
      }
    } 
  }
}