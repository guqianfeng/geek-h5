import React, { Component } from "react";

export default class Counter extends Component {
  state = {
    count: 0,
  };
  clickHandler = () => {
    this.setState({
      count: this.state.count + 1,
      // count: 0,
    });
  };
  shouldComponentUpdate(nextProps: any, nextState: any) {
    return this.state.count !== nextState.count;
  }
  render() {
    console.log(">>>>>>>>>>>", this.state.count);
    return (
      <div>
        <h1>计数器：{this.state.count}</h1>
        <button onClick={this.clickHandler}>add</button>
      </div>
    );
  }
}
