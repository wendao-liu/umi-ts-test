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
import HOC from './HOC';
interface P {}
interface S {}
const ref = React.createRef();


// Provider
// class Home extends Component<P, S> {
//   static getDerivedStateFromError(err) {
//     console.log(err,'err');
//   }
//   render() {
//     return (
//       <ThemeContext.Provider value="light">
//         <AnimalsContext.Provider value="cat">
//           <Toolbar />
//         </AnimalsContext.Provider>
//       </ThemeContext.Provider>
//     );
//   }
// }

class Home extends Component<P, S> {
  static getDerivedStateFromError(err) {
    console.log(err, 'err');
  }

  componentDidMount(){
    console.log(ref,'ref');
  }
  render() {
    return (
      <div>
        <HOC ref={ref}/>
      </div>
    );
  }
}

export default Home;
