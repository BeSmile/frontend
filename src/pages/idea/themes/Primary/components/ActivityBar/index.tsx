import React from 'react';
import Box from '@mui/material/Box';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import IconButton from '@mui/material/IconButton';
import FolderCopyIcon from '@mui/icons-material/FolderCopy';
import SettingsIcon from '@mui/icons-material/Settings';
import ExtensionIcon from '@mui/icons-material/Extension';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.common.white,
      width: 48,
      height: '100%',
    },
    icon: {
      color: theme.palette.common.white,
    },
  }),
);

export const ActivityBar = () => {
  const styles = useStyles();
  return (
    <Box className={styles.root}>
      <IconButton color="primary" aria-label="project files" component="label">
        <FolderCopyIcon sx={{ fontSize: 24 }} className={styles.icon} />
      </IconButton>
      <IconButton color="primary" aria-label="extension" component="label">
        <ExtensionIcon sx={{ fontSize: 24 }} className={styles.icon} />
      </IconButton>
      <IconButton color="primary" aria-label="settings" component="label">
        <SettingsIcon sx={{ fontSize: 24 }} className={styles.icon} />
      </IconButton>
    </Box>
  );
};

export default ActivityBar;
