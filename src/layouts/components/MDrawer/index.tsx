/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-12-16 17:03:08
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-18 11:23:36
 */
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import {
    Divider,
    Drawer,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Toolbar
} from '@mui/material';
import MailIcon from '@mui/icons-material/Mail';
import InboxIcon from '@mui/icons-material/MoveToInbox';

const drawerWidth = 240;

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        drawer: {
            width: drawerWidth,
            flexShrink: 0
        },
        drawerPaper: {
            width: drawerWidth
        },
        drawerContainer: {
            overflow: 'auto'
        },
        content: {
            flexGrow: 1,
            padding: theme.spacing(3)
        }
    })
);

const menus = [
    [
        {
            name: 'qqsg',
            path: '/qqsg'
        },
        {
            name: '你画我猜',
            path: '/game/draw'
        },
        {
            name: '俄罗斯方块',
            path: '/game/tetris'
        }
    ],
    [
        {
            name: '编辑器',
            path: '/build/design'
        }
    ],
    [
        {
            name: 'preview',
            path: '/css/mapPreview'
        },
        {
            name: 'mask',
            path: '/css/mask'
        }
    ]
];

const MDrawer: React.FC = () => {
    const classes = useStyles();
    const navigate = useNavigate();
    return (
        <Drawer
            className={classes.drawer}
            variant="permanent"
            classes={{
                paper: classes.drawerPaper
            }}
        >
            <Toolbar />
            <div className={classes.drawerContainer}>
                {menus.map((menuItem, i) => (
                    <React.Fragment key={`menu-${i}`}>
                        <List>
                            {menuItem.map((menu, index) => (
                                <ListItem button key={menu.name}>
                                    <ListItemIcon>
                                        {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
                                    </ListItemIcon>
                                    <ListItemText
                                        onClick={() => navigate(menu.path)}
                                        primary={menu.name}
                                    />
                                </ListItem>
                            ))}
                        </List>
                        {i % 2 === 0 && <Divider />}
                    </React.Fragment>
                ))}
            </div>
        </Drawer>
    );
};

export default MDrawer;
