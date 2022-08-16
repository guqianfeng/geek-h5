import React, { Component } from "react";

export default class Counter extends Component {
  state = {
    count: 0,
  };
  clickHandler = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };
  render() {
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.clickHandler}>add</button>
      </div>
    );
  }
}
