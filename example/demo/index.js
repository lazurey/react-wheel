class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      count: 100
    }
  }

  componentDidMount() {
    console.log('component did mounting')
    setInterval(() => {
      this.setState({ count: this.state.count + 1})
    }, 1000)
  }

  render() {
    return (
      <div>
        <p>This is my React Counter { this.props.name }</p>
        <p>App count: {this.state.count}</p>
        <Counter name="ccccccc" parentCount={this.state.count} />
      </div>
    )
  }
}

class Counter extends React.Component {
  constructor(props) {
    super(props)
  }

  render() {
    return (
      <div>
        <h3>My name is { this.props.name }</h3>
        <p>parentCount: { this.props.parentCount }</p>
      </div>
    )
  }
}

ReactDOM.render(<App name="kkkkk" />, document.getElementById('root'));
// ReactDOM.render((<div id="haha"><h3>ddd</h3><p>ksksks</p></div>), document.getElementById('root'));
