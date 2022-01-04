import { register } from '../utils/register.js';
import { EditableBlock } from './EditableBlock.js'

register('editable-block', EditableBlock)

declare global {
  interface HTMLElementTagName {
    'editable-block': EditableBlock
  }
}
