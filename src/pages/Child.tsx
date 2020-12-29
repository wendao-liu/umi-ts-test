import React, { Component } from 'react';

class Child extends Component<any, any> {
  componentDidMount() {
    throw new Error('123');
  }
  render() {
    return <div>222</div>;
  }
}

export default Child;
