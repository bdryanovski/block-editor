import { register } from '../utils/register.js';
import { DraggableList } from './DraggableList.js'

register('draggable-list', DraggableList)

declare global {
  interface HTMLElementTagNameMap {
    'draggable-list': DraggableList
  }
}
