# tableView

- 1、一般 TableView 的增加、删除、插入的操作时，处理完数据源后，我们直接调用相应的方法，例如
  - 1）.最常见的，网络请求回来的数据，我们处理完数据源之后，会调用 reloadData。
  - 2）.删除数据源某一项，对应调用 deleteRowsAtIndexPaths: withRowAnimation:。切记不能调用处理数据源后，未调用相应更新列表的方法。
- 2、[_tableView beginUpdates/endUpdates];调用时不能同时改变数据源，我们项目因某些逻辑需求，确实造成了同时修改数据源的风险，后续解决办法是，将数据源加锁，并在[_tableView beginUpdates/endUpdates];调用时也加锁，以保证数据源的安全性。
