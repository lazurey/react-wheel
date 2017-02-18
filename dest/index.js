'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var isClass = function isClass(type) {
  return !!type.prototype && !!type.prototype.isReactComponent;
};

// class Component {

// }

var HostComponent = function () {
  function HostComponent(props) {
    _classCallCheck(this, HostComponent);

    this.props = props;
  }

  _createClass(HostComponent, [{
    key: 'render',
    value: function render() {}
  }]);

  return HostComponent;
}();

var mount = function mount(type, config, children) {
  console.log('mounting ---', type, children);
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
        console.log('setting state ', newState);
        this.state = Object.assign({}, this.state, newState);
      }
    }]);

    return Component;
  }(),
  createElement: function createElement(type, config) {
    for (var _len = arguments.length, children = Array(_len > 2 ? _len - 2 : 0), _key = 2; _key < _len; _key++) {
      children[_key - 2] = arguments[_key];
    }

    var renderedComponent = mount(type, config, children);
    console.log(renderedComponent);
    return renderedComponent;
  }

};

window.ReactDOM = {
  render: function render(comp, host) {
    if (!!host) {
      host.append(comp);
    }
  }
};
