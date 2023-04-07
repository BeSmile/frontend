import { TreeNodeType } from '@/pages/idea/types';

export type TabbarProps = {
  activeTabs: TreeNodeType[];
  activated?: TreeNodeType;
  onChange?(value: TreeNodeType): void;
  onRemoveItem?(value: TreeNodeType): void;
};
