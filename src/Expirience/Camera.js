import * as THREE from 'three';

import Expirience from "./Expirience.js";

export default class Camera {
  #expirience;
  #debug;
  #sizes;
  #mouse;
  #time;
  #scene;
  #world;

  #weclomSectionParameters;
  #itemsSectionParameters;

  _distanceToOY;

  #debugFolder;

  #instance;
  get Instance() {
    return this.#instance;
  }

  #group;
  get Group() {
    return this.#group;
  }

  constructor() {
    this.#expirience = new Expirience();
    
    this.#debug = this.#expirience.Debug;
    this.#sizes = this.#expirience.Sizes;
    this.#mouse = this.#expirience.Mouse;
    this.#time = this.#expirience.Time;
    this.#scene = this.#expirience.Scene;
    this.#world = null;

    this.#setup();
    this.#setInstance();
  }

  onAfterWorldModelsMounted() {
    this.#world = this.#expirience.World;

    this.#weclomSectionParameters = {
      
    }

    this.#itemsSectionParameters = {
      itemsCount: this.#world.ItemsCount,
      heightOffset: this.#world.getItemsContainerHeightOffset()
    };
  }

  #setup() {
    this._distanceToOY = 15;
    this._radiusFactor = 0;

    this._parallaxFactor = 0.003;

    if (this.#debug.Active) {
      const debugFolder = this.#debug.UI.addFolder('Camera');

      debugFolder
        .add(this, '_distanceToOY')
        .min(0)
        .max(30)
        .step(0.01)
        .name('distance: camera-OY')
        .onChange(value => {

          this.Instance.position.z = value;
          
        });

      debugFolder
        .add(this, '_parallaxFactor')
        .min(0)
        .max(0.01)
        .step(0.001)
        .name('parallax factor');

      debugFolder
        .add(this, '_radiusFactor')
        .min(0)
        .max(2)
        .step(0.001)
        .name('radius factor');

      this.#debugFolder = debugFolder;
    }
  }

  #setInstance()
  {
    const camera = new THREE.PerspectiveCamera(
      35, 
      this.#sizes.Width / this.#sizes.Height, 
      0.1, 
      100
    );

    this.#instance = camera;


    const cameraGroup = new THREE.Group();
    cameraGroup.add(this.Instance);

    this.#group = cameraGroup;


    this.#scene.add(this.Group);
  }

  resize() {
    this.Instance.aspect = this.#sizes.Width / this.#sizes.Height;
    this.Instance.updateProjectionMatrix();

    this.#itemsSectionParameters.heightOffset = this.#world.getItemsContainerHeightOffset();
  }

  update() {
    if (
      this.#world === null 
      || this.#world.Ready === false
    ) {

      return;

    }

    const currentSectionType = this.#world.getCurrentSectionType();
    if (currentSectionType === this.#world.Types.WELCOME_CONTAINER) {
      const scrollY = this.#mouse.ScrollY - this.#itemsSectionParameters.heightOffset;
      const sizes = {
        height: this.#sizes.Height
      };
      const scrollProgress = scrollY / sizes.height * this.#world.DistanceBetweenObjects;
      const scrollProgressNormalized = this.#itemsSectionParameters.itemsCount === 1 ? 0 : scrollY / sizes.height / (this.#itemsSectionParameters.itemsCount - 1);
      const cameraDistanceToOY = (this._radiusFactor * scrollProgressNormalized + 1) * this._distanceToOY;

      // the same as for items
      // this.Instance.position.set(
      //   cameraDistanceToOY * Math.cos((2 * Math.PI) * (scrollY / sizes.height) / this.#itemsSectionParameters.itemsCount),
      //   - scrollProgress,
      //   - cameraDistanceToOY * Math.sin((2 * Math.PI) * (scrollY / sizes.height) / this.#itemsSectionParameters.itemsCount)
      // );

      // freezed up
       this.Instance.position.set(
        cameraDistanceToOY * Math.cos((2 * Math.PI) * (-this.#itemsSectionParameters.heightOffset * 0.5 / sizes.height) / this.#itemsSectionParameters.itemsCount),
        - scrollProgress,
        - cameraDistanceToOY * Math.sin((2 * Math.PI) * (-this.#itemsSectionParameters.heightOffset * 0.5 / sizes.height) / this.#itemsSectionParameters.itemsCount)
      );

      this.Instance.lookAt(new THREE.Vector3(0, - scrollProgress, 0));


      // move camera according to coursor moving
      const parallaxX = this.#mouse.Coursor.position.x;
      const parallaxY = - this.#mouse.Coursor.position.y;

      this.Group.position.x += 
        (parallaxX * Math.sin((2 * Math.PI) * (scrollY / sizes.height) / this.#itemsSectionParameters.itemsCount) - this.Group.position.x) *
        this.#time.Delta * 
        this._parallaxFactor;
      this.Group.position.y += 
        (parallaxY - this.Group.position.y) * 
        this.#time.Delta * 
        this._parallaxFactor;
      this.Group.position.z += 
        (parallaxX * Math.cos((2 * Math.PI) * (scrollY / sizes.height) / this.#itemsSectionParameters.itemsCount) - this.Group.position.z) *
        this.#time.Delta * 
        this._parallaxFactor;
    } else if (currentSectionType === this.#world.Types.ITEMS_CONTAINER) {
      // move camera according to scroll progress
      const scrollY = this.#mouse.ScrollY - this.#itemsSectionParameters.heightOffset;
      const sizes = {
        height: this.#sizes.Height
      };
      const scrollProgress = scrollY / sizes.height * this.#world.DistanceBetweenObjects;
      const scrollProgressNormalized = this.#itemsSectionParameters.itemsCount === 1 ? 0 : scrollY / sizes.height / (this.#itemsSectionParameters.itemsCount - 1);
      const cameraDistanceToOY = (this._radiusFactor * scrollProgressNormalized + 1) * this._distanceToOY;

      this.Instance.position.set(
        cameraDistanceToOY * Math.cos((2 * Math.PI) * (scrollY / sizes.height) / this.#itemsSectionParameters.itemsCount),
        - scrollProgress,
        - cameraDistanceToOY * Math.sin((2 * Math.PI) * (scrollY / sizes.height) / this.#itemsSectionParameters.itemsCount)
      );

      this.Instance.lookAt(new THREE.Vector3(0, - scrollProgress, 0));
      

      // move camera according to coursor moving
      const parallaxX = this.#mouse.Coursor.position.x;
      const parallaxY = - this.#mouse.Coursor.position.y;

      this.Group.position.x += 
        (parallaxX * Math.sin((2 * Math.PI) * (scrollY / sizes.height) / this.#itemsSectionParameters.itemsCount) - this.Group.position.x) *
        this.#time.Delta * 
        this._parallaxFactor;
      this.Group.position.y += 
        (parallaxY - this.Group.position.y) * 
        this.#time.Delta * 
        this._parallaxFactor;
      this.Group.position.z += 
        (parallaxX * Math.cos((2 * Math.PI) * (scrollY / sizes.height) / this.#itemsSectionParameters.itemsCount) - this.Group.position.z) *
        this.#time.Delta * 
        this._parallaxFactor;
    }
  }
}