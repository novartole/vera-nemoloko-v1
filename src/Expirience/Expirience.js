import * as THREE from 'three';

import Camera from './Camera.js';
import Renderer from './Renderer.js';
import sources from './sources.js';
import Mouse from './Mouse.js';
import Debug from './Utils/Debug.js';
import Resources from './Utils/Resources.js';
import Sizes from "./Utils/Sizes.js";
import Time from "./Utils/Time.js";
import World from './World/World.js';
import Raycaster from './Raycaster.js';

/**
 * TODO:
 * - title uses shaders
 * - git
 * - adjust particles
 * - background color change
 * - separate test model
 * - description file
 * - useful debug parameters
 * - change mouse
 */

let instance = null;

export default class Expirience {
  #debug;
  get Debug() {
    return this.#debug;
  }

  #sizes;
  get Sizes() {
    return this.#sizes;
  }

  #mouse;
  get Mouse() {
    return this.#mouse;
  }

  #time;
  get Time() {
    return this.#time;
  }

  #scene;
  get Scene() {
    return this.#scene;
  }

  #resources;
  get Resources() {
    return this.#resources;
  }

  #camera;
  get Camera() {
    return this.#camera;
  }

  #renderer;
  get Renderer() {
    return this.#renderer;
  }

  #raycaster;
  get Raycaster() {
    return this.#raycaster;
  }

  #world;
  get World() {
    return this.#world;
  }

  #canvas
  get Canvas() {
    return this.#canvas;
  }

  constructor(canvas) {
    // strange way to do singletone
    if (instance) {

      return instance;

    }

    instance = this;

    // global access, optional
    window.expirience = this;

    // options
    this.#canvas = canvas;

    this.#setup();
  }

  #setup() {
    this.#debug = new Debug();
    this.#sizes = new Sizes();
    this.#mouse = new Mouse();
    this.#time = new Time();
    this.#scene = new THREE.Scene();
    this.#resources = new Resources(sources);
    this.#camera = new Camera();
    this.#renderer = new Renderer();
    this.#raycaster = new Raycaster();
    this.#world = new World();

    this.#setupEvents();
  }

  /**
   * Private
   */
  #setupEvents() {
    this.Sizes.addEventListener(Sizes.EVENT_NAME__ON_RESIZE, () => {

      this.#onResize();

    });

    this.Time.addEventListener(Time.EVENT_NAME__ON_TICK, () => {

        this.#onUpdate();

    });

    this.Mouse.addEventListener(Mouse.EVENT_NAME__ON_SCROLL, () => {

        this.#onScroll();

    });

    this.Mouse.addEventListener(Mouse.EVENT_NAME__ON_CLICK, event => {

      this.#onClick(event);

    });

    this.Mouse.addEventListener(Mouse.EVENT_NAME__ON_MOUSE_MOVE, () => {

      this.#onMousemove();

    });

    this.World.addEventListener(World.EVENT_NAME__ON_AFTER_MODELS_MOUNTED, () => {

      this.#onAfterWorldModelsMounted();

    });

    this.Raycaster.addEventListener(Raycaster.EVENT_NAME__ON_AFTER_ENTERED, () => {

      this.#onRaycasterAfterObjectEntered();
      
    });

    this.Raycaster.addEventListener(Raycaster.EVENT_NAME__ON_BEFORE_LEAVED, () => {

      this.#onRaycasterBeforeObjectLeaved();
      
    });

    this.Resources.addEventListener(Resources.EVENT_NAME__ON_RESOURCES_LOADED, () => {

      this.#onResourcesLoaded();
      
    });
  }

  #onResourcesLoaded() {
    this.World.onResourcesLoaded();
  }

  #onRaycasterAfterObjectEntered() {
    this.World.onRaycasterAfterObjectEntered();
  }

  #onRaycasterBeforeObjectLeaved() {
    this.World.onRaycasterBeforeObjectLeaved();
  }

  #onAfterWorldModelsMounted() {
    this.Camera.onAfterWorldModelsMounted();
  }

  #onMousemove() {

  }

  #onClick(event) {
    this.World.onClick(event);
  }

  #onScroll() {
    this.World.onScroll();
  }

  #onResize() {
    this.Camera.resize();
    this.Renderer.resize();
  }

  #onUpdate() {
    this.Camera.update();
    this.World.update()
    this.Renderer.update();
    this.Raycaster.update();
  }
}