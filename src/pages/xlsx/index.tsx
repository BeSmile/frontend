import { useMount } from 'ahooks';
import React from 'react';

const XlsxComponent = () => {
  useMount(() => {
    const luckysheet = window?.luckysheet;
    if (!luckysheet) {
      return;
    }
    luckysheet?.create({
      container: 'luckysheet',
      // plugins:['chart'],
      title: '',
      allowCopy: false, // 是否允许拷贝
      showtoolbar: false, // 是否显示工具栏
      showinfobar: false, // 是否显示顶部信息栏
      showsheetbar: false, // 是否显示底部sheet页按钮
      showstatisticBar: false, // 是否显示底部计数栏
      sheetBottomConfig: false, // sheet页下方的添加行按钮和回到顶部按钮配置
      allowEdit: false, // 是否允许前台编辑
      enableAddRow: false, // 允许增加行
      enableAddCol: false, // 允许增加列
      userInfo: false, // 右上角的用户信息展示样式
      showRowBar: false, // 是否显示行号区域
      showColumnBar: false, // 是否显示列号区域
      sheetFormulaBar: false, // 是否显示公式栏
      enableAddBackTop: false, //返回头部按钮
      // rowHeaderWidth: 0,//纵坐标
      // columnHeaderHeight: 0,//横坐标
      showstatisticBarConfig: {
        count: false,
        view: false,
        zoom: false,
      },
      showsheetbarConfig: {
        add: false, //新增sheet
        menu: false, //sheet管理菜单
        sheet: false, //sheet页显示
      },
    });
  });
  const luckyCss = {
    margin: '0px',
    padding: '0px',
    position: 'absolute',
    width: '100%',
    height: '100%',
    left: '0px',
    top: '0px',
  } as React.CSSProperties;

  return <div id="luckysheet" style={luckyCss}></div>;
};

export default XlsxComponent;
