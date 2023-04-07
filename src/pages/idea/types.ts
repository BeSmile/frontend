import { FILE_TYPE } from './const';
import { FILE_STAT } from '@/pages/idea/models/file';
import { DirectoryNode, FileNode } from '@webcontainer/api';
export type TreeNodeType = {
  // 内容
  code: string;
  // 代码路径,也等于是名称
  path: string;
  // 编译后代码
  compiledCode?: string;
  key: string;
  type: FILE_TYPE;
  stat: FILE_STAT;
  node: DirectoryNode | FileNode;
  children: TreeNodeType[];
};

export type TabType = {
  id: IdType;
  // 文件内容
  fileContent: TreeNodeType;
};

export type IdType = number | string;
