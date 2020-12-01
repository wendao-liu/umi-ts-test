import React, {
  Component,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import Toolbar from './Toolbar';
import styles from './index.less';
import { ThemeContext, AnimalsContext } from '@/pages/context';

interface P {}
interface S {}

class Home extends Component<P, S> {
  static getDerivedStateFromError(err) {
    console.log(err,'err');
  }
  render() {
    return (
      <ThemeContext.Provider value="light">
        <AnimalsContext.Provider value="cat">
          <Toolbar />
        </AnimalsContext.Provider>
      </ThemeContext.Provider>
    );
  }
}

export default Home;
