import ElementGroup from '../Models/ElementGroup.js';
import Knot from './Knot.js';
import Tor from './Tor.js';

export default class TorAndKnotGroup extends ElementGroup {
  constructor() {
    super();

    this.#setup();
  }

  #setup() {
    if (this._debug.Active) {
      this._debugFolder
        .add(this, '_initRotationSpeed')
        .min(0)
        .max(1)
        .step(0.0001)
        .name('group: rotation speed');
    }
  }

  _setElement() {
    super._setElement();

    this.Instance.rotation.set(
      Math.PI * 0,
      Math.PI * 1.9,
      Math.PI * 0.15
    );

    if (this._debug.Active) {
      const debugParameters = {
        rotationX: this.Instance.rotation.x / Math.PI,
        rotationY: this.Instance.rotation.y / Math.PI,
        rotationZ: this.Instance.rotation.z / Math.PI
      };

      const debugFolder = this._debug.UI.addFolder('TorAndKnotGroup');

      debugFolder
        .add(debugParameters, 'rotationX')
        .min(0)
        .max(2)
        .step(0.00001)
        .onChange(value => {
          this.Instance.rotation.x = value * Math.PI;
        });

      debugFolder
        .add(debugParameters, 'rotationY')
        .min(0)
        .max(2)
        .step(0.00001)
        .onChange(value => {
          this.Instance.rotation.y = value * Math.PI;
        });

      debugFolder
        .add(debugParameters, 'rotationZ')
        .min(0)
        .max(2)
        .step(0.00001)
        .onChange(value => {
          this.Instance.rotation.z = value * Math.PI;
        });

      this._debugFolder = debugFolder;
    }
  }

  _setItems() {
    super._setItems();

    const tor = new Tor();
    this.Items.push(tor);
    this.Instance.add(tor.Instance);

    const knot = new Knot();
    this.Items.push(knot);
    this.Instance.add(knot.Instance);

    for (let index = 0; index < this.Items.length; index++) {
      
      this.Items[index].Instance.position.set(...this._calculateItemPostion(index));

    }

    if (this._debug.Active) {
      this._debugFolder
        .add(this, '_radiusFromGroupCenter')
        .min(0)
        .max(5)
        .step(0.001)
        .name('radius: model-group')
        .onChange(() => {
          for (let index = 0; index < this.Items.length; index++) {
            
            this.Items[index].Instance.position.set(...this._calculateItemPostion(index));

          }
        });
    }
  }

  update() {
    super.update();

    this.Instance.rotation.x += 0.003 * this._speedBooster * Math.sin(this._time.Delta * this._initRotationSpeed * 0.05);
    this.Instance.rotation.y += 0.003 * this._speedBooster * this._time.Delta * this._initRotationSpeed * 0.5;
  }
}