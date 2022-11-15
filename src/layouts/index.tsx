import React from 'react';
import { connect } from 'react-redux';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { Link, Outlet, To } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Paper from '@mui/material/Paper';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Header from './components/Header';
import MDrawer from '@/layouts/components/MDrawer';
import { getThemeMedia } from '@/utils';
import { matchRoutePath } from '@/utils/route';

const useStyles = makeStyles((theme: Theme) => {
  const toolStyle = getThemeMedia('toolbar', theme);
  return createStyles({
    root: {
      display: 'flex',
    },
    toolBar: {
      padding: 0,
    },
    content: {
      flexGrow: 1,
      marginTop: toolStyle?.minHeight || 48,
      padding: theme.spacing(1),
    },
    paper: {
      margin: theme.spacing(2, 0, 2, 0),
    },
    img: {
      height: 200,
      width: '100%',
      objectFit: 'cover',
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
      display: 'none',
      [theme.breakpoints.up('sm')]: {
        display: 'block',
      },
    },
    container: {
      minHeight: 640,
    },
    footer: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(2),
    },
  });
});

// event: React.MouseEvent<HTMLAnchorElement, MouseEvent>
function handleClick(index: number) {
  const {
    global: { breadcrumbs = [] },
    dispatch,
  } = this;
  dispatch({
    type: 'global/updateBreadcrumb',
    payload: {
      breadcrumbs: breadcrumbs.slice(0, index + 1),
    },
  });
}

function generate(bms: any, props: any): Array<React.ReactElement> {
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
      },
    );
  }
  let Ele = breadcrumbs.map(
    (
      item: {
        url: To;
        name: string | number | boolean | React.ReactElement<any, string | React.JSXElementConstructor<any>> | React.ReactFragment | React.ReactPortal | null | undefined;
      },
      k: React.Key | null | undefined,
    ) => (
      <Link
        key={k}
        color="inherit"
        // component={ReactLink}
        to={item.url}
        onClick={() => {
          if (typeof k === 'number') {
            handleClick.call(props, k);
          }
        }}
      >
        {item.name}
      </Link>
    ),
  );
  Ele.push(TypographyUI);
  return Ele;
}

function BaseLayoutUI(props: any) {
  const match = matchRoutePath('/login');

  const classes = useStyles();

  const {
    global: { breadcrumbs = [] },
  } = props;
  if (match) {
    return <Outlet />;
  }
  return (
    <div className={classes.root}>
      <MDrawer />
      <Header position="fixed" />
      <main className={classes.content}>
        <CssBaseline />
        <Container maxWidth={false}>
          <article className={classes.paper}>
            <Breadcrumbs aria-label="breadcrumb">{generate(breadcrumbs, props)}</Breadcrumbs>
          </article>
          <Outlet />
        </Container>
        <Paper className={classes.footer}>---- ----</Paper>
      </main>
    </div>
  );
}

interface defaultProps {
  // product: Array<any>
}

const mapToProps = (state: { global: any }): defaultProps => {
  return {
    global: state.global,
  };
};
const BaseLayout = connect(mapToProps)(BaseLayoutUI);

export default BaseLayout;
