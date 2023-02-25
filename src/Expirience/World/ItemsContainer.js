import * as THREE from 'three';

import Expirience from '../Expirience.js';

export default class ItemsContainer extends EventTarget {
  static EVENT_NAME__ON_PARAMETER_CHANGE = 'onParameterChange';
  static EVENT_NAME__ON_ITEM_CLICK = 'onItemClick';
  static EVENT_NAME__ON_ITEM_SCROLLOUT = 'onItemScrollOut';

  #expirience;
  #debug;
  #sizes;
  #mouse;
  #camera;
  #raycaster;

  #sections;

  #elementTypes;

  #debuFolder;

  #items;

  _initItemDistanceToOY;
  _radiusFactor;

  _distanceBetweenObjects;
  get DistanceBetweenObjects() {
    return this._distanceBetweenObjects;
  }

  _baseModelMaterialOpacity;
  get BaseModelMaterialOpacity() {
    return this._baseModelMaterialOpacity;
  }

  _baseModelMaterialColor;
  get BaseModelMaterialColor() {
    return this._baseModelMaterialColor;
  }

  get Count() {
    return this.#items.length;
  }

  _deltaBetweenCameraPostionYAndItemPostionY;
  _itemMoveDistanceOnSelecting;

  constructor(sections) {
    super();

    this.#expirience = new Expirience();

    this.#debug = this.#expirience.Debug;
    this.#sizes = this.#expirience.Sizes;
    this.#mouse = this.#expirience.Mouse;
    this.#camera = this.#expirience.Camera;
    this.#raycaster = this.#expirience.Raycaster;

    this.#sections = sections;

    this.#setup();
  }

  [Symbol.iterator]() {
    let index = 0;

    return  {
      next: () => {
        if (index < this.#items.length) {
          let result = { 
            value: this.#items[index], 
            done: false 
          };

          index += 1;

          return result;
        }

        return { done: true };
      }
    }
  }

