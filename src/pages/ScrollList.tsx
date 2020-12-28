import React, { Component } from 'react';
class ScrollingList extends Component<any, any> {
  listRef = null;

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
    // 如果我们刚刚添加了新项，并且有了快照值。
    // 调整滚动位置，以便这些新项不会把旧项挤出视图。
    // （此处的快照是从 getSnapshotBeforeUpdate 返回的值）
    if (snapshot !== null) {
      // this.listRef.scrollTop = this.listRef.scrollHeight - snapshot;
      this.listRef.scrollTop = snapshot;

      console.log(this.listRef.scrollTop, this.listRef.scrollHeight, snapshot);
    }
  }

  render() {
    const { list } = this.props;
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
      </div>
    );
  }

  setListRef = ref => {
    this.listRef = ref;
  };
}

export default ScrollingList;
