interface AutoPlay {
  current: HTMLElement;
  endCount: number;
  time: number;
}

export const flagText = str => {
  return str ? (str === 'up' ? '上升' : '下降') : null;
};

export const elementTop = el => {
  return el ? ~~el.split('px')[0] : 0;
};

export const autoPlay = ({ current, endCount, time }: AutoPlay) => {
  let timer = null;
  //top -50 endCount -100 // 上升
  //top -50 endCount 0 // 下降
  clearInterval(timer);
  timer = setInterval(() => {
    let top = elementTop(current.style.top);
    if (top == endCount) {
      clearInterval(timer);
      return;
    } else {
      if (top < endCount) {
        top++;
      } else {
        top--;
      }
    }
    console.log(top, 'Top', current.style.top);
    current.style.top = `${top}px`;
  }, time);
};
