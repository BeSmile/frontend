import { FileSystemTree } from '@webcontainer/api';
import { v4 as uuidv4 } from 'uuid';
import { FILE_TYPE } from '../const';
import { TreeNodeType } from '../types';
import { FILE_STAT } from '@/pages/idea/models/file';

export type NodeGraph = { [key: string]: TreeNodeType };

export function iniRemoteFiles(originFile: FileSystemTree, nodeGraph: NodeGraph = {}): TreeNodeType[] {
  const keys = Object.keys(originFile);

  return keys.map((label: string) => {
    const fileObject = originFile[label];
    const isDirectory = 'directory' in fileObject;
    const key = uuidv4();
    const fileNode = {
      path: label,
      key,
      stat: FILE_STAT.NEW_FILE,
      code: isDirectory ? '' : fileObject.file.contents,
      type: isDirectory ? FILE_TYPE.DIRECTORY : FILE_TYPE.FILE,
      node: fileObject,
      children: isDirectory ? iniRemoteFiles(fileObject.directory, nodeGraph) : [],
    } as TreeNodeType;
    nodeGraph[key] = fileNode;
    return fileNode;
  });
}
