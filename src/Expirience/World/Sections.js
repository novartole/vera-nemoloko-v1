import gsap from 'gsap';

import Expirience from "../Expirience.js";
import ItemsSectionBuilder from './ItemsContainerBuilder.js';
import ItemsContainer from './ItemsContainer.js';
import Tor from './Test/Tor.js';
import Knot from './Test/Knot.js';
import Cone from './Test/Cone.js';
import TorAndKnotGroup from './Test/TorAndKnotGroup.js';
import TorAndKnotAndConeGroup from './Test/TorAndKnotAndConeGroup.js';
import Plane from './Test/Plane.js';
import WelcomeContainer from './WelcomeContainer.js';

export default class Sections extends EventTarget {
  static EVENT_NAME__ON_PARAMETER_CHANGE = 'onParameterChange';

  #expirience;
  #mouse;
  #sizes;
  #resources;

  #itemsContainerIndexOffset;
  get ItemsContainerIndexOffset() {
    return this.#itemsContainerIndexOffset;
  }

  #types;
  get Types() {
    return this.#types;
  }

  #welcomeContainer;
  #itemsContainer;

  get ItemsCount() {
    if (this.#itemsContainer === null) {

      return 0;

    } else {

      return this.#itemsContainer.Count;

    }
  }

  #currentSectionIndex;
  get CurrentSectionIndex() {
    return this.#currentSectionIndex;
  }

  #previousSectionIndex;
  get PreviousSectionIndex() {
    return this.#previousSectionIndex;
  }

  get DistanceBetweenObjects() {
    return this.#itemsContainer.DistanceBetweenObjects;
  }

  get BaseModelMaterialOpacity() {
    return this.#itemsContainer.BaseModelMaterialOpacity;
  }

  get BaseModelMaterialColor() {
    return this.#itemsContainer.BaseModelMaterialColor;
  }

  #sections;

  #itemsContainerSectionsStates;

  constructor() {
    super();

    this.#expirience = new Expirience();

    this.#mouse = this.#expirience.Mouse;
    this.#sizes = this.#expirience.Sizes;
    this.#resources = this.#expirience.Resources;

    this.#setup();
  }

  getItemsContainerHeightOffset() {
    const welcomeContainerElement = this.#sections
      .find(section => section.type === this.Types.WELCOME_CONTAINER)
      ?.node;

    return welcomeContainerElement ? getComputedStyle(welcomeContainerElement).height.slice(0, -2) : 0;
  }

  #onCurrentSectionItemScrollOut() {
    const isSelected = this.#sections[this.CurrentSectionIndex].isSelected;
    if (isSelected === false) {

      return;

    }

