import React from 'react';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import withStyles from '@mui/styles/withStyles';
import LinearProgress from '@mui/material/LinearProgress';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'fixed',
      top: 0,
      width: '100%',
    },
    margin: {
      margin: theme.spacing(0),
    },
  }),
);

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: '#b2dfdb',
  },
  barColorPrimary: {
    backgroundColor: '#00695c',
  },
})(LinearProgress);

export default function LinearProgressUI() {
  const classes = useStyles('');

  return (
    <div className={classes.root}>
      <ColorLinearProgress className={classes.margin} />
    </div>
  );
}
