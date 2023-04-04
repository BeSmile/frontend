import { TreeNodeType } from '@/pages/idea/types';

export type RequireType = (moduleName: string) => any;

export declare function require(moduleNames: string[], onLoad: (...args: any[]) => void): void;

export type Module = {
  exports?: any;
};

export type Message = {
  entry: string;
  source: TreeNodeType[];
};
