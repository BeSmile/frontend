/*
 * @Description: 用户qqsg的主题
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-12-16 16:35:08
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-18 11:35:41
 */
import React from "react";
import { connect } from "react-redux";
import { createStyles, fade, makeStyles, Theme, } from "@material-ui/core/styles";
import { Link, Outlet } from "react-router-dom";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import Paper from "@material-ui/core/Paper";

import Breadcrumbs from "@material-ui/core/Breadcrumbs";
import Header from "./components/Header";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    toolBar: {
      padding: 0,
    },
    paper: {
      // padding: theme.spacing(3, 2),
      margin: theme.spacing(2, 0, 2, 0),
    },
    img: {
      height: 200,
      width: "100%",
      objectFit: "cover",
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: "none",
      [theme.breakpoints.up("sm")]: {
        display: "block",
      },
    },
    search: {
      position: "relative",
      borderRadius: theme.shape.borderRadius,
      backgroundColor: fade(theme.palette.common.white, 0.15),
      "&:hover": {
        backgroundColor: fade(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        marginLeft: theme.spacing(1),
        width: "auto",
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: "100%",
      position: "absolute",
      pointerEvents: "none",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    },
    inputRoot: {
      color: "inherit",
    },
    inputInput: {
      padding: theme.spacing(1, 1, 1, 7),
      transition: theme.transitions.create("width"),
      width: "100%",
      [theme.breakpoints.up("sm")]: {
        width: 120,
        "&:focus": {
          width: 200,
        },
      },
    },
    container: {
      minHeight: 640,
    },
    footer: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(2),
    },
  })
);

// event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
function handleClick(index: number) {
  // event.preventDefault();
  let {
    global: { breadcrumbs = [] },
    dispatch,
  } = this;
  dispatch({
    type: "global/updateBreadcrumb",
    payload: {
      breadcrumbs: breadcrumbs.slice(0, index + 1),
    },
  });
}

function generate(bms, props): Array<React.ReactElement> {
  let breadcrumbs = JSON.parse(JSON.stringify(bms));
  const len = breadcrumbs.length;
  let TypographyUI = null;
  if (breadcrumbs.length >= 1) {
    const breadcrumb = breadcrumbs.pop();
    TypographyUI = React.cloneElement(
      <Typography key={len} color="textPrimary">
        {breadcrumb.name}
      </Typography>,
      {
        key: len,
      }
    );
  }
  let Ele = breadcrumbs.map((item, k) => (
    <Link
      key={k}
      color="inherit"
      // component={ReactLink}
      to={item.url}
      onClick={() => {
        handleClick.call(props, k);
      }}
    >
      {item.name}
    </Link>
  ));
  Ele.push(TypographyUI);
  return Ele;
}

function BaseLayoutUI(props: any) {
  const classes = useStyles("");
  const {
          global: { breadcrumbs = [] },
        } = props;
  
  return (
    <div className={classes.root}>
      <Header/>
      <CssBaseline/>
      <Container maxWidth="lg">
        <article className={classes.paper}>
          <Breadcrumbs aria-label="breadcrumb">
            {generate(
              breadcrumbs,
              props
            )}
          </Breadcrumbs>
        </article>
        <Paper className={classes.paper}>
          <img
            className={classes.img}
            src="http://game.gtimg.cn/images/sg/web201706/bg01.jpg"
          />
        </Paper>
        <Typography component="div" className={classes.container}>
          <Outlet/>
        </Typography>
      </Container>

      <Paper className={classes.footer}>---- ----</Paper>
    </div>
  );
}

interface defaultProps {
  // product: Array<any>
}

const mapToProps = (state): defaultProps => {
  return {
    global: state.global,
  };
};
const BaseLayout = connect(mapToProps)(BaseLayoutUI);
export default BaseLayout;
