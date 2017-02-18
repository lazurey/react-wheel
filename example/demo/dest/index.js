"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var App = function (_React$Component) {
  _inherits(App, _React$Component);

  function App(props) {
    _classCallCheck(this, App);

    var _this = _possibleConstructorReturn(this, (App.__proto__ || Object.getPrototypeOf(App)).call(this, props));

    _this.state = {
      count: 100
    };
    setInterval(function () {
      _this.setState({ count: _this.state.count + 1 });
    }, 3000);
    return _this;
  }

  _createClass(App, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "p",
          null,
          "This is my React Counter ",
          this.props.name
        ),
        React.createElement(
          "p",
          null,
          "hahah"
        ),
        React.createElement(Counter, { name: "ccccccc", parentCount: this.state.count })
      );
    }
  }]);

  return App;
}(React.Component);

var Counter = function (_React$Component2) {
  _inherits(Counter, _React$Component2);

  function Counter(props) {
    _classCallCheck(this, Counter);

    var _this2 = _possibleConstructorReturn(this, (Counter.__proto__ || Object.getPrototypeOf(Counter)).call(this, props));

    _this2.state = {
      count: 0
    };
    return _this2;
  }

  _createClass(Counter, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(
          "h3",
          null,
          "My name is ",
          this.props.name
        ),
        React.createElement(
          "p",
          null,
          "Count: ",
          this.state.count
        ),
        React.createElement(
          "p",
          null,
          "parentCount: ",
          this.props.parentCount
        )
      );
    }
  }]);

  return Counter;
}(React.Component);

ReactDOM.render(React.createElement(App, { name: "kkkkk" }), document.getElementById('root'));
// ReactDOM.render((<div id="haha"><h3>ddd</h3><p>ksksks</p></div>), document.getElementById('root'));