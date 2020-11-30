import React, { Component, Suspense } from 'react';

interface P {}
interface S {}
class Test extends Component<P, S> {
  render() {
    return <div>123</div>;
  }
}

export default Test;
