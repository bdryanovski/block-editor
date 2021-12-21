import { LitElement, html } from 'lit';
import { property } from 'lit/decorators.js';

import { uuid } from '../utils/uuid.js'

export class EditableBlock extends LitElement {

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

    const slt = (this.shadowRoot?.getElementById('internalContent') as HTMLSlotElement).assignedElements();

    // @ts-ignore
    this._element = slt.length
      ? slt[0]
      : this.shadowRoot?.getElementById('placeholder');

    return this._element
  }

  firstUpdated() {
    if (!this.container) { return /* no element to edit */ }
    // @ts-ignore
    this.container.contentEditable = true
  }

  render() {
    return html`<slot
      id="internalContent"
      @input=${() => { this.dispatchEvent(this.updateEvent) }}
      ><p id="placeholder">${this.placeholder}</p>
      </slot>`
  }
}
