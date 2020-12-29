import React, { Component } from 'react';
import Child from './Child';
class ScrollingList extends Component<any, any> {
  listRef = null;
  state = {
    error: false,
  };

  getSnapshotBeforeUpdate(prevProps, prevState) {
    // 我们正在向列表中添加新项吗？
    // 捕获滚动位置，以便我们稍后可以调整滚动位置。
    if (prevProps.list.length < this.props.list.length) {
      console.log(
        this.listRef.scrollHeight,
        this.listRef.scrollTop,
        'this.listRef.scrollHeight - this.listRef.scrollTop',
      );
      return this.listRef.scrollHeight - 10;
    }
    return null;
  }

  componentDidUpdate(prevProps, prevState, snapshot) {
    // throw new Error('123');
    // 如果我们刚刚添加了新项，并且有了快照值。
    // 调整滚动位置，以便这些新项不会把旧项挤出视图。
    // （此处的快照是从 getSnapshotBeforeUpdate 返回的值）
    if (snapshot !== null) {
      // this.listRef.scrollTop = this.listRef.scrollHeight - snapshot;
      this.listRef.scrollTop = snapshot;

      console.log(this.listRef.scrollTop, this.listRef.scrollHeight, snapshot);
    }
  }

  componentDidCatch(error, errorInfo) {
    console.log(error, errorInfo, '错误信息');
    this.setState({
      error: true,
    });
  }

  render() {
    const { list } = this.props;
    const { error } = this.state;
    return (
      <div
        ref={this.setListRef}
        style={{ height: 50, overflow: 'auto' }}
        className="test"
      >
        {Array.isArray(list) &&
          list.map(item => {
            return <div style={{ height: 20, background: 'red' }}>{item}</div>;
          })}
        {error ? <Child /> : <span>错误错误</span>}
      </div>
    );
  }

  setListRef = ref => {
    this.listRef = ref;
  };
}

export default ScrollingList;

// 错误边界无法捕获以下场景中产生的错误：

// - 事件处理（了解更多）
// - 异步代码（例如 setTimeout 或 requestAnimationFrame 回调函数）
// - 服务端渲染
// - 它自身抛出来的错误（并非它的子组件）