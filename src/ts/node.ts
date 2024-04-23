/*-----------------------------------------------
|   DomNode
-----------------------------------------------*/
class DomNode {
  node: any
  constructor(node: any) {
    this.node = node
  }

  addClass(className: any) {
    this.isValidNode() && this.node.classList.add(className)
  }

  removeClass(className: any) {
    this.isValidNode() && this.node.classList.remove(className)
  }

  toggleClass(className: any) {
    this.isValidNode() && this.node.classList.toggle(className)
  }

  hasClass(className: any) {
    this.isValidNode() && this.node.classList.contains(className)
  }

  data(key: any) {
    if (this.isValidNode()) {
      try {
        return JSON.parse(this.node.dataset[this.camelize(key)])
      } catch (e) {
        return this.node.dataset[this.camelize(key)]
      }
    }
    return null
  }

  attr(name: any) {
    return this.isValidNode() && this.node[name]
  }

  setAttribute(name: any, value: any) {
    this.isValidNode() && this.node.setAttribute(name, value)
  }

  removeAttribute(name: any) {
    this.isValidNode() && this.node.removeAttribute(name)
  }

  setProp(name: any, value: any) {
    this.isValidNode() && (this.node[name] = value)
  }

  on(event: any, cb: any) {
    this.isValidNode() && this.node.addEventListener(event, cb)
  }

  isValidNode() {
    return !!this.node
  }

  // eslint-disable-next-line class-methods-use-this
  camelize(str: any) {
    const text = str.replace(/[-_\s.]+(.)?/g, (_: any, c: any) => (c ? c.toUpperCase() : ''))
    return `${text.substr(0, 1).toLowerCase()}${text.substr(1)}`
  }
}

export default DomNode
