import React, { useEffect, useRef, useState } from 'react';
import styles from './index.less';
import { autoPlay } from '@/util';
import ReactDOM from 'react-dom';

interface HomProps {
  homoeBasicInfoList: Array<{
    oneDayTotalSum: number;
    thirtyDayAvgSum: number;
  }>;
  mode: string;
  countClick(): any;
}

const Home = (props: HomProps) => {
  const scrollRef = useRef(null);
  const { homoeBasicInfoList, mode = 'white', countClick } = props;

  const Child = ({ oldValue, newValue }) => {
    return (
      <div
        className={
          ~~oldValue >= ~~newValue
            ? mode && mode === 'white'
              ? styles['whiteDownCount']
              : styles['darkDownCount']
            : `${styles['whiteUpCount']} ${styles['darkUpCount']}`
        }
        onClick={() => {
          if (typeof countClick === 'function') {
            countClick();
          }
        }}
      >
        <div className={styles.scrollChild}>
          <span>
            {newValue ? `${newValue}`.replace(/\B(?=(\d{3})+(?!\d))/g, ',') : 0}
          </span>
          {~~oldValue > ~~newValue || ~~oldValue < ~~newValue ? (
            <font
              className={`iconfont ${
                ~~oldValue > ~~newValue ? 'iconDownWhite' : 'iconOn'
              }
            ${styles.countFont}
          `}
              style={{ fontSize: '30px' }}
            />
          ) : null}
        </div>
      </div>
    );
  };

  const upDown = ({
    oldThirtyCount,
    oldOneCount,
    newOneCount,
    newThirtyCount,
  }): { oldFlag: string; newFlag: string } => {
    let oldFlag = oldThirtyCount >= oldOneCount ? 'down' : 'up';
    let newFlag = newThirtyCount >= newOneCount ? 'down' : 'up';
    return {
      oldFlag,
      newFlag,
    };
  };

  useEffect(() => {
    if (
      scrollRef?.current &&
      Array.isArray(homoeBasicInfoList) &&
      homoeBasicInfoList.length > 1
    ) {
      const {
        oneDayTotalSum: oldOneCount,
        thirtyDayAvgSum: oldThirtyCount,
      } = homoeBasicInfoList[0];
      const {
        oneDayTotalSum: newOneCount,
        thirtyDayAvgSum: newThirtyCount,
      } = homoeBasicInfoList[1];

      // 值相等，则不滚动
      if (oldOneCount === newOneCount && oldThirtyCount === newThirtyCount) {
        return;
      }
      const { oldFlag, newFlag } = upDown({
        oldThirtyCount,
        oldOneCount,
        newOneCount,
        newThirtyCount,
      });
      let scrollDom = [];
      // 向上滚动
      if (newFlag === 'up') {
        scrollRef.current.style.top = 0;
        scrollDom = [
          Child({
            oldValue: oldThirtyCount,
            newValue: oldOneCount,
          }),
          Child({
            oldValue: newThirtyCount,
            newValue: newOneCount,
          }),
        ];
      } else if (newFlag === 'down') {
        // 向下滚动
        scrollRef.current.style.top = `-46px`;
        scrollDom = [
          Child({
            oldValue: newThirtyCount,
            newValue: newOneCount,
          }),
          Child({
            oldValue: oldThirtyCount,
            newValue: oldOneCount,
          }),
        ];
      }
      ReactDOM.render([...scrollDom], scrollRef.current);
      if (newFlag) {
        autoPlay({
          current: scrollRef.current,
          time: 10,
          endCount: newFlag === 'up' ? -46 : 0,
        });
      }
    }
  }, [homoeBasicInfoList]);

  return (
    <div className={styles.scrollList}>
      <div ref={scrollRef} className={styles.scrollView}>
        {Array.isArray(homoeBasicInfoList) &&
          Child({
            oldValue: homoeBasicInfoList[0].thirtyDayAvgSum,
            newValue: homoeBasicInfoList[0].oneDayTotalSum,
          })}
      </div>
    </div>
  );
};

export default Home;
