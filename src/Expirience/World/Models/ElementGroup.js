import * as THREE from 'three';
import gsap from 'gsap';

import Element from "./Element.js";

export default class ElementGroup extends Element {
  _raycaster;
  _camera;

  _initRotationSpeed;
  _speedBooster;
  _boostInitializer;

  _radiusFromGroupCenter;

  _items;
  get Items() {
    return this._items;
  }

  constructor() {
    super();

    this._raycaster = this._expirience.Raycaster;
    this._camera = this._expirience.Camera;

    this.#setup();
    this._setItems()
  }

  #setup() {
    this._initRotationSpeed = Math.random() * 0.5;
    this._boostInitializer = null;
    this._speedBooster = 1;

    this._radiusFromGroupCenter = 2;
  }

  _setElement() {
    const group = new THREE.Group();

    this._instance = group;

    super._setElement();
  }

  _setItems() {
    this._items = [];
  }

  _calculateItemPostion(index) {
    return new THREE.Vector3(
      this._radiusFromGroupCenter * Math.cos(Math.PI + index * 2 * Math.PI / this.Items.length), 
      0, 
      this._radiusFromGroupCenter * Math.sin(Math.PI + index * 2 * Math.PI / this.Items.length), 
    )
  }

  _turnOnHighlighting() {
    for (const model of this.Items) {
      gsap.to(
        model.Instance.material,
        {
          duration: 1,
          ease: 'power2.inOut',
          opacity: 1,
          onComplete: () => {
  
            this._isHighLighted = true;
  
          }
        }
      );
    }
  }

  _turnOffHighlighting() {
    for (const model of this.Items) {
      gsap.to(
        model.Instance.material,
        {
          duration: 1,
          ease: 'power2.inOut',
          opacity: this._world.BaseModelMaterialOpacity,
          onComplete: () => {
  
            this._isHighLighted = false;
  
          }
        }
      );
    }
  }

  onIntersected() {
    super.onIntersected();

    if (this.IsSelected === false) {
 
      return;

    }

    if (this._boostInitializer === null) {

      this._boostInitializer = this._getItemByModel(this._raycaster.ItersectedObject.object);

    }
  }

  onScrollOut() {
    super.onScrollOut();

    if (this._boostInitializer !== null) {
      this._speedBooster = 1;
      this._boostInitializer = null
    } 
  }

  update() {
    super.update();

    for (const model of this.Items) {

      model.update();

    }

    this._speedBooster = this.#calculateSpeedBooster();
  }

  _getItemByModel(model) {
    return this.Items.find(item => item.Instance === model);
  }

  #needsToBoostGroupRotation() {
    if (this._boostInitializer === null) {

      return false;

    }

    const distanceToGroup = this._camera.Instance.position.distanceTo(this.Instance.position);
    const speedBooster = this._boostInitializer;
    const speedBoosterModelPostionAfterRotation = speedBooster.Instance.position
      .clone()
      .applyEuler(new THREE.Euler(
        this.Instance.rotation.x,
        this.Instance.rotation.y,
        this.Instance.rotation.z
      ));
    const speedBoosterModelGlobalPostion = this.Instance.position
      .clone()
      .add(speedBoosterModelPostionAfterRotation);

    const distanceToSpeedBoosterModel = this._camera.Instance.position.distanceTo(speedBoosterModelGlobalPostion);
    const reliefDistance = distanceToGroup - this._radiusFromGroupCenter * 0.1;

    const shouldBoostBeOn = distanceToSpeedBoosterModel > reliefDistance;

    if (shouldBoostBeOn === false) {

      this._boostInitializer = null;

    }
    
    return shouldBoostBeOn === true;
  }

  #calculateSpeedBooster() {
    let speedBooster = this._speedBooster;

    const isBoostOn = this.#needsToBoostGroupRotation();
    if (isBoostOn) {

      speedBooster += 0.05;
      
    } else if (speedBooster === 1) {

      return speedBooster;

    } else {
      if (speedBooster - 1 > 0.001) {

        speedBooster -= 0.1;

      } else {

        speedBooster = 1;

      }
    }

    return speedBooster;
  }

  onEnterSection() {
    for (const model of this.Items) {

      model.onEnterSection();
      
    }
  }
}