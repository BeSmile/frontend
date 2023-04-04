import { FileSystemTree } from '@webcontainer/api';
import { v4 as uuidv4 } from 'uuid';
import { FILE_TYPE } from '../const';
import { TreeNodeType } from '../types';
import { FILE_STAT } from '@/pages/idea/models/file';

export const iniRemoteFiles = (originFile: FileSystemTree, root: string = ''): TreeNodeType[] => {
  const keys = Object.keys(originFile);

  return keys.map((label: string) => {
    const fileObject = originFile[label];
    const isDirectory = 'directory' in fileObject;
    return {
      label,
      path: [root, label].join('/'),
      key: uuidv4(),
      stat: FILE_STAT.NEW_FILE,
      code: isDirectory ? '' : fileObject.file.contents,
      type: isDirectory ? FILE_TYPE.DIRECTORY : FILE_TYPE.FILE,
      children: isDirectory ? iniRemoteFiles(fileObject.directory, label) : [],
    } as TreeNodeType;
  });
};
