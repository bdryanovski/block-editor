import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { BLOCK_TYPE } from '../create-element/CreateElement.js';

import { sortArrayBy } from '../utils/sorting.js';

// components
import '../drag-n-drop/draggable-item.js'
import '../drag-n-drop/draggable-list.js'
import '../editable/editable-block.js'
import '../create-element/create-element.js'

export type BLOCK = {
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

    this.addEventListener('block:position', (event) => {
      // @ts-ignore
      console.log('Block changed position ', event.detail)
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
                    .uid=${index}
                    .type=${block.type}
                    .position=${block.position}
                    .content=${block.content}
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
