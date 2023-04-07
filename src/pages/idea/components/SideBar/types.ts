import { TreeNodeType } from '@/pages/idea/types';
import { SingleSelectTreeViewProps } from '@mui/lab/TreeView/TreeView';
import { TabbarProps } from '@/pages/idea/components/Tabbar/types';

export type SideBarType = {
  projectFiles: TreeNodeType[];
} & Pick<SingleSelectTreeViewProps, 'onNodeSelect'> &
  Pick<TabbarProps, 'activated'>;
