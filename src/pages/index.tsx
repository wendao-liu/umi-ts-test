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
import ScrollList from './ScrollList';
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
  state = {
    slist: [1, 23, 4, 5, 5],
  };
  static getDerivedStateFromError(err) {
    console.log(err, 'err');
  }

  componentDidMount() {
    console.log(ref, 'ref');
    setTimeout(() => {
      this.setState({
        slist: [...this.state.slist, 2, 2, 2],
      });
    }, 4000);
  }

  render() {
    const { slist } = this.state;
    return (
      <div>
        <ScrollList list={slist} />
      </div>
    );
  }
}

export default Home;
