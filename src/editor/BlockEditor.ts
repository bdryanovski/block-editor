import { html, css, LitElement } from 'lit';
import { property } from 'lit/decorators.js';

import { BLOCK } from '../element-blocks/ElementBlocks.js';

export class BlockEditor extends LitElement {
  static styles = css`
    :host {
      display: block;
      margin: 10px auto;
    }
  `;

  @property({ type: Array }) blocks: BLOCK[] = [
    {
      type: 'TEXT',
      content: 'Hello World',
      position: 2
    },
    {
      type: 'HEADER_1',
      content: 'Header 1 content',
      position: 0
    },
    {
      type: 'CODE',
      content: 'function foo() { return foo; }',
      position: 3
    },
    {
      type: 'HEADER_2',
      content: 'Header 2 content',
      position: 3
    },
    {
      type: 'EMPTY',
      content: '',
      position: 10
    },
    {
      type: 'TEXT',
      content: '',
      position: 24
    },
    {
      type: 'HEADER_3',
      content: 'Header 3 content',
      position: 2
    },

  ]

  render() {
    return html`
      <h2>Block Editor</h2>
      <element-blocks .blocks=${this.blocks}></element-blocks>
    `;
  }
}
