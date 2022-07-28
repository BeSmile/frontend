// 生成material-ui表格
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@material-ui/core';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
// import { useTranslation } from 'react-i18next';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            position: 'fixed',
            top: 0,
            width: '100%'
        },
        margin: {
            margin: theme.spacing(0)
        },
        table: {
            minWidth: 650
        }
    })
);

const ImageList = () => {
    const classes = useStyles('');
    const rows = [];
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">REPOSITORY</TableCell>
                        <TableCell align="center">TAG</TableCell>
                        <TableCell align="center">IMAGE ID</TableCell>
                        <TableCell align="center">CREATED</TableCell>
                        <TableCell align="center">SIZE</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.from}>
                            <TableCell align="center">{row.from}</TableCell>
                            <TableCell align="center">{row.to}</TableCell>
                            <TableCell align="center">{row.num}</TableCell>
                            <TableCell align="center">{row.money}</TableCell>
                            <TableCell align="center">{row.energy}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default ImageList;
