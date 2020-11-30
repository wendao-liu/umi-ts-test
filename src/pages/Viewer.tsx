import React, { Component, Suspense, useEffect, useRef } from 'react';
import MyErrorBoundary from './MyErrorBoundary';
import TestB from './test';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Viewer from 'viewerjs';
import 'viewerjs/src/css/viewer.css';

import styles from './index.less';
import './index.less';
import 'animate.css';

import img1 from '../images/tibet-1.jpg';
import img2 from '../images/tibet-2.jpg';
import img3 from '../images/tibet-3.jpg';

interface P {}
interface S {}
class Test extends Component<P, S> {
  render() {
    setTimeout(() => {
      console.log(222);
    }, 2000);
    return <div>123</div>;
  }
}

const SomeComponent = React.lazy(() => {
  return new Promise((resolve, reject) => {
    import('./test')
      .then(module => {
        setTimeout(() => {
          // resolve(module as any);    // 可行
          // resolve({ default: Test as never }); // 可行
        }, 2000);
      })
      .catch(err => {
        reject(err);
      });

    // 方案2
    new Promise(reslove2 => {
      //相当于在一个无返回的promise里面去执行上一个promise
      setTimeout(() => {
        resolve({ default: Test as never });
      }, 2000);
    });
  });
});

function MyComponent() {
  const ImgRef = useRef(null);

  useEffect(() => {
    var galley = document.getElementById('galley');
    const viewer = new Viewer(galley, {
      url: 'data-original',
    });
    return () => {
      viewer.destroy();
    };
  }, []);
  return (
    <div>
      <h1 className="animate__animated animate__bounce">An animated element</h1>
      <div className="animate__animated animate__bounce animate__delay-2s">
        Example
      </div>
      <div id="galley">
        <ul className={`${styles.pictures} pictures`}>
          <li>
            <img data-original={img1} src={img1} alt="Tibetan Plateau" />
          </li>
          <li>
            <img data-original={img2} src={img2} alt="Tibetan Plateau" />
          </li>
          <li>
            <img data-original={img3} src={img3} alt="Tibetan Plateau" />
          </li>
        </ul>
      </div>
    </div>
  );
}

export default MyComponent;
