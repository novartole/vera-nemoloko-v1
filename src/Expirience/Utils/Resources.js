import * as THREE from 'three';

import { SourceTypes } from '../sources.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

export default class Resources extends EventTarget {
  static EVENT_NAME__ON_RESOURCES_LOADED = 'onResourcesLoaded';

  #sources;

  #totalToLoad;
  #totalLoaded;
  #loaders;

  #items;
  get Items() {
    return this.#items;
  }

  constructor(sources) {
    super();

    // options
    this.#sources = sources;

    this.#setup();
    this.#setLoaders();
    
    this.#startLoading();
  }

  #setup() {
    this.#items = {};

    this.#totalToLoad = this.#sources.length;
    this.#totalLoaded = 0;
  }

  #setLoaders() {
    this.#loaders = {
      gltfLoader: new GLTFLoader(),
      textureLoader: new THREE.TextureLoader(),
      cubeTextureLoader: new THREE.CubeTextureLoader(),
      fileLoader: new THREE.FileLoader()
    };
  }

  #startLoading() {
    for (const source of this.#sources) {
      if (source.type === SourceTypes.GLTF_TEXTURE) {
        this.#loaders.gltfLoader.load(
          source.path,
          file => {

            this.#sourceLoaded(source, file);

          }
        )
      } else if (source.type === SourceTypes.TEXTURE) {
        this.#loaders.textureLoader.load(
          source.path,
          file => {

            this.#sourceLoaded(source, file);

          }
        )
      } else if (source.type === SourceTypes.CUBE_TEXTURE) {
        this.#loaders.cubeTextureLoader.load(
          source.path,
          file => {

            this.#sourceLoaded(source, file);

          }
        )
      } else if (source.type === SourceTypes.DESCRIPTION) {
        this.#loaders.fileLoader.load(
          source.path,
          file => {
            const result = JSON.parse(file);
            this.#sourceLoaded(source, result);
          }
        )
      }
    }
  }

  #sourceLoaded(source, file) {
    this.Items[source.name] = file;

    this.#totalLoaded++;

    if (this.#totalLoaded === this.#totalToLoad) {

      this.dispatchEvent( new CustomEvent(Resources.EVENT_NAME__ON_RESOURCES_LOADED) );
      
    }
  }
}