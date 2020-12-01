import React, { useEffect, useRef, useState } from 'react';
import Animate from './animate/index';
import styles from './index.less';

const Home = () => {
  const [mode] = useState('white');
  const [flag, setFlag] = useState('up');
  const [homoeBasicInfoList, setHomoeBasicInfoList] = useState([
    {
      oneDayTotalSum: 10,
      thirtyDayAvgSum: 20,
    },
    {
      oneDayTotalSum: 30,
      thirtyDayAvgSum: 10,
    },
  ]);

  const countClick = () => {
    console.log('====================================');
    console.log('点击count');
    console.log('====================================');
  };

  const btnClick = () => {
    flag === 'up'
      ? setHomoeBasicInfoList([
          {
            oneDayTotalSum: 10,
            thirtyDayAvgSum: 20,
          },
          {
            oneDayTotalSum: 30,
            thirtyDayAvgSum: 10,
          },
        ])
      : setHomoeBasicInfoList([
          {
            oneDayTotalSum: 10,
            thirtyDayAvgSum: 20,
          },
          {
            oneDayTotalSum: 5,
            thirtyDayAvgSum: 20,
          },
        ]);
    setFlag(flag === 'up' ? 'down' : 'up');
  };
  return (
    <div className={styles.parent}>
      <Animate
        homoeBasicInfoList={homoeBasicInfoList}
        mode={mode}
        countClick={countClick}
      />

      <div className={styles.btn} onClick={btnClick}>
        按钮
      </div>
    </div>
  );
};

export default Home;
