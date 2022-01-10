import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { BLOCK_TYPE } from '../create-element/CreateElement.js';

import { sortArrayBy } from '../utils/sorting.js';

import { uuid } from '../utils/uuid.js';

// components
import '../drag-n-drop/draggable-item.js'
import '../drag-n-drop/draggable-list.js'
import '../editable/editable-block.js'
import '../create-element/create-element.js'

export type BLOCK = {
  uuid?: string,
  type: BLOCK_TYPE,
  position: number,
  content: string
}

export class ElementBlocks extends LitElement {

  @property({ type: Array}) blocks: BLOCK[] = [];

  connectedCallback() {
    super.connectedCallback();
    this.addEventListener('block:updated', (event) => {
      // @ts-ignore
      console.log('block:updated', event.detail)
    });


    /**
     * @TODO - there is no event for position change - need to handle this in some way
     */
    this.addEventListener('block:position', (event) => {
      // @ts-ignore
      console.log('Block changed position ', event.detail)
    })

    this.addEventListener('block:create', (event) => {
      // @ts-ignore
      console.log('block:create', event.detail)

      const _uuid: string = uuid();

      this.blocks.push({
        uuid: _uuid,
        type: 'TEXT',
        // @ts-ignore
        position: event.detail.position + 1,
        content: ''
      })

      this.requestUpdate();

      // @ts-ignore
      const newEl = this.shadowRoot?.querySelector(`#${_uuid}`);

      console.log('newEl', newEl, this.shadowRoot)
      // @ts-ignore
      newEl?.focus();
    })

  }

  render() {
    return html`
      <draggable-list>
        ${
          this.blocks
            .sort(sortArrayBy('position'))
            .map((block, index) => {
              return html`
                <draggable-item>
                  <editable-block
                    .uid=${block.uuid}
                    .type=${block.type}
                    .position=${block.position}
                    >
                    <create-element .type="${block.type}">${block.content}</create-element>
                  </editable-block>
                </draggable-item>
              `;
            })
        }
      </draggable-list>
    `;
  }
}
