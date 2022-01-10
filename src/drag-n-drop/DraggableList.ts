import { LitElement, html, css } from 'lit';
import { property } from 'lit/decorators.js';


export class DraggableList extends LitElement {

  /**
   * Let me attach draggable on elements that I wan only
   *
   * @NOTE - this won't work with any other element than mention below,
   * the reason is that I set `draggable` attribute inside the `draggable-item` by
   * hand so this property is a bit pointless
   *
   * @TODO - resolve the issue with draggable-item attribute or drop the property
   */
  @property({ type: String }) tagName: string = 'draggable-item';


  /**
   * @TODO dragging item need better styles
   */
  static styles = css`
    ::slotted(*) {
      display: block;
    }

    ::slotted(.drag-sort-active) {
      border: 1px solid #4ca1af;
    }
  `

  firstUpdated() {
    this.rows
    .forEach((row: Element) => {
      row.addEventListener('drag', this.handleDrag);
      row.addEventListener('dragend', this.handleDrop);
    })
  }

  disconnectCallback() {
    this.rows.forEach((row: Element) => {
      row.removeEventListener('drag', this.handleDrag);
      row.removeEventListener('dragend', this.handleDrop);
    })

  }

  get rows(): Element[] {
    const slot = this.renderRoot.querySelector('slot');
    const childs = slot?.assignedNodes({ flatten: false }) ?? []

    return childs.filter((row: any) => {
      return row.localName === this.tagName
    }) as Element[]
  }

  handleDrag(event: any) {
    const selectedItem = event.target,
      list = selectedItem.parentNode,
      x = event.clientX,
      y = event.clientY;

    selectedItem.classList.add('drag-sort-active');
    /**
     * I'm getting error for elementFromPoint not part of the renderRoot, but it works!?
     * If I replace it with `document` must work
     */
    // @ts-ignore
    let swapItem = this.renderRoot?.elementFromPoint(x, y) === null ? selectedItem : this.renderRoot?.elementFromPoint(x, y);

    if (list === swapItem.parentNode) {
      swapItem = swapItem !== selectedItem.nextSibling ? swapItem : swapItem.nextSibling;
      list.insertBefore(selectedItem, swapItem);
    }
  }

  handleDrop(event: any) {
    event.target.classList.remove('drag-sort-active');
  }


   render() {
    return html`<slot></slot>`;
  }
}
