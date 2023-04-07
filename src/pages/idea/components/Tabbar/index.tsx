import * as React from 'react';
import { styled } from '@mui/system';
import TabsListUnstyled from '@mui/base/TabsListUnstyled';
import TabUnstyled, { tabUnstyledClasses } from '@mui/base/TabUnstyled';
import IconButton from '@mui/material/IconButton';
import ClearIcon from '@mui/icons-material/Clear';
import Typography from '@mui/material/Typography';
import { TabbarProps } from './types';

const TabsList = styled(TabsListUnstyled)(({ theme }) => ({
  backgroundColor: theme.palette.primary.dark,
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-start',
  alignContent: 'center',
}));

const Tab = styled(TabUnstyled)(({ theme }) => ({
  color: '#fff',
  cursor: 'pointer',
  fontSize: (theme.typography as Record<any, any>).fontSize,
  whiteSpace: 'nowrap',
  backgroundColor: 'transparent',
  maxWidth: '140px',
  padding: `${theme.spacing(1)} ${theme.spacing(0.5)}`,
  border: 'none',
  display: 'flex',
  justifyContent: 'space-around',
  alignItems: 'center',
  height: 36,

  '&:hover': {
    backgroundColor: theme.palette.primary.main,
  },

  '&:focus': {
    // color: '#fff',
    outline: '3px solid ${blue[200]}',
  },

  [`&.${tabUnstyledClasses.selected}`]: {
    backgroundColor: theme.palette.primary.light,
    position: 'relative',
    // color: blue[600],
    '&::before': {
      content: "''",
      position: 'absolute',
      left: 0,
      right: 0,
      bottom: 0,
      height: 4,
      backgroundColor: theme.palette.primary.main,
    },
  },
}));

export const Tabbar: React.FC<TabbarProps> = ({ activeTabs, onChange, onRemoveItem }) => {
  return (
    <TabsList>
      {activeTabs.map((tab) => (
        <Tab value={tab.key} key={tab.key} onChange={() => onChange?.(tab)}>
          <Typography sx={{ mr: 1 }}>{tab.path}</Typography>
          <IconButton
            onClick={(e: any) => {
              e?.preventDefault();
              e?.stopPropagation();
              onRemoveItem?.(tab);
            }}
            sx={{ padding: 0, size: 8, color: 'grey' }}
            aria-label="upload picture"
            component="label"
          >
            <ClearIcon fontSize="small" />
          </IconButton>
        </Tab>
      ))}
    </TabsList>
  );
};

export default Tabbar;
