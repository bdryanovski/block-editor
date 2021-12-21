import { html, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { BLOCK_TYPE } from './create-element/ECreateTag';

import { sortArrayBy } from '../utils/sorting.js';

export type BLOCK = {
  type: BLOCK_TYPE,
  position: number,
  content: string
}

export class EBlocks extends LitElement {

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

    <e-draggable>
      ${
        this.blocks
        .sort(sortArrayBy('position'))
        .map((block, index) => {
          return html`
              <e-block
                .uid=${index}
                .type=${block.type}
                .position=${block.position}
                .content=${block.content}
                >
                <e-create-tag .type="${block.type}">${block.content}</e-create-tag>
              </e-block>

          `;
        })
      }

            </e-draggable>
    `;
  }
}
