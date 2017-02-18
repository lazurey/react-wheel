const isClass = type => (!!type.prototype && !!type.prototype.isCompositeComponent)

const isHostElement = type => typeof type !== 'function'

const instantiateComponent = (element) => (isHostElement(element.type)) ? new HostComponent(element) : new CompositeComponent(element)

class CompositeComponent {
  constructor(element) {
    this.currentElement = element
    this.renderedComponent = null
    this.publicInstance = null
  }

  getPublicInstance() {
    return this.publicInstance
  }
  
  mount() {
    const { type, props } = this.currentElement
    const children = props.children || []
    
    let publicInstance, renderedComponent
    publicInstance = new type(props)
    publicInstance.props = props
    renderedComponent = publicInstance.render()
    this.publicInstance = publicInstance

    return renderedComponent
  }
}

class HostComponent {
  constructor(element) {
    this.currentElement = element
    this.renderedChildren = []
    this.node = null
  }

  getPublicInstance() {
    return this.node
  }

  mount() {
    const { type, props } = this.currentElement
    let children = props.children || []
    if (!Array.isArray(children)) {
      children = [children];
    }
    const node = document.createElement(type)
    children.forEach(child => {
      node.append(child)
    })
    this.node = node
    return node
  }
}

const mount = (type, config, children) => {
  if (typeof type === 'function') {
    const comp = new type(config)
    return comp.render()
  } else if (typeof type === 'string') {
    const host = document.createElement(type)
    children.forEach(child => {
      host.append(child)
    })
    return host
  }
}

window.React = {
  Component: class Component {
    constructor(props) {
      this.props = props
    }
    setState(newState) {
      this.state = Object.assign({}, this.state, newState)
    }
  },
  createElement: (type, config, ...children) => {
    const props = (!!config) ? { ...config, children } : { children }
    console.log('in createElement' , type)
    const element = instantiateComponent({ type, props })
    return element.mount()
  }
}

window.ReactDOM = {
  render: (comp, host) => {
    if (!!host) {
      host.append(comp)
    }
  }
}
