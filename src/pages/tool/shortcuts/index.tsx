/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-03-08 11:26:53
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-05-28 11:46:40
 */
import React, { memo } from 'react';
import classnames from 'classnames/bind';
import Card from '@mui/material/Card';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import CardContent from '@mui/material/CardContent';
import styles from './index.module.less';

const cx = classnames.bind(styles);

interface ShortcutsProps {
  needShow?: boolean;
}

//
const ShortcutsFC: React.FC<ShortcutsProps> = memo(
  () => {
    return (
      <section className={cx('short')}>
        <Grid>
          <Grid item xs={6}>
            <Card>
              <CardContent>
                <Typography variant="h4">标题画面</Typography>
                demo test
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </section>
    );
  },
  (pre: ShortcutsProps, next: ShortcutsProps) => {
    return pre?.needShow === next?.needShow || true;
  },
);

export default ShortcutsFC;
