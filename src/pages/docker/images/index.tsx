// 生成material-ui表格
import React from 'react';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { Theme } from '@mui/material/styles';
import createStyles from '@mui/styles/createStyles';
import makeStyles from '@mui/styles/makeStyles';
// import { useTranslation } from 'react-i18next';
import Paper from '@mui/material/Paper';
import { useMount, useRequest } from 'ahooks';
import { getImageList } from '@/services/docker/image';
import { first } from 'lodash';

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

const ImageList = () => {
  const classes = useStyles('');
  const { data: res, run: fakeImageList } = useRequest(getImageList, {
    manual: true,
  });

  useMount(() => {
    fakeImageList({
      pageNo: 1,
    });
  });

  return (
    <Paper className={classes.root}>
      <Table className={classes.table}>
        <TableHead>
          <TableRow>
            <TableCell align="center">TAG</TableCell>
            <TableCell align="center">IMAGE ID</TableCell>
            <TableCell align="center">CREATED</TableCell>
            <TableCell align="center">SIZE</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {res?.data?.data.map((row) => {
            const repoTags = first(row.RepoTags) || '';
            const nameTag = repoTags?.split(':');
            return (
              <TableRow key={row.Id}>
                <TableCell align="center">{nameTag?.[0] || '-'}</TableCell>
                <TableCell align="center">{nameTag?.[1] || '-'}</TableCell>
                <TableCell align="center">{row.Created}</TableCell>
                <TableCell align="center">{row.Size}</TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Paper>
  );
};

export default ImageList;
