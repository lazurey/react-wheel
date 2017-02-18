// const isClass = type => (!!type.prototype && !!type.prototype.isReactComponent)

const instantiateComponent = (element) => (typeof element === 'function') ? new CompositeComponent(element) : new HostComponent(element)

class CompositeComponent {
  constructor(element) {
    this.element = element // { type, config, children }
    this.renderedComponent = null
    this.publicInstance = null
  }
  getPublicInstance() {
    return this.publicInstance
  }
  mount() {
    const { type, config, children } = this.element
    this.render(this.element.props)
    publicInstance = new type(config)
    publicInstance.props = config
    renderedComponent = publicInstance.render()
  }
}

class HostComponent {
  constructor(props) {
    this.props = props
    this.renderedComponent = null
    this.publicInstance = null
  }
  mount() {


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
      console.log('setting state ', newState)
      this.state = Object.assign({}, this.state, newState)
    }
  },
  createElement: (type, config, ...children) => {
    const renderedComponent = mount(type, config, children)
    return renderedComponent
  }
}

window.ReactDOM = {
  render: (comp, host) => {
    if (!!host) {
      host.append(comp)
    }
  }
}
