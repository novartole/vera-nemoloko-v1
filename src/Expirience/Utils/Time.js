export default class Time extends EventTarget {
  static EVENT_NAME__ON_TICK = 'tick';

  #start;
  #current;

  #elapsed;
  get Elapsed() {
    return this.#elapsed;
  }

  #delta;
  get Delta() {
    return this.#delta;
  }

  constructor() {
    super();

    this.#setup();

    window.requestAnimationFrame( () => {

      this.#tick();

    } );
  }

  #setup() {
    this.#start = Date.now();
    this.#current = this.#start;
    this.#elapsed = 0;
    // around value between two frames at 60fps
    this.#delta = 16;
  }

  #tick() {
    const currentTime = Date.now();
    this.#delta = currentTime - this.#current;
    this.#current = currentTime;
    this.#elapsed = this.#current - this.#start;


    this.dispatchEvent( new CustomEvent(Time.EVENT_NAME__ON_TICK) );


    window.requestAnimationFrame( () => {

      this.#tick();
      
    });
  }
}