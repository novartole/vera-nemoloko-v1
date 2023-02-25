import * as THREE from 'three';
import gsap from 'gsap';

import Expirience from "../../Expirience";

export default class Element {
  _expirience;
  _debug;
  _time;
  _resources;
  _scene;
  _world;

  _desiredPositionObject;
  
  _instance;
  get Instance() {
    return this._instance;
  }

  _isSelected;
  get IsSelected() {
    return this._isSelected;
  }

  _isHighLighted;
  get IsHighLighted() {
    return this._isHighLighted;
  }

  _isIntersected;
  get IsIntersected() {
    return this._isIntersected
  }

  _sectionIndex
  get SectionIndex() {
    return this._sectionIndex
  }

  _initPosition;
  get InitPosition() {
    return this._initPosition;
  }
  
  constructor() {
    this._expirience = new Expirience();

    this._debug = this._expirience.Debug;
    this._time = this._expirience.Time;
    this._resources = this._expirience.Resources;
    this._scene = this._expirience.Scene;
    this._world = this._expirience.World;

    this._setup();
    this._setElement();
  }

  _setup() {
    this._instance = null;

    this._isSelected = false;
    this._isHighLighted = false;
    this._isIntersected = false;
    this._sectionIndex = - 1;

    this._initPosition = new THREE.Vector3();
    this._desiredPositionObject = {
      position: null,
      needsHandling: false
    };
  }

  setInitPosition(position, needsUpdateCurrentPostion) {
    this._initPosition = position;

    if (needsUpdateCurrentPostion) {

      this.Instance.position.set(...this._initPosition);
      
    }
  }

  setDesiredPosition(position) {
    this._desiredPositionObject = {
      position,
      needsHandling: true
    };
  }

  _setElement() {
    if (this._instance === null) {

      throw Error('Element must be initialized');

    }

    this._scene.add(this.Instance);
  }

  update() {
    
  }

  onEnterSection() {
    gsap.to(
      this.Instance.rotation,
      {
          duration: 1.5,
          ease: 'power2.out',
          x: '+=6',
          y: '+=3',
          z: '+=1.5'
      }
    );
  }

  onIntersected() {
    this._isIntersected = true;

    if (this.IsSelected) {

      return;

    } 

    this._turnOnHighlighting();
  }

  onIntersectedOut() {
    this._isIntersected = false;

    if (this.IsSelected) {

      return;

    }

    this._turnOffHighlighting();
  }

  _turnOnHighlighting() {
    gsap.to(
      this.Instance.material,
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

  _turnOffHighlighting() {
    gsap.to(
      this.Instance.material,
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

  onExitSection() {
    
  }

  onScrollOut() {
    this._isSelected = !this.IsSelected;

    this._turnOffHighlighting();

    this.reachDesiredPosition();
  }

  reachDesiredPosition() {
    if (this._desiredPositionObject.needsHandling === false) {

      return;

    }

    const newPosition = this._desiredPositionObject.position;

    gsap.to(
      this.Instance.position,
      {
          duration: 2,
          ease: 'power2.inOut',
          x: newPosition.x,
          z: newPosition.z,
          onStart: () => {
            this._desiredPositionObject.position = null;
            this._desiredPositionObject.needsHandling = false;
          }
      }
    );
  }

  onClick() {
    this._isSelected = !this.IsSelected;

    this.reachDesiredPosition();
  }
}