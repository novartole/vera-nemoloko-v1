import * as THREE from 'three'

import Expirience from "../Expirience.js";
import Environment from './Environment.js';
import Particles from './Particles.js';
import Sections from './Sections.js';

export default class World extends EventTarget {
  static EVENT_NAME__ON_AFTER_MODELS_MOUNTED = 'onBeforeModelsMounted';

  #expirience;
  #debug;
  #scene;
  #resources;
  #camera;
  #raycaster;

  #particles;

  #ringsContainer;

  #environment;

  #ready;
  get Ready() {
    return this.#ready;
  }

  #sections;

  get ItemsCount() {
    return this.#sections.ItemsCount;
  }

  get Types() {
    return this.#sections.Types;
  }

  get DistanceBetweenObjects() { 
    return this.#sections.DistanceBetweenObjects; 
  };

  get BaseModelMaterialOpacity() {
    return this.#sections.BaseModelMaterialOpacity;
  };

  get BaseModelMaterialColor() {
    return this.#sections.BaseModelMaterialColor;
  };

  constructor() {
    super();

    this.#expirience = new Expirience();

    this.#debug = this.#expirience.Debug;
    this.#scene = this.#expirience.Scene;
    this.#resources = this.#expirience.Resources;
    this.#camera = this.#expirience.Camera;
    this.#raycaster = this.#expirience.Raycaster;

    this.#setup();
  }

  getCurrentSectionType() {
    return this.#sections.getCurrentSectionType();
  }

  getItemsContainerHeightOffset() {
    return this.#sections.getItemsContainerHeightOffset();
  }

  #setup() {
    this.#sections = new Sections();

    this.#particles = null;

    this.#ready = false;
  }

  #setParticles() {
    this.#particles = new Particles();

    this.#sections.addEventListener(Sections.EVENT_NAME__ON_PARAMETER_CHANGE, () => {

      this.#particles.generateParicles();

    });
  }

  #setSections() {
    this.#sections.onResourcesLoaded();
  }

  onResourcesLoaded() {
    this.#setSections();

    this.dispatchEvent( new CustomEvent(World.EVENT_NAME__ON_AFTER_MODELS_MOUNTED) );

    this.#environment = new Environment();

    this.#setParticles();

    this.#ready = true;
  }

  onRaycasterAfterObjectEntered() {
    this.#sections.onRaycasterAfterObjectEntered();
  }

  onRaycasterBeforeObjectLeaved() {
    this.#sections.onRaycasterBeforeObjectLeaved();
  }

  update() {
    this.#sections.update();
  }

  onScroll() {
    this.#sections.onScroll();
  }

  onClick(event) {
    this.#sections.onClick(event);
  }
}