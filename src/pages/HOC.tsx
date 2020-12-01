import React, { Component, forwardRef } from 'react';

const hocProps = WrapComponent => {
  class HocProps extends Component<any, any> {
    render() {
      const { forwardedRef, ...rest } = this.props;
      console.log(WrapComponent.displayName || WrapComponent.name);
      WrapComponent.displayName = `logProps(${name})`;
      return (
        <WrapComponent forwardedRef={forwardedRef} {...rest}></WrapComponent>
      );
    }
  }
  return forwardRef((props, ref) => {
    return <HocProps {...props} forwardedRef={ref} />;
  });
};

function logProps(Component) {
  class LogProps extends React.Component {
    // ...
    render() {
      return <Component />;
    }
  }

  function forwardRef(props, ref) {
    return <LogProps {...props} forwardedRef={ref} />;
  }

  // 在 DevTools 中为该组件提供一个更有用的显示名。
  // 例如 “ForwardRef(logProps(MyComponent))”
  // const name = Component.displayName || Component.name;
  // forwardRef.displayName = `logProps(${name})`;
  // console.log(forwardRef, 'forwardRef');
  return React.forwardRef(forwardRef);
}

const Test = props => {
  return <div ref={props.forwardedRef}>222</div>;
};
export default logProps(Test);
