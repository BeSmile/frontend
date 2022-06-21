import React from "react";
import { createStyles, makeStyles, Theme, withStyles, } from "@material-ui/core/styles";
import LinearProgress from "@material-ui/core/LinearProgress";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: "fixed",
      top: 0,
      width: "100%",
    },
    margin: {
      margin: theme.spacing(0),
    },
  })
);

const ColorLinearProgress = withStyles({
  colorPrimary: {
    backgroundColor: "#b2dfdb",
  },
  barColorPrimary: {
    backgroundColor: "#00695c",
  },
})(LinearProgress);

export default function LinearProgressUI() {
  const classes = useStyles("");

  return (
    <div className={classes.root}>
      <ColorLinearProgress className={classes.margin}/>
    </div>
  );
}
