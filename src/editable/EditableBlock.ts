import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';

import { uuid } from '../utils/uuid.js'

export class EditableBlock extends LitElement {

  static styles = css
  // This style remove the outline of the edittablecontent box
  // also don't let you see how big is a container
  `
    ::slotted(*:focus) {
      outline: 0;
    }
  `

  @property({ type: String }) uid: string = uuid();
  @property({ type: String }) content?: string;

  @property({ type: String}) placeholder: string = 'Use / or insert text here ...';

  get updateEvent() {
    return new CustomEvent('block:updated', {
      detail: {
        uid: this.uid,
        value: this.innerText,
        target: this.container,
      },
      bubbles: true,
      composed: true
    })
  }

  _element?: HTMLElement;

  get container(): HTMLElement | undefined {
    if (this._element) { return this._element }

    // make sure that there is shadowRoot already present
    if (!this.hasUpdated) { return }

    const slot = (this.shadowRoot?.querySelector('slot') as HTMLSlotElement).assignedElements();

    // @ts-ignore
    this._element = slot.length
      ? slot[0]
      : this.shadowRoot?.getElementById('placeholder');

    return this._element
  }

  firstUpdated() {
    if (!this.container) { return /* no element to edit */ }
    this.container.contentEditable = 'true'
    this.container.addEventListener('input', () => this.dispatchEvent(this.updateEvent))
  }

  render() {
    return html`<slot placeholder="${this.placeholder}"></slot>`
  }
}
