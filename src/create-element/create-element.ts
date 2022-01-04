import { register } from '../utils/register.js';
import { CreateElement } from './CreateElement.js'

register('create-element', CreateElement)

declare global {
  interface HTMLElementTagNameMap {
    'create-element': CreateElement
  }
}
