import React from 'react';
import { connect } from 'react-redux';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import AppBar from '@mui/material/AppBar';
import Typography from '@mui/material/Typography';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Link from '@mui/material/Link';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
      textAlign: 'left',
      padding: theme.spacing(1),
    },
    demo: {
      backgroundColor: theme.palette.background.paper,
    },
    paper: {
      // padding: theme.spacing(1),
      textAlign: 'center',
      color: theme.palette.text.secondary,
      borderRadius: 0,
    },
  }),
);

function generate(element: React.ReactElement) {
  return [0, 1, 2].map((value) =>
    React.cloneElement(element, {
      key: value,
    }),
  );
}
const SGPanelUI = function SGPanel() {
  const classes = useStyles('');
  const [dense] = React.useState(false);

  return (
    <React.Fragment>
      <Grid container spacing={2}>
        <Grid item xs={4} md={3}>
          <Paper className={classes.paper}>
            <AppBar position="static">
              <Typography variant="h6" className={classes.title}>
                F1相关
              </Typography>
            </AppBar>
            <div className={classes.demo}>
              <List dense={dense}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Link
                        color="inherit"
                        // component={ReactLink}
                        href="/qqsg/resistance"
                      >
                        抗性表
                      </Link>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Link
                        color="inherit"
                        // component={ReactLink}
                        href="/qqsg/fore"
                      >
                        武力/智力表
                      </Link>
                    }
                  />
                </ListItem>
                <ListItem>
                  <ListItemText
                    primary={
                      <Link
                        color="inherit"
                        // component={ReactLink}
                        href="/qqsg/resistance"
                      >
                        韧性表
                      </Link>
                    }
                  />
                </ListItem>
              </List>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4} md={3}>
          <Paper className={classes.paper}>
            <AppBar position="static">
              <Typography variant="h6" className={classes.title}>
                奥义
              </Typography>
            </AppBar>
            <div className={classes.demo}>
              <List dense={dense}>
                <ListItem>
                  <ListItemText
                    primary={
                      <Link
                        color="inherit"
                        // component={ReactLink}
                        href="/qqsg/experience"
                      >
                        经验成长表
                      </Link>
                    }
                  />
                </ListItem>
              </List>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4} md={3}>
          <Paper className={classes.paper}>
            <AppBar position="static">
              <Typography variant="h6" className={classes.title}>
                News
              </Typography>
            </AppBar>
            <div className={classes.demo}>
              <List dense={dense}>
                {generate(
                  <ListItem>
                    <ListItemText
                      primary="Single-line item"
                      // secondary="Secondary text"
                    />
                  </ListItem>,
                )}
              </List>
            </div>
          </Paper>
        </Grid>
        <Grid item xs={4} md={3}>
          <Paper className={classes.paper}>
            <AppBar position="static">
              <Typography variant="h6" className={classes.title}>
                News
              </Typography>
            </AppBar>
            <div className={classes.demo}>
              <List dense={dense}>
                {generate(
                  <ListItem>
                    <ListItemText
                      primary="Single-line item"
                      // secondary="Secondary text"
                    />
                  </ListItem>,
                )}
              </List>
            </div>
          </Paper>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

const SGPanel = connect()(SGPanelUI);
export default SGPanel;
