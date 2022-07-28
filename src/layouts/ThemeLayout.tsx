/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-16 23:00:13
 */
import React from 'react';
import { createStyles, makeStyles } from '@material-ui/core/styles';
import { Outlet } from 'react-router-dom';
// import img from '@public/assets/bg.jpeg';

const useStyles = makeStyles(() =>
    createStyles({
        root: {
            flexGrow: 1
        },
        background: {
            // backgroundImage: `url(${img})`,
            height: '100%',
            backgroundRepeat: 'no-repeat',
            backgroundSize: 'cover'
        }
    })
);

const ThemeLayout = () => {
    const classes = useStyles();
    return (
        <div className={classes.background}>
            <Outlet />
        </div>
    );
};

export default ThemeLayout;
