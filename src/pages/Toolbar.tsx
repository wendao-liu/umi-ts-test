import React, {
  Component,
  createContext,
  useEffect,
  useRef,
  useState,
} from 'react';
import styles from './index.less';
import { ThemeContext, AnimalsContext } from '@/pages/context';

interface P {}
interface S {}
class Toolbar extends Component<P, S> {
  // static contextType = ThemeContext;
  render() {
    return (
      <ThemeContext.Consumer>
        {txt => {
          return (
            <AnimalsContext.Consumer>
              {ani => (
                <div>
                  {txt}
                  {ani}
                </div>
              )}
            </AnimalsContext.Consumer>
          );
        }}
      </ThemeContext.Consumer>
    );
  }
}

export default Toolbar;
