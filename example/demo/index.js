class App extends React.Component {
  render() {
    return (
      <div>
        <p>This is my React Counter { this.props.name }</p>
        <p>hahah</p>
        <Counter name="ccccccc" />
      </div>
    )
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 0
    }
    setInterval(() => {
      this.setState({ count: this.state.count + 1})
    }, 10000)
  }

  render() {
    return (
      <div>
        <h3>My name is { this.props.name }</h3>
        <p>Count: { this.state.count }</p>
      </div>
    )
  }
}

ReactDOM.render(<App name="kkkkk" />, document.getElementById('root'));
// ReactDOM.render((<div><h3>ddd</h3><p>ksksks</p></div>), document.getElementById('root'));
