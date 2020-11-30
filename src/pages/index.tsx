import React, { useEffect, useRef, useState } from 'react';
import styles from './animate.less';
import { autoPlay, elementTop, flagText } from '@/util';
import ReactDOM from 'react-dom';

const Home = () => {
  const scrollRef = useRef(null);
  const [flag, setFlag] = useState(null);
  const [oldFlag] = useState('down');

  useEffect(() => {
    if (scrollRef?.current && flag) {
      let scrollDom = [<div />];
      if (flag === 'up') {
        scrollRef.current.style.top = 0;
        scrollDom = [
          <div className={styles.scrollChild}>{flagText(oldFlag)}</div>,
          <div className={styles.scrollChild}>上升</div>,
        ];
      } else if (flag === 'down') {
        scrollRef.current.style.top = `-50px`;
        scrollDom = [
          <div className={styles.scrollChild}>下降</div>,
          <div className={styles.scrollChild}>{flagText(oldFlag)}</div>,
        ];
      }
      ReactDOM.render([...scrollDom], scrollRef.current);
      if (flag) {
        autoPlay({
          current: scrollRef.current,
          time: 10,
          endCount: flag === 'up' ? -50 : 0,
        });
      }
    }
  }, [flag]);

  return (
    <>
      <div className={styles.scrollList}>
        <div ref={scrollRef} className={styles.scrollView}>
          <div className={styles.scrollChild}>0</div>,
        </div>
      </div>
      <div
        onClick={() => {
          setFlag(flag === 'up' ? 'down' : 'up');
        }}
      >
        按钮
      </div>
    </>
  );
};

export default Home;
