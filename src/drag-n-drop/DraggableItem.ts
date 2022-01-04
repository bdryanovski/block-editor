import { LitElement, html, css } from 'lit'

export class DraggableItem extends LitElement {

  static styles = css`
    .draggable-row {
      width: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: nowrap;
      justify-content: flex-start;
      align-items: flex-start;
      gap: 1rem;
    }
    .drggable {
      font-size: 18px;
      font-weight: bold;
      cursor: move;
    }
  `
  render() {
    return html`
    <div class="draggable-row">
      <div class="draggable">::</div>
      <div class="content">
        <slot></slot>
      </div>
    </div>`
  }
}
