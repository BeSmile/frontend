/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-12-16 16:28:14
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-18 11:32:17
 */
import React from 'react';
import SearchIcon from '@material-ui/icons/Search';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@material-ui/icons/Home';
import {
    AppBar,
    Badge,
    Container,
    IconButton,
    InputBase,
    Toolbar,
    Typography
} from '@material-ui/core';
import { createStyles, fade, makeStyles, Theme } from '@material-ui/core/styles';
import MailIcon from '@material-ui/icons/Mail';
import AccountCircle from '@material-ui/icons/AccountCircle';
import NotificationsIcon from '@material-ui/icons/Notifications';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        appBar: {
            zIndex: theme.zIndex.drawer + 1
        },
        toolBar: {
            padding: 0
        },
        menuButton: {
            marginRight: theme.spacing(2)
        },
        title: {
            flexGrow: 1,
            display: 'none',
            [theme.breakpoints.up('sm')]: {
                display: 'block'
            }
        },
        search: {
            position: 'relative',
            borderRadius: theme.shape.borderRadius,
            backgroundColor: fade(theme.palette.common.white, 0.15),
            '&:hover': {
                backgroundColor: fade(theme.palette.common.white, 0.25)
            },
            marginLeft: 0,
            width: '100%',
            marginRight: theme.spacing(1),
            [theme.breakpoints.up('sm')]: {
                marginLeft: theme.spacing(1),
                width: 'auto'
            }
        },
        searchIcon: {
            width: theme.spacing(7),
            height: '100%',
            position: 'absolute',
            pointerEvents: 'none',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
        },
        inputRoot: {
            color: 'inherit'
        },
        inputInput: {
            padding: theme.spacing(1, 1, 1, 7),
            transition: theme.transitions.create('width'),
            width: '100%',
            [theme.breakpoints.up('sm')]: {
                width: 120,
                '&:focus': {
                    width: 200
                }
            }
        },
        container: {
            minHeight: 640
        },
        footer: {
            marginTop: theme.spacing(3),
            padding: theme.spacing(2)
        },
        sectionDesktop: {
            [theme.breakpoints.up('md')]: {
                display: 'flex'
            }
        }
    })
);

type HeaderProps = {
    position?: 'fixed' | 'static';
};

const Header: React.FC<HeaderProps> = ({ position = 'static' }) => {
    const classes = useStyles('');
    const navigate = useNavigate();
    return (
        <AppBar position={position} className={classes.appBar}>
            <Container maxWidth="lg">
                <Toolbar className={classes.toolBar}>
                    <IconButton
                        onClick={() => navigate('/')}
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <HomeIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        {/* <Link to="/">Home</Link> */}
                        👻👻👻
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div className={classes.sectionDesktop}>
                        <IconButton aria-label="show mails" color="inherit">
                            <Badge badgeContent={0} color="secondary">
                                <MailIcon />
                            </Badge>
                        </IconButton>
                        <IconButton aria-label="show mails" color="inherit">
                            <Badge badgeContent={11} color="secondary">
                                <NotificationsIcon />
                            </Badge>
                        </IconButton>
                        <IconButton edge="end" aria-label="account of current user" color="inherit">
                            <AccountCircle />
                        </IconButton>
                    </div>
                </Toolbar>
            </Container>
        </AppBar>
    );
};

export default Header;