    const { oldState, newState: currentState } = this.#changeCurrentSectionStateToInit();
    this.#handleCurrentSectionStateChange(oldState, currentState);
  }

  #onCurrentSectionItemClick() {
    const isSelected = this.#sections[this.CurrentSectionIndex].isSelected;
    
    if (isSelected) {
      const { oldState, newState: currentState } = this.#changeCurrentSectionStateToInit()
      this.#handleCurrentSectionStateChange(oldState, currentState);
    } else {
      const { oldState, newState: currentState } = this.#changeCurrentSectionStateToPreview();
      this.#handleCurrentSectionStateChange(oldState, currentState);
    }
  }

  #handleCurrentSectionStateChange(oldState, currentState) {
    if (
      currentState === this.#itemsContainerSectionsStates.PREVIEW
      && oldState === this.#itemsContainerSectionsStates.INIT
    ) {
      this.#sections[this.CurrentSectionIndex].isSelected = true;

      const lidMover = this.#sections[this.CurrentSectionIndex]
        .node
        .getElementsByClassName('section__container__mover--lid')[0];

      gsap.to(
        lidMover,
        {
          duration: 2,
          ease: 'power2.inOut',
          width: '55vw',
          onStart: () => {

            lidMover.classList.add('section__container__mover--moved');

          }
        }
      );
    } else if (
      currentState === this.#itemsContainerSectionsStates.INIT
      && oldState === this.#itemsContainerSectionsStates.PREVIEW
    ) {
      this.#sections[this.CurrentSectionIndex].isSelected = false;

      const lidMover = this.#sections[this.CurrentSectionIndex]
        .node
        .getElementsByClassName('section__container__mover--lid')[0];

      gsap.to(
        lidMover,
        {
          duration: 2,
          ease: 'power2.inOut',
          width: 0,
          onStart: () => {

            lidMover.classList.remove('section__container__mover--moved');

          }
        }
      );
    } else if (
      currentState === this.#itemsContainerSectionsStates.MAIN
      && oldState === this.#itemsContainerSectionsStates.PREVIEW
    ) {
      const previewMover = this.#sections[this.CurrentSectionIndex]
        .node
        .getElementsByClassName('section__container__mover--preview')[0];

      gsap.to(
        previewMover,
        {
          duration: 2,
          ease: 'power2.inOut',
          width: '55vw',
          onStart: () => {

            previewMover.classList.add('section__container__mover--moved');

          }
        }
      );
    } else if (
      currentState === this.#itemsContainerSectionsStates.PREVIEW
      && oldState === this.#itemsContainerSectionsStates.MAIN
    ) {
      const previewMover = this.#sections[this.CurrentSectionIndex]
        .node
        .getElementsByClassName('section__container__mover--preview')[0];

      gsap.to(
        previewMover,
        {
          duration: 2,
          ease: 'power2.inOut',
          width: 0,
          onStart: () => {

            previewMover.classList.remove('section__container__mover--moved');

          }
        }
      );
    } else if (
      currentState === this.#itemsContainerSectionsStates.INIT
      && oldState === this.#itemsContainerSectionsStates.MAIN
    ) {
      // it should be store locally to handle callbacks preperly
      const currentSection = this.CurrentSectionIndex;
      
      this.#sections[currentSection].isSelected = false;

      const preview = this.#sections[currentSection]
        .node
        .getElementsByClassName('section__container__preview')[0];
      const previewMover = this.#sections[currentSection]
        .node
        .getElementsByClassName('section__container__mover--preview')[0];

      gsap.to(
        previewMover,
        {
          duration: 2,
          ease: 'power2.inOut',
          width: 0,
          onStart: () => {
            previewMover.classList.remove('section__container__mover--moved');

            preview.classList.add('section__container__preview--hidden');
          },
          onComplete: () => {
            const lidMover = this.#sections[currentSection]
              .node
              .getElementsByClassName('section__container__mover--lid')[0];

              lidMover.style.width = 0;
              lidMover.classList.remove('section__container__mover--moved');
              preview.classList.remove('section__container__preview--hidden');
          }
        }
      )
    }
  }

  #changeCurrentSectionStateToMain() {
    const oldState = this.#sections[this.CurrentSectionIndex].state;
    const newState = this.#itemsContainerSectionsStates.MAIN;

    this.#sections[this.CurrentSectionIndex].state = newState;

    return { oldState, newState };
  }

  #changeCurrentSectionStateToPreview() {
    const oldState = this.#sections[this.CurrentSectionIndex].state;
    const newState = this.#itemsContainerSectionsStates.PREVIEW;

    this.#sections[this.CurrentSectionIndex].state = newState;

    return { oldState, newState };
  }

  #changeCurrentSectionStateToInit() {
    const oldState = this.#sections[this.CurrentSectionIndex].state;
    const newState = this.#itemsContainerSectionsStates.INIT;

    this.#sections[this.CurrentSectionIndex].state = newState;

    return { oldState, newState };
  }

  #setItemsContainerSections() {
    const body = document.querySelector('body');

    let section;

    let container;

    let lid;
    let preview;
    let main;

    let placeholder_lid_preview;
    let placeholder_preview_main;

    let mover;
    let lidMover;
    let previewMover;

    for (let index = 0; index < this.ItemsCount; index++) {
      // section
      section = document.createElement('section');
      section.classList.add('section', 'section__item');
      this.#sections.push({
        node: section,
        isSelected: false,
        state: this.#itemsContainerSectionsStates.INIT,
        type: this.#types.ITEMS_CONTAINER
      });

      // section container
      container = document.createElement('div');
      container.classList.add('section__container');
      section.append(container);

      // lid
      lid = document.createElement('div');
      lid.classList.add('section__container__lid');
      container.append(lid);

      // placeholder
      placeholder_lid_preview = document.createElement('div');
      placeholder_lid_preview.classList.add('section__container__placeholder');
      container.append(placeholder_lid_preview);

      // preview
      preview = document.createElement('div');
      preview.classList.add('section__container__preview');
      container.append(preview);

      // placeholder
      placeholder_preview_main = document.createElement('div');
      placeholder_preview_main.classList.add('section__container__placeholder');
      container.append(placeholder_preview_main);

      // main
      main = document.createElement('div');
      main.classList.add('section__container__main');
      container.append(main);

      // placeholder
      container.append(placeholder_lid_preview.cloneNode());

      // base mover 
      mover = document.createElement('div');
      mover.classList.add('section__container__mover');

      // lid mover
      lidMover = mover.cloneNode();
      lidMover.classList.add('section__container__mover--lid');
      container.append(lidMover);

      // preview mover
      previewMover = mover.cloneNode();
      previewMover.classList.add('section__container__mover--preview');
      container.append(previewMover);

      body.append(section);
    }
  }

  #getTypeBySectionIndex(index) {
    // console.log(this.#sections);
    return this.#sections[index].type;
  }

  #setup() {
    this.#itemsContainerSectionsStates = {
      INIT: 0,
      PREVIEW: 1,
      MAIN: 2
    }

    const sectionIndex = this.#calculateSectionIndex();

    this.#currentSectionIndex = sectionIndex;
    this.#previousSectionIndex = this.CurrentSectionIndex;

    this.#types = {
      WELCOME_CONTAINER: 0,
      ITEMS_CONTAINER: 1
    };

    this.#sections = [];

    this.#welcomeContainer = null;
    this.#itemsContainer = null;

    this.#itemsContainerIndexOffset = 0;
  }

  #calculateSectionIndex() {
    const scrollY = this.#mouse.ScrollY;
    const height = this.#sizes.Height;

    const sectionIndex = Math.round(scrollY / height);

    return sectionIndex;
  }

  #setItemsContainer() {
    this.#itemsContainer = new ItemsSectionBuilder(this)
      .reset()
      .addModel( new Tor(), 0)
      .addModel( new Knot(), 1)
      .addModel( new Cone(), 2)
      .addModelGroup( new TorAndKnotGroup(), 3)
      .addModelGroup( new TorAndKnotAndConeGroup(), 4)
      .build();

    this.#itemsContainer.addEventListener(ItemsContainer.EVENT_NAME__ON_ITEM_CLICK, () => {
      this.#onCurrentSectionItemClick();
    });

    this.#itemsContainer.addEventListener(ItemsContainer.EVENT_NAME__ON_ITEM_SCROLLOUT, () => {
      this.#onCurrentSectionItemScrollOut();
    });

    this.#itemsContainer.addEventListener(ItemsContainer.EVENT_NAME__ON_PARAMETER_CHANGE, () => {
      this.#onParameterChange();
    });
  }

  #onParameterChange() {
    this.dispatchEvent( new CustomEvent(Sections.EVENT_NAME__ON_PARAMETER_CHANGE) );
  }

  #setPreview(infoObject, sectionIndex) {
    const preview = this.#sections
      .filter(section => section.type === this.Types.ITEMS_CONTAINER)[sectionIndex]
      .node
      .getElementsByClassName('section__container__preview')[0];

    const titleText = infoObject.title;
    const titleNode = document.createElement('h1');
    titleNode.innerHTML = titleText;
    preview.append(titleNode);

    const paragraphs = infoObject.paragraphs;
    let paragraphNode;
    for (const paragraphText of paragraphs) {
      paragraphNode = document.createElement('p');
      paragraphNode.innerHTML = paragraphText;
      preview.append(paragraphNode);
    }
  }

  #setMain(infoObject, sectionIndex) {
    const main = this.#sections
      .filter(section => section.type === this.Types.ITEMS_CONTAINER)[sectionIndex]
      .node
      .getElementsByClassName('section__container__main')[0];

    const titleText = infoObject.title;
    const titleNode = document.createElement('h1');
    titleNode.innerHTML = titleText;
    main.append(titleNode);

    const paragraphs = infoObject.paragraphs;
    let paragraphNode;
    for (const paragraphText of paragraphs) {
      paragraphNode = document.createElement('p');
      paragraphNode.innerHTML = paragraphText;
      main.append(paragraphNode);
    }
  }

  getCurrentSectionType() {
    return this.#getTypeBySectionIndex(this.CurrentSectionIndex);
  }

  onScroll() {
    const sectionIndex = this.#calculateSectionIndex();
    const isSectionChanged = (sectionIndex !== this.CurrentSectionIndex);
    if (isSectionChanged) {
      this.#previousSectionIndex = this.CurrentSectionIndex;
      this.#currentSectionIndex = sectionIndex;
    }

    const currentSectionType = this.getCurrentSectionType();
    if (currentSectionType === this.Types.ITEMS_CONTAINER) {
      this.#itemsContainer.onScroll();

      if (isSectionChanged) {

        this.#itemsContainer.onSectionChanged();

      }
    } else if (currentSectionType === this.Types.WELCOME_CONTAINER) {
      
      this.#welcomeContainer.onScroll();

    }
  }

  onRaycasterAfterObjectEntered() {
    const currentSectionType = this.getCurrentSectionType();
    if (currentSectionType === this.Types.ITEMS_CONTAINER) {

      this.#itemsContainer.onRaycasterAfterObjectEntered();

    }
  }

  onRaycasterBeforeObjectLeaved() {
    const currentSectionType = this.getCurrentSectionType();
    if (currentSectionType === this.Types.ITEMS_CONTAINER) {

      this.#itemsContainer.onRaycasterBeforeObjectLeaved();

    }
  }

  #setWelcomeContainer() {
    this.#welcomeContainer = new WelcomeContainer();
  }

  #setWelcomeContainerSection() {
    const body = document.querySelector('body');

    // section
    const section = document.createElement('section');
    section.classList.add('section');
    this.#sections.push({
      node: section,
      type: this.Types.WELCOME_CONTAINER
    });

    // section container
    // const container = document.createElement('div');
    // container.classList.add('section__container');
    // section.append(container);

    body.append(section);

    this.#itemsContainerIndexOffset = 1;
  }

  onResourcesLoaded() {
    // welcome
    this.#setWelcomeContainer();
    this.#setWelcomeContainerSection();

    // items container
    this.#setItemsContainer();
    this.#setItemsContainerSections();

    // test
    for (let index = 0; index < this.ItemsCount; index++) {
      const resource = this.#resources.Items.testModelDescription;  

      const previewInfoObject = resource.preview;
      if (previewInfoObject !== null) {

        this.#setPreview(previewInfoObject, index);

      }
  
      const mainInfoObject = resource.main;
      if (mainInfoObject !== null) {

        this.#setMain(mainInfoObject, index);

      }
    }
  }

  onClick(event) {
    const currentSectionType = this.getCurrentSectionType();
    if (currentSectionType === this.Types.ITEMS_CONTAINER) {
      this.#itemsContainer.onClick();

      const isSelected = this.#sections[this.CurrentSectionIndex].isSelected;
      
      // skip if section is not selected
      if (isSelected === false) {

        return;
        
      }

      const explicitOriginalTarget = event.explicitOriginalTarget;
      const currentState = this.#sections[this.CurrentSectionIndex].state;

      if (currentState === this.#itemsContainerSectionsStates.PREVIEW) {
        const preview = this.#sections[this.CurrentSectionIndex]
          .node
          .getElementsByClassName('section__container__preview')[0];

        if (preview.contains(explicitOriginalTarget) === false) {

          return;

        }

        const { oldState, newState: currentState } = this.#changeCurrentSectionStateToMain();
        this.#handleCurrentSectionStateChange(oldState, currentState);
      } else if (currentState === this.#itemsContainerSectionsStates.MAIN) {
        const main = this.#sections[this.CurrentSectionIndex]
          .node
          .getElementsByClassName('section__container__main')[0];

        if (main.contains(explicitOriginalTarget) === false) {

          return;

        }

        const { oldState, newState: currentState } = this.#changeCurrentSectionStateToPreview();
        this.#handleCurrentSectionStateChange(oldState, currentState);
      }
    }
  }

  update() {
    if (this.#itemsContainer !== null) {

      this.#itemsContainer.update();

    }
  }
}