export function register(tagName: string, implementation: any) {
  return window.customElements.get(tagName) ===  undefined
    ? window.customElements.define(tagName, implementation)
    : null
}
