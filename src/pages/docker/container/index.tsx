// 生成material-ui表格
import React from 'react';
import { Button, Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
import Paper from '@mui/material/Paper';
import { useMount, useSafeState } from 'ahooks';
import { getContainerList, startContainerById, stopContainerById } from '@/services/docker/container';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
      position: 'fixed',
      top: 0,
      width: '100%',
    },
    margin: {
      margin: theme.spacing(0),
    },
    table: {
      minWidth: 650,
    },
  }),
);

const ContainerList = () => {
  const classes = useStyles('');
  const [dataSource, setDataSource] = useSafeState<any>([]);

  useMount(async () => {
    const res = await getContainerList();
    setDataSource(res?.data?.data || []);
  });

  const handleStop = async (record: any) => {
    await stopContainerById(record.Id);
  };

  const handleStart = async (record: any) => {
    await startContainerById(record.Id, {
      name: '111',
    });
  };

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">Id</TableCell>
            <TableCell align="center">Image</TableCell>
            <TableCell align="center">Ports</TableCell>
            <TableCell align="center">NetworkSettings</TableCell>
            <TableCell align="center">Mounts</TableCell>
            <TableCell align="center">Status</TableCell>
            <TableCell align="center">State</TableCell>
            <TableCell align="center">Created</TableCell>
            <TableCell align="center">Operation</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {dataSource.map((row: any) => (
            <TableRow key={row.Id}>
              <TableCell align="center">{row.Id}</TableCell>
              <TableCell align="center">{row.Image}</TableCell>
              <TableCell align="center">{1}</TableCell>
              <TableCell align="center">{1}</TableCell>
              <TableCell align="center">{1}</TableCell>
              <TableCell align="center">{row.Status}</TableCell>
              <TableCell align="center">{row.State}</TableCell>
              <TableCell align="center">
                <Button type="button">Delete</Button>
                <Button onClick={() => handleStop(row)} type="button">
                  STOP
                </Button>
                <Button onClick={() => handleStart(row)} type="button">
                  START
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ContainerList;
