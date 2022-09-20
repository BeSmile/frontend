/*
 * @Description: 普通custom, 用于主页
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-12-16 16:35:08
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-17 18:05:42
 */
import React from 'react';
import Header from './components/Header';
import MDrawer from './components/MDrawer';
import { Outlet } from 'react-router-dom';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import { CssBaseline, Toolbar } from '@mui/material';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            display: 'flex'
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        }
    })
);
type CustomLayoutProps = {
    // children?: React.ReactNode;
};
const CustomLayout: React.FC<CustomLayoutProps> = () => {
    const classes = useStyles('');
    return (
        <div className={classes.root}>
            <CssBaseline />
            <Header position="fixed" />
            <MDrawer />
            <main className={classes.content}>
                <Toolbar />
                <Outlet />
            </main>
        </div>
    );
};

export default CustomLayout;
