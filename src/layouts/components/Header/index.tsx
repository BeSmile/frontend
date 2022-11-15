/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-12-16 16:28:14
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-18 11:32:17
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import { AppBar, Badge, IconButton, Toolbar, Typography } from '@mui/material';
import { alpha, Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import MailIcon from '@mui/icons-material/Mail';
import AccountCircle from '@mui/icons-material/AccountCircle';
import NotificationsIcon from '@mui/icons-material/Notifications';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    appBar: {
      zIndex: theme.zIndex.drawer + 1,
    },
    toolBar: {
      padding: 0,
      margin: 0,
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
    search: {
      position: 'relative',
      borderRadius: theme.shape.borderRadius,
      backgroundColor: alpha(theme.palette.common.white, 0.15),
      '&:hover': {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
      },
      marginLeft: 0,
      width: '100%',
      marginRight: theme.spacing(1),
      [theme.breakpoints.up('sm')]: {
        marginLeft: theme.spacing(1),
        width: 'auto',
      },
    },
    searchIcon: {
      width: theme.spacing(7),
      height: '100%',
      position: 'absolute',
      pointerEvents: 'none',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    sectionDesktop: {
      [theme.breakpoints.up('md')]: {
        display: 'flex',
      },
    },
  }),
);

type HeaderProps = {
  position?: 'fixed' | 'static';
};

const Header: React.FC<HeaderProps> = ({ position = 'static' }) => {
  const classes = useStyles('');
  const navigate = useNavigate();
  return (
    <AppBar position={position} className={classes.appBar}>
      <Toolbar className={classes.toolBar}>
        <IconButton onClick={() => navigate('/')} edge="start" className={classes.menuButton} color="inherit" aria-label="open drawer" size="large">
          <HomeIcon />
        </IconButton>
        <Typography className={classes.title} variant="h6" noWrap>
          👻👻👻
        </Typography>
        <div className={classes.sectionDesktop}>
          <IconButton aria-label="show mails" color="inherit" size="large">
            <Badge badgeContent={0} color="secondary">
              <MailIcon />
            </Badge>
          </IconButton>
          <IconButton aria-label="show mails" color="inherit" size="large">
            <Badge badgeContent={11} color="secondary">
              <NotificationsIcon />
            </Badge>
          </IconButton>
          <IconButton edge="end" aria-label="account of current user" color="inherit" size="large">
            <AccountCircle />
          </IconButton>
        </div>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
