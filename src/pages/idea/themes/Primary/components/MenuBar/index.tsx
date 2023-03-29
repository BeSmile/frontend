import { createStyles, makeStyles } from '@mui/styles';
import React from 'react';
import { Theme } from '@mui/material/styles';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      backgroundColor: theme.palette.primary.dark,
      height: '100%',
    },
  }),
);

export const MenuBar = () => {
  const styles = useStyles();
  return <div className={styles.root}>123</div>;
};

export default MenuBar;
