import ItemsContainer from "./ItemsContainer.js";

export default class ItemsSectionBuilder {
  #sections;

  #itemsSection;

  constructor(sections) {
    this.#sections = sections;

    this.#itemsSection = null;
  }

  reset() {
    this.#itemsSection = new ItemsContainer(this.#sections);

    return this;
  }

  addModel( model, order, { needsFollowByRayscaster } = { needsFollowByRayscaster: true } ) {
    this.#itemsSection.addModel( model, order, { needsFollowByRayscaster } );

    return this;
  }

  addModelGroup( model, order, { needsFollowByRayscaster } = { needsFollowByRayscaster: true } ) {
    this.#itemsSection.addModelGroup( model, order, { needsFollowByRayscaster } );

    return this;
  }

  build() {
    this.#itemsSection.recalculateInitPositions();

    const itemsSection = this.#itemsSection;

    this.#itemsSection = null;

    return itemsSection;
  }
}