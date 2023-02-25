import * as dat from 'lil-gui';

export default class Debug {
  #active;
  get Active() {
    return this.#active;
  }

  #ui;
  get UI() {
    return this.#ui;
  }

  constructor() {
    // setup
    this.#active = true;//window.location.hash === '#debug';

    if (this.Active) {

      this.#ui = new dat.GUI();

    }
  }
}