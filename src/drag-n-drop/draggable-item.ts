import { register } from '../utils/register.js';

import { DraggableItem } from './DraggableItem.js'


register('draggable-item', DraggableItem)

declare global {
  interface HTMLElementTagNameMap {
    'draggable-item': DraggableItem;
  }
}
