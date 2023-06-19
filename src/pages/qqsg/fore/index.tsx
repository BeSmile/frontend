import React from 'react';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import clsx from 'clsx';
// import Grid from '@mui/material/Grid';
// import Typography from '@mui/material/Typography';
import InputAdornment from '@mui/material/InputAdornment';
import TextField from '@mui/material/TextField';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      width: '100%',
      marginTop: theme.spacing(3),
      overflowX: 'auto',
    },
    table: {
      minWidth: 650,
    },
    title: {
      textAlign: 'center',
    },
    total: {
      marginTop: theme.spacing(3),
      padding: theme.spacing(1),
    },
    margin: {
      margin: theme.spacing(1),
    },
    textField: {
      flexBasis: 200,
    },
  }),
);
const rows = [
  { from: 0, to: 1, money: 30000, energy: 5000, num: 1 },
  { from: 1, to: 2, money: 120000, energy: 10000, num: 1 },
  { from: 2, to: 3, money: 270000, energy: 15000, num: 1 },
  { from: 3, to: 4, money: 480000, energy: 20000, num: 1 },
  { from: 4, to: 5, money: 750000, energy: 25000, num: 1 },
  { from: 5, to: 6, money: 1080000, energy: 30000, num: 1 },
  { from: 6, to: 7, money: 1470000, energy: 35000, num: 1 },
  { from: 7, to: 8, money: 1920000, energy: 40000, num: 1 },
  { from: 8, to: 9, money: 2430000, energy: 45000, num: 2 },
  { from: 9, to: 10, money: 3000000, energy: 50000, num: 2 },
  { from: 10, to: 11, money: 3630000, energy: 55000, num: 2 },
  { from: 11, to: 12, money: 4320000, energy: 60000, num: 2 },
  { from: 12, to: 13, money: 5070000, energy: 65000, num: 3 },
  { from: 13, to: 14, money: 5880000, energy: 70000, num: 3 },
  { from: 14, to: 15, money: 6750000, energy: 75000, num: 3 },
  { from: 15, to: 16, money: 7680000, energy: 80000, num: 3 },
  { from: 16, to: 17, money: 8670000, energy: 85000, num: 3 },
  { from: 17, to: 18, money: 9720000, energy: 90000, num: 5 },
  { from: 18, to: 19, money: 10830000, energy: 95000, num: 5 },
  { from: 19, to: 20, money: 12000000, energy: 100000, num: 5 },
  { from: 20, to: 21, money: 13230000, energy: 105000, num: 5 },
  { from: 21, to: 22, money: 14520000, energy: 110000, num: 5 },
  { from: 22, to: 23, money: 15870000, energy: 115000, num: 5 },
  { from: 23, to: 24, money: 17280000, energy: 120000, num: 5 },
  { from: 24, to: 25, money: 18750000, energy: 125000, num: 5 },
  { from: 25, to: 26, money: 20280000, energy: 130000, num: 10 },
  { from: 26, to: 27, money: 21870000, energy: 135000, num: 10 },
  { from: 27, to: 28, money: 23520000, energy: 140000, num: 10 },
  { from: 28, to: 29, money: 25230000, energy: 145000, num: 10 },
  { from: 29, to: 30, money: 27000000, energy: 150000, num: 10 },
  { from: 30, to: 31, money: 28830000, energy: 155000, num: 10 },
  { from: 31, to: 32, money: 30720000, energy: 160000, num: 10 },
  { from: 32, to: 33, money: 32670000, energy: 165000, num: 10 },
  { from: 33, to: 34, money: 34680000, energy: 170000, num: 10 },
  { from: 34, to: 35, money: 36750000, energy: 175000, num: 10 },
  { from: 35, to: 36, money: 38880000, energy: 180000, num: 10 },
  { from: 36, to: 37, money: 41070000, energy: 185000, num: 10 },
  { from: 37, to: 38, money: 43320000, energy: 190000, num: 10 },
  { from: 38, to: 39, money: 45630000, energy: 195000, num: 10 },
  { from: 39, to: 40, money: 48000000, energy: 200000, num: 20 },
  { from: 40, to: 41, money: 50430000, energy: 205000, num: 20 },
  { from: 41, to: 42, money: 52920000, energy: 210000, num: 20 },
  { from: 42, to: 43, money: 55470000, energy: 215000, num: 20 },
  { from: 43, to: 44, money: 58080000, energy: 220000, num: 20 },
  { from: 44, to: 45, money: 60750000, energy: 225000, num: 40 },
  { from: 45, to: 46, money: 63480000, energy: 230000, num: 40 },
  { from: 46, to: 47, money: 66270000, energy: 235000, num: 40 },
  { from: 47, to: 48, money: 69120000, energy: 240000, num: 40 },
  { from: 48, to: 49, money: 72030000, energy: 245000, num: 40 },
  { from: 49, to: 50, money: 75000000, energy: 250000, num: 40 },
];

