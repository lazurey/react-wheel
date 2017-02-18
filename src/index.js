const isClass = type => (!!type.prototype && !!type.prototype._compositeInstance)

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
    
    let publicInstance, renderedComponent
    publicInstance = new type(props)
    publicInstance.props = props
    publicInstance._compositeInstance = this
    this.publicInstance = publicInstance

    renderedComponent = publicInstance.render()
    this.renderedComponent = renderedComponent

    if (!!publicInstance.componentDidMount && typeof publicInstance.componentDidMount === 'function') {
      publicInstance.componentDidMount()
    }
    
    return renderedComponent
  }

  receive(oldState, newState) {
    const publicInstance = this.getPublicInstance()
    const previousRender = this.renderedComponent
    const newRender = publicInstance.render()
    
    previousRender.innerHTML = newRender.innerHTML

    this.renderedComponent = previousRender
  }
}

class HostComponent {
  constructor(element) {
    this.currentElement = element
    this.renderedChildren = []
    this.node = null
  }

  getHostNode() {
    return this.node
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
      this._compositeInstance.receive(this.state, newState)
    }
  },
  createElement: (type, config, ...children) => {
    const props = (!!config) ? { ...config, children } : { children }
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