  #setup() {
    this.#elementTypes = {
      MODEL: 'model',
      MODEL_GROUP: 'modelGroup'
    }

    this.#items = [];

    this._initItemDistanceToOY = 4;
    this._radiusFactor = 0;

    this._distanceBetweenObjects = 7;

    this._baseModelMaterialOpacity = 0.5;
    this._baseModelMaterialColor = new THREE.Color('#ffeded');

    this._deltaBetweenCameraPostionYAndItemPostionY = 0.6;

    this._itemMoveDistanceOnSelecting = 3.5;

    if (this.#debug.Active) {
      const debugFolder = this.#debug.UI.addFolder('Rings container');
      const debugFolderModels = debugFolder.addFolder('Models');

      debugFolderModels
        .addColor(this, '_baseModelMaterialColor')
        .name('material color')
        .onChange(value => {
          for (const item of this) {
            if (item.type === this.#elementTypes.MODEL) {
              item.element.Instance.material.color = new THREE.Color(value);
              item.element.Instance.material.needsUpdate = true;
            } else if (item.type === this.#elementTypes.MODEL_GROUP) {
              for (const model of item.element.Items) {
                model.Instance.material.color = new THREE.Color(value);
                model.Instance.material.needsUpdate = true;
              }
            }
          }
        });

      debugFolderModels
        .add(this, '_baseModelMaterialOpacity')
        .min(0)
        .max(1)
        .step(0.001)
        .name('material opacity')
        .onChange(value => {
          for (const item of this) {
            if (item.type === this.#elementTypes.MODEL) {
              item.element.Instance.material.opacity = value;
              item.element.Instance.material.needsUpdate = true;
            } else if (item.type === this.#elementTypes.MODEL_GROUP) {
              for (const model of item.element.Items) {
                model.Instance.material.opacity = value;
                model.Instance.material.needsUpdate = true;
              }
            }
          }
        });

      debugFolder
        .add(this, '_distanceBetweenObjects')
        .min(0)
        .max(30)
        .step(0.01)
        .name('distance: item-item')
        .onFinishChange(value => {
          this.dispatchEvent( new CustomEvent(ItemsContainer.EVENT_NAME__ON_PARAMETER_CHANGE) );

          for (const item of this) {
            const newInitPosition = this.#calculateInitPosition(item.element.sectionIndex);
            item.element.setInitPosition(newInitPosition, true);
          }
        });

      debugFolder
        .add(this, '_initItemDistanceToOY')
        .min(0)
        .max(10)
        .step(0.01)
        .name('init distance: item-OY')
        .onFinishChange(value => {
          for (const item of this) {
            const newInitPosition = this.#calculateInitPosition(item.element.sectionIndex);
            item.element.setInitPosition(newInitPosition, true);
          }
        });

      debugFolder
        .add(this, '_radiusFactor')
        .min(0)
        .max(2)
        .step(0.001)
        .name('radius factor: item-OY')
        .onFinishChange(value => {
          for (const item of this) {
            const newInitPosition = this.#calculateInitPosition(item.element.sectionIndex);
            item.element.setInitPosition(newInitPosition, true);
          }
        });

      debugFolder
        .add(this, '_deltaBetweenCameraPostionYAndItemPostionY')
        .min(0)
        .max(10)
        .step(0.001)
        .name('delta: item->heightLighted')

      debugFolder
        .add(this, '_itemMoveDistanceOnSelecting')
        .min(0)
        .max(10)
        .step(0.001)
        .name('distance: item-item(moved)')

      this.#debuFolder = debugFolder;
    }
  }

  getCurrentSectionIndex() {
    const index = this.#sections.CurrentSectionIndex - this.#sections.ItemsContainerIndexOffset;

    return index < 0 ? -1 : index;
  }

  getPreviousSectionIndex() {
    const index = this.#sections.PreviousSectionIndex - this.#sections.ItemsContainerIndexOffset;

    return index < 0 ? -1 : index;
  }

  onSectionChanged() {
    // skip init reaction
    if (this.#items.length === 0) {

      return;

    } 

    const previousSection = this.getPreviousSectionIndex();
    if (previousSection !== -1) {
      const previousSectionItem = this.getItemBySectionIndex(previousSection);
      previousSectionItem.element.onExitSection();
    }
    const currentSection = this.getCurrentSectionIndex();
    const currentSectionItem = this.getItemBySectionIndex(currentSection);
    currentSectionItem.element.onEnterSection();
  }

  #addElement(element, type, sectionIndex) {
    element.sectionIndex = sectionIndex;
    const initPosition = this.#calculateInitPosition(element.sectionIndex);
    element.setInitPosition(initPosition, true); 

    const item = { type, element };
    this.#items.push(item);

    return item;
  }

  addModel( model, sectionIndex, { needsFollowByRayscaster } ) {
    this.#addElement(model, this.#elementTypes.MODEL, sectionIndex);

    if (needsFollowByRayscaster) {
      
      this.#raycaster.setObjectToIntersect(model.Instance);

    }
  }

  addModelGroup(modelGroup, sectionIndex, { needsFollowByRayscaster } ) {
    this.#addElement(modelGroup, this.#elementTypes.MODEL_GROUP, sectionIndex);

    if (needsFollowByRayscaster) {
      for (const model of modelGroup.Items) {

        this.#raycaster.setObjectToIntersect(model.Instance);

      }
    }
  }

  getItemBySectionIndex(index) {
    return this.#items
      .find(item => item.element.sectionIndex === index);
  }

  getItemByModel(model) {
    return this.#items.find(item => {
      if (item.type === this.#elementTypes.MODEL) {

        return item.element.Instance === model;

      } else if (item.type === this.#elementTypes.MODEL_GROUP) {
        return item.element.Items
          .findIndex(item => item.Instance === model) > -1;
      }
    });
  }

  recalculateInitPositions() {
    for (const item of this) {
      const element = item.element;
      const sectionIndex = element.sectionIndex;
      const initPosition = this.#calculateInitPosition(sectionIndex);
      element.setInitPosition(initPosition, true); 
    }
  }

  #calculateInitPosition(sectionIndex) {
    const scrollProgressNormalized = (sectionIndex * this.#sizes.Height + this.#sizes.Height * 0.5) / this.#sizes.Height;
    const itemDistanceToOY = (this._radiusFactor * scrollProgressNormalized + 1) * this._initItemDistanceToOY;

    return new THREE.Vector3(
      itemDistanceToOY * Math.cos((2 * Math.PI) * (sectionIndex / this.Count)), 
      - this._distanceBetweenObjects * sectionIndex,
      - itemDistanceToOY * Math.sin((2 * Math.PI) * (sectionIndex / this.Count))
    )
  }

  #calculateNewPosition(sectionIndex) {
    const itemToMove = this.getItemBySectionIndex(sectionIndex);
    const elementInstance = itemToMove.element.Instance;
    const elementInstancePostionProjectedOnOY = new THREE.Vector3(
      0, 
      elementInstance.position.y, 
      0
    );        
    const directionFromElementIntancePosition = elementInstance.position
      .clone()
      .sub(elementInstancePostionProjectedOnOY);
    const moveDirection = directionFromElementIntancePosition.clone();
    moveDirection.normalize();
    moveDirection.applyEuler(
        new THREE.Euler(
            0, 
            (sectionIndex % 2 ? 1 : -1) * Math.PI * 0.5, 
            0
        )
    );
    moveDirection.multiplyScalar(this._itemMoveDistanceOnSelecting);
    const newPosition = new THREE.Vector3()
        .copy(elementInstance.position)
        .add(moveDirection);

    return newPosition;
  }

  #calculateOYDeltaBetweenCameraAndItem(item) {
    const itemPositionY = item.element.Instance.position.y;
    const cameraPostionY = this.#camera.Instance.position.y;

    return Math.abs(itemPositionY - cameraPostionY);
  }

  onRaycasterAfterObjectEntered() {
    const intersectedObject = this.#raycaster.ItersectedObject;
    const intersectedItem = this.getItemByModel(intersectedObject.object);
    
    // check if camera is close enough to intersected item
    const cameraItemDelta = this.#calculateOYDeltaBetweenCameraAndItem(intersectedItem);
    if (cameraItemDelta > this._deltaBetweenCameraPostionYAndItemPostionY) {

      return;

    }

    const element = intersectedItem.element;
    element.onIntersected();
    /*
      result state of element:

      IsSelected = false;
      IsHighLighted = true;
      IsIntersected = true;

      sectionIndex = currentSection;
    */
  }

  onRaycasterBeforeObjectLeaved() {
    const intersectedObject = this.#raycaster.ItersectedObject;
    const intersectedItem = this.getItemByModel(intersectedObject.object);

    const element = intersectedItem.element;
    element.onIntersectedOut();
    /*
      result state of element:

      IsSelected = false;
      IsHighLighted = false;
      IsIntersected = false;

      sectionIndex = currentSection;
    */
  }

  onClick() {
    const intersectedObject = this.#raycaster.ItersectedObject;

    // check if click has been done on an item
    if (intersectedObject === null) {

      return;

    }

    const intersectedItem = this.getItemByModel(intersectedObject.object);

    // check if camera is close enough to intersected item
    const cameraItemDelta = this.#calculateOYDeltaBetweenCameraAndItem(intersectedItem);
    if (cameraItemDelta > this._deltaBetweenCameraPostionYAndItemPostionY) {
      return;
    }

    const element = intersectedItem.element;

    let newPosition;
    if (element.IsSelected) {

      newPosition = element.InitPosition;

    } else {

      newPosition = this.#calculateNewPosition(this.getCurrentSectionIndex());

    }
    element.setDesiredPosition(newPosition);

    element.onClick();

    this.dispatchEvent( new CustomEvent(ItemsContainer.EVENT_NAME__ON_ITEM_CLICK) );
  }

  onScroll() {
    // skip init reaction
    if (this.#items.length === 0) {

      return;

    }

    const currentSectionItem = this.getItemBySectionIndex(this.getCurrentSectionIndex());

    // check if camera is close enough to current section item
    const cameraItemDelta = this.#calculateOYDeltaBetweenCameraAndItem(currentSectionItem);
    if (cameraItemDelta > this._deltaBetweenCameraPostionYAndItemPostionY) {
      const element = currentSectionItem.element;

      // return item position to init one, when item is selected
      if (element.IsSelected) {
        const newPosition = element.InitPosition;
        element.setDesiredPosition(newPosition);

        element.onScrollOut();

        this.dispatchEvent( new CustomEvent(ItemsContainer.EVENT_NAME__ON_ITEM_SCROLLOUT) );
      }
    }
  }

  update() {
    for (const item of this) {

      item.element.update();

    }
  }
}