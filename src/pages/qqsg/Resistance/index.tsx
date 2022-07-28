import React from 'react';
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            width: '100%',
            marginTop: theme.spacing(3),
            overflowX: 'auto'
        },
        table: {
            minWidth: 650
        }
    })
);
const rows = [
    { from: 0, to: 1, money: 10000, energy: 500 },
    { from: 1, to: 2, money: 20000, energy: 1000 },
    { from: 2, to: 3, money: 30000, energy: 1500 },
    { from: 3, to: 4, money: 60000, energy: 3000 },
    { from: 4, to: 5, money: 120000, energy: 6000 },
    { from: 5, to: 6, money: 200000, energy: 10000 },
    { from: 6, to: 7, money: 300000, energy: 15000 },
    { from: 7, to: 8, money: 460000, energy: 23000 },
    { from: 8, to: 9, money: 640000, energy: 32000 },
    { from: 9, to: 10, money: 860000, energy: 43000 },
    { from: 10, to: 11, money: 1120000, energy: 56000 },
    { from: 11, to: 12, money: 1440000, energy: 72000 },
    { from: 12, to: 13, money: 1690000, energy: 84500 },
    { from: 13, to: 14, money: 1960000, energy: 98000 },
    { from: 14, to: 15, money: 2250000, energy: 112500 },
    { from: 15, to: 16, money: 2560000, energy: 128000 },
    { from: 16, to: 17, money: 2890000, energy: 144500 },
    { from: 17, to: 18, money: 3240000, energy: 162000 },
    { from: 18, to: 19, money: 3610000, energy: 180500 },
    { from: 19, to: 20, money: 3610000, energy: 200000 },
    { from: 20, to: 21, money: 4000000, energy: 220500 },
    { from: 21, to: 22, money: 4840000, energy: 242000 },
    { from: 22, to: 23, money: 5290000, energy: 264500 },
    { from: 23, to: 24, money: 5760000, energy: 288000 },
    { from: 24, to: 25, money: 6250000, energy: 312500 },
    { from: 25, to: 26, money: 6760000, energy: 338000 },
    { from: 26, to: 27, money: 7290000, energy: 364500 },
    { from: 27, to: 28, money: 7840000, energy: 392000 },
    { from: 28, to: 29, money: 8410000, energy: 420500 },
    { from: 29, to: 30, money: 9000000, energy: 450000 },
    { from: 30, to: 31, money: 9610000, energy: 480500 },
    { from: 31, to: 32, money: 10240000, energy: 512000 },
    { from: 32, to: 33, money: 10890000, energy: 544500 },
    { from: 33, to: 34, money: 11560000, energy: 578000 },
    { from: 34, to: 35, money: 12250000, energy: 612500 },
    { from: 35, to: 36, money: 12960000, energy: 648000 },
    { from: 36, to: 37, money: 13690000, energy: 684500 },
    { from: 37, to: 38, money: 14440000, energy: 722000 },
    { from: 38, to: 39, money: 15210000, energy: 760500 },
    { from: 39, to: 40, money: 16000000, energy: 800000 },
    { from: 40, to: 41, money: 84000000, energy: 840000 },
    { from: 41, to: 42, money: 88000000, energy: 880000 },
    { from: 42, to: 43, money: 92000000, energy: 920000 },
    { from: 43, to: 44, money: 96000000, energy: 960000 },
    { from: 44, to: 45, money: 106000000, energy: 1060000 },
    { from: 45, to: 46, money: 111000000, energy: 1110000 },
    { from: 46, to: 47, money: 116000000, energy: 1160000 },
    { from: 47, to: 48, money: 121000000, energy: 1210000 },
    { from: 48, to: 49, money: 126000000, energy: 1260000 },
    { from: 49, to: 50, money: 146000000, energy: 1460000 }
];

// function createData(name: string, calories: number, fat: number, carbs: number, protein: number) {
//     return { name, calories, fat, carbs, protein };
// }

// const rows = [
//     createData('Frozen yoghurt', 159, 6.0, 24, 4.0),
//     createData('Ice cream sandwich', 237, 9.0, 37, 4.3),
//     createData('Eclair', 262, 16.0, 24, 6.0),
//     createData('Cupcake', 305, 3.7, 67, 4.3),
// ];

const Resistance = function () {
    const classes = useStyles('');
    return (
        <Paper className={classes.root}>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell align="center">当前等级</TableCell>
                        <TableCell align="center">目标等级</TableCell>
                        <TableCell align="center">金钱</TableCell>
                        <TableCell align="center">活力</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {rows.map((row) => (
                        <TableRow key={row.from}>
                            <TableCell align="center">{row.from}</TableCell>
                            <TableCell align="center">{row.to}</TableCell>
                            <TableCell align="center">{row.money}</TableCell>
                            <TableCell align="center">{row.energy}</TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </Paper>
    );
};

export default Resistance;
