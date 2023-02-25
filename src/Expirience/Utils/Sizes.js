export default class Sizes extends EventTarget {
  static EVENT_NAME__ON_RESIZE = 'resize';

  #width;
  get Width() {
    return this.#width;
  }

  #height;
  get Height() {
    return this.#height;
  }

  #pixelRatio;
  get PixelRatio() {
    return this.#pixelRatio;
  }

  constructor() {
    super();

    this.#setup();

    window.addEventListener('resize', event => {
      this.#setup();

      this.dispatchEvent( new CustomEvent(Sizes.EVENT_NAME__ON_RESIZE) );
    });
  }

  #setup() {
    this.#width = window.innerWidth;
    this.#height = window.innerHeight;
    this.#pixelRatio = Math.min(2, window.devicePixelRatio);
  }
}