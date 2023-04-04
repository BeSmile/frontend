import { FILE_TYPE } from './const';
import { FILE_STAT } from '@/pages/idea/models/file';
export type TreeNodeType = {
  // label: string;
  // 内容
  code: string;
  // 代码路径
  path: string;
  // 编译后代码
  compiledCode?: string;
  key: string;
  type: FILE_TYPE;
  stat: FILE_STAT;
  children: TreeNodeType[];
};

export type TabType = {
  id: string;
  // 文件内容
  fileContent: TreeNodeType;
};