interface Row {
  money: number;
  num: number;
  energy: number;
}

const total = rows.reduce(
  (res: Row, item) => {
    return {
      money: res.money + item.money,
      energy: res.energy + item.energy,
      num: res.num + item.num,
    };
  },
  {
    money: 0,
    energy: 0,
    num: 0,
  },
);

interface BaseState {
  amount: string;
  start: string;
  end: string;
}

const Fore = function () {
  const classes = useStyles('');
  const [values, setValues] = React.useState<BaseState>({
    amount: '',
    start: '',
    end: '',
  });

  const [totals, setTotals] = React.useState<Row>({
    money: 0,
    energy: 0,
    num: 0,
  });

  const generateTotal = (values: BaseState) => {
    const { start, end } = values;
    const sliceArray = rows.slice(Number(start), Number(end));
    const total = sliceArray.reduce(
      (res: Row, item) => {
        return {
          money: res.money + item.money,
          energy: Number(res.energy) + Number(item.energy),
          num: res.num + item.num,
        };
      },
      {
        money: 0,
        energy: 0,
        num: 0,
      },
    );
    setTotals(total);
  };

  // useEffect(() => {
  //     generateTotal(values);
  // }, [values, totals])

  const handleChange = (prop: keyof BaseState) => (event: React.ChangeEvent<HTMLInputElement>) => {
    const valuesTmp = { ...values, [prop]: event.target.value };
    setValues(valuesTmp);
    generateTotal(valuesTmp);
  };

  return (
    <React.Fragment>
      <Paper className={classes.root}>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell align="center">当前等级</TableCell>
              <TableCell align="center">目标等级</TableCell>
              <TableCell align="center">精华</TableCell>
              <TableCell align="center">金钱</TableCell>
              <TableCell align="center">活力</TableCell>
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

            <TableRow>
              <TableCell rowSpan={3} colSpan={3} />
              <TableCell>精华：</TableCell>
              <TableCell align="center">{total.num}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>活力：</TableCell>
              <TableCell align="center">{total.energy}</TableCell>
            </TableRow>
            <TableRow>
              <TableCell>金钱：</TableCell>
              <TableCell align="center">{total.money / 10000}万</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
      <Paper className={classes.total}>
        <TextField
          id="outlined-adornment-start"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          label="起始等级"
          value={values.start}
          onChange={handleChange('start')}
          InputProps={{
            startAdornment: <InputAdornment position="start">lv</InputAdornment>,
          }}
        />
        <TextField
          id="outlined-adornment-end"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          label="目标等级"
          value={values.end}
          onChange={handleChange('end')}
          InputProps={{
            startAdornment: <InputAdornment position="start">lv</InputAdornment>,
          }}
        />
        <TextField
          id="outlined-adornment-amount"
          className={clsx(classes.margin, classes.textField)}
          variant="outlined"
          label="爱爱爱的活力"
          value={values.amount}
          onChange={handleChange('amount')}
          InputProps={{
            startAdornment: <InputAdornment position="start">￥</InputAdornment>,
          }}
        />
        <TextField
          disabled
          id="standard-disabled"
          label="精华"
          value={totals.num}
          // defaultValue={totals.num}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="金钱"
          value={totals.money}
          // defaultValue={totals.money}
          className={classes.textField}
          margin="normal"
        />
        <TextField
          disabled
          id="standard-disabled"
          label="活力"
          value={totals.energy}
          // defaultValue={totals.energy}
          className={classes.textField}
          margin="normal"
        />
      </Paper>
    </React.Fragment>
  );
};

export default Fore;
