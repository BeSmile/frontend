import Box from '@mui/material/Box';
import React from 'react';
import { createStyles } from '@mui/styles';
import makeStyles from '@mui/styles/makeStyles';
import { Theme } from '@mui/material/styles';
import { Typography } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.dark,
      height: '100%',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
  }),
);

export const EmptyTab = () => {
  const styles = useStyles();
  return (
    <Box component="div" className={styles.root}>
      <Typography variant="h3">NOT FOUND</Typography>
    </Box>
  );
};

export default EmptyTab;
