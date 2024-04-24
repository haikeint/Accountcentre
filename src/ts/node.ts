/*-----------------------------------------------
|   DomNode
-----------------------------------------------*/
class DomNode {
  node: HTMLInputElement
  constructor(node: HTMLInputElement) {
    this.node = node
  }

  addClass(className: string) {
    this.isValidNode() && this.node.classList.add(className)
  }

  removeClass(className: string) {
    this.isValidNode() && this.node.classList.remove(className)
  }

  toggleClass(className: string) {
    this.isValidNode() && this.node.classList.toggle(className)
  }

  hasClass(className: string) {
    this.isValidNode() && this.node.classList.contains(className)
  }

  data(key: string) {
    if (this.isValidNode()) {
      try {
        const dataset = this.node.dataset[this.camelize(key)] as string
        return JSON.parse(dataset)
      } catch (e) {
        return this.node.dataset[this.camelize(key)]
      }
    }
    return null
  }

  attr(name: string) {
    return this.isValidNode() && this.node[name as keyof HTMLInputElement]
  }

  setAttribute(name: any, value: any) {
    this.isValidNode() && this.node.setAttribute(name, value)
  }

  removeAttribute(name: any) {
    this.isValidNode() && this.node.removeAttribute(name)
  }

  setProp(name: string, value: boolean) {
    if (this.isValidNode()) this.node['checked'] = value
  }

  on(event: any, cb: any) {
    this.isValidNode() && this.node.addEventListener(event, cb)
  }

  isValidNode() {
    return !!this.node
  }

  // eslint-disable-next-line class-methods-use-this
  camelize(str: string) {
    const text = str.replace(/[-_\s.]+(.)?/g, (_: string, c: string) => (c ? c.toUpperCase() : ''))
    return `${text.substr(0, 1).toLowerCase()}${text.substr(1)}`
  }
}

export default DomNode
