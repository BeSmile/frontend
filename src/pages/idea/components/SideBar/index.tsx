import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import TreeView from '@mui/lab/TreeView';
import TreeItem, { TreeItemProps, treeItemClasses } from '@mui/lab/TreeItem';
import Typography from '@mui/material/Typography';
import FolderOpenIcon from '@mui/icons-material/FolderOpen';
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { SvgIconProps } from '@mui/material/SvgIcon';
import { TreeNodeType } from '@/pages/idea/types';
import { SideBarType } from '@/pages/idea/components/SideBar/types';

declare module 'react' {
  interface CSSProperties {
    '--tree-view-color'?: string;
    '--tree-view-bg-color'?: string;
  }
}

type StyledTreeItemProps = TreeItemProps & {
  bgColor?: string;
  color?: string;
  labelIcon: React.ElementType<SvgIconProps>;
  labelInfo?: string;
  labelText: string;
};

const StyledTreeItemRoot = styled(TreeItem)(({ theme }) => ({
  color: theme.palette.grey.A400,
  backgroundColor: theme.palette.primary.dark,
  [`& .${treeItemClasses.content}`]: {
    color: theme.palette.grey.A400,
    // borderTopRightRadius: theme.spacing(2),
    // borderBottomRightRadius: theme.spacing(2),
    paddingRight: theme.spacing(1),
    fontWeight: theme.typography.fontWeightMedium,
    '&.Mui-expanded': {
      fontWeight: theme.typography.fontWeightRegular,
    },
    '&:hover': {
      backgroundColor: theme.palette.action.hover,
    },
    '&.Mui-focused, &.Mui-selected, &.Mui-selected.Mui-focused': {
      backgroundColor: `var(--tree-view-bg-color, ${theme.palette.primary.main})`,
      color: 'var(--tree-view-color)',
    },
    [`& .${treeItemClasses.label}`]: {
      fontWeight: 'inherit',
      color: 'inherit',
      paddingLeft: 0,
    },
  },
  [`& .${treeItemClasses.group}`]: {
    marginLeft: 0,
    [`& .${treeItemClasses.content}`]: {
      paddingLeft: theme.spacing(1),
    },
  },
}));

function StyledTreeItem(props: StyledTreeItemProps) {
  const { bgColor, color, labelIcon: LabelIcon, labelInfo, labelText, ...other } = props;

  return (
    <StyledTreeItemRoot
      label={
        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }}>
          <Box component={LabelIcon} color="inherit" sx={{ mr: 1 }} />
          <Typography variant="body2" sx={{ fontWeight: 'inherit', flexGrow: 1 }}>
            {labelText}
          </Typography>
          <Typography variant="caption" color="inherit">
            {labelInfo}
          </Typography>
        </Box>
      }
      style={{
        '--tree-view-color': color,
        '--tree-view-bg-color': bgColor,
      }}
      {...other}
    />
  );
}

/**
 * 结构目录
 * @constructor
 */
export const SideBar: React.FC<SideBarType> = ({ projectFiles, onNodeSelect, activated }) => {
  const theme = useTheme();

  const generateTreeNode = (files: TreeNodeType[]) => {
    return (
      files.map((file: TreeNodeType) => (
        <StyledTreeItem
          key={file.key}
          nodeId={file.key}
          labelText={file.path}
          labelIcon={SupervisorAccountIcon}
          // labelInfo="90"
          // color="#1a73e8"
          // bgColor="#e8f0fe"
        >
          {generateTreeNode(file.children)}
        </StyledTreeItem>
      )) || []
    );
  };

  return (
    <TreeView
      selected={activated?.key || ''}
      onNodeSelect={onNodeSelect}
      aria-label="tree"
      defaultCollapseIcon={<ArrowDropDownIcon />}
      defaultExpandIcon={<ArrowRightIcon />}
      defaultEndIcon={<div style={{ width: 24 }} />}
      sx={{ height: '100%', flexGrow: 0, width: 240, overflowY: 'auto', backgroundColor: theme.palette.primary.dark }}
    >
      <StyledTreeItem nodeId="0" labelText="Project Name" labelIcon={FolderOpenIcon}>
        {generateTreeNode(projectFiles)}
      </StyledTreeItem>
    </TreeView>
  );
};

export default SideBar;
