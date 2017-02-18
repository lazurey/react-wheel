'use strict';

var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isClass = function isClass(type) {
  return !!type.prototype && !!type.prototype._compositeInstance;
};

var isHostElement = function isHostElement(type) {
  return typeof type !== 'function';
};

var instantiateComponent = function instantiateComponent(element) {
  return isHostElement(element.type) ? new HostComponent(element) : new CompositeComponent(element);
};

var CompositeComponent = function () {
  function CompositeComponent(element) {
    _classCallCheck(this, CompositeComponent);

    this.currentElement = element;
    this.renderedComponent = null;
    this.publicInstance = null;
  }

  _createClass(CompositeComponent, [{
    key: 'getPublicInstance',
    value: function getPublicInstance() {
      return this.publicInstance;
    }
  }, {
    key: 'mount',
    value: function mount() {
      var _currentElement = this.currentElement,
          type = _currentElement.type,
          props = _currentElement.props;


      var publicInstance = void 0,
          renderedComponent = void 0;
      publicInstance = new type(props);
      publicInstance.props = props;
      publicInstance._compositeInstance = this;
      this.publicInstance = publicInstance;

      renderedComponent = publicInstance.render();
      this.renderedComponent = renderedComponent;

      if (!!publicInstance.componentDidMount && typeof publicInstance.componentDidMount === 'function') {
        publicInstance.componentDidMount();
      }

      return renderedComponent;
    }
  }, {
    key: 'receive',
    value: function receive(oldState, newState) {
      var publicInstance = this.getPublicInstance();
      var previousRender = this.renderedComponent;
      var newRender = publicInstance.render();

      previousRender.innerHTML = newRender.innerHTML;

      this.renderedComponent = previousRender;
    }
  }]);

  return CompositeComponent;
}();

var HostComponent = function () {
  function HostComponent(element) {
    _classCallCheck(this, HostComponent);

    this.currentElement = element;
    this.renderedChildren = [];
    this.node = null;
  }

  _createClass(HostComponent, [{
    key: 'getHostNode',
    value: function getHostNode() {
      return this.node;
    }
  }, {
    key: 'getPublicInstance',
    value: function getPublicInstance() {
      return this.node;
    }
  }, {
    key: 'mount',
    value: function mount() {
      var _currentElement2 = this.currentElement,
          type = _currentElement2.type,
          props = _currentElement2.props;

      var children = props.children || [];
      if (!Array.isArray(children)) {
        children = [children];
      }
      var node = document.createElement(type);
      children.forEach(function (child) {
        node.append(child);
      });
      this.node = node;
      return node;
    }
  }]);

  return HostComponent;
}();

var mount = function mount(type, config, children) {
  if (typeof type === 'function') {
    var comp = new type(config);
    return comp.render();
  } else if (typeof type === 'string') {
    var host = document.createElement(type);
    children.forEach(function (child) {
      host.append(child);
    });
    return host;
  }
};

window.React = {
  Component: function () {
    function Component(props) {
      _classCallCheck(this, Component);

      this.props = props;
    }

    _createClass(Component, [{
      key: 'setState',
      value: function setState(newState) {
        this.state = Object.assign({}, this.state, newState);
        this._compositeInstance.receive(this.state, newState);
      }
    }]);

    return Component;
  }(),
  createElement: function createElement(type, config) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    var props = !!config ? _extends({}, config, { children: children }) : { children: children };
    var element = instantiateComponent({ type: type, props: props });
    return element.mount();
  }
};

window.ReactDOM = {
  render: function render(comp, host) {
    if (!!host) {
      host.append(comp);
    }
  }
};
