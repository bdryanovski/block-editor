import { LitElement, css, html } from 'lit';
import { property } from 'lit/decorators.js';

import { html as staticHtml, unsafeStatic} from 'lit/static-html.js'

export type BLOCK_TYPE = 'TEXT' | 'HEADER_1' | 'HEADER_2' | 'HEADER_3' | 'HEADER_4' | 'CODE' | 'EMPTY' | 'IMAGE';

const elementsMap = {
  'TEXT': 'p',
  'HEADER_1': 'h1',
  'HEADER_2': 'h2',
  'HEADER_3': 'h3',
  'HEADER_4': 'h4',
  'EMPTY': 'span',
  'IMAGE': 'img',
  'CODE': 'code'
}

export class ECreateTag extends LitElement {

  @property({ type: String }) type: BLOCK_TYPE = 'TEXT'

  static styles = css`
    h1, h2, h3, h4 {
      color: #1e293b;
    }

    p {
      padding: 1rem 0;
    }

    pre {
      background-color: #D1D1D0;
      overflow: auto;
      padding: 1rem;
      font-family: Monaco, monospace;
      line-height: 100%;
      border: none;
      letter-spacing: normal;
      word-break: break-all;

    }

    .EMPTY_LINE {
      display: block;
      width: 100%;
      height: 2rem;
      border: 1px dotted red;
    }
  `;

  get tagName() {
    return elementsMap[this.type];
  }

  render() {
    if (this.type === 'CODE') {
      return html`<pre><code><slot/></code></pre>`
    }

    if (this.type === 'EMPTY') {
      return html`<span class="EMPTY_LINE"><slot /></span>`
    }

    return staticHtml`
      <${unsafeStatic(this.tagName)}><slot /></${unsafeStatic(this.tagName)}>
    `;
  }
}
