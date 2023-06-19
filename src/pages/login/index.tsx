/*
 * @Description:
 * @Version:
 * @Author: BeSmile
 * @Date: 2021-01-15 12:19:27
 * @LastEditors: BeSmile
 * @LastEditTime: 2021-12-16 23:29:12
 */
import React, { useRef } from 'react';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import makeStyles from '@mui/styles/makeStyles';
import createStyles from '@mui/styles/createStyles';
import { Theme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bg: {
      position: 'relative',
      width: '100%',
      height: '100%',
    },
    container: {
      width: 420,
      height: 'auto',
      position: 'absolute',
      padding: theme.spacing(2, 2, 0),
      right: '10%',
      top: 'calc(40% - 100px)',
    },
  }),
);

const BaseLogin = () => {
  const classes = useStyles();
  const noiseMapRef = useRef<any>(null);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      password: '',
    },
  });

  const handleLogin = (values: any) => {
    console.log(values, 'values');
  };

  return (
    <div className={classes.bg}>
      {/*<NoiseMap ref={noiseMapRef}/>*/}
      <Card className={classes.container} sx={{ minWidth: 275 }}>
        <Box
          onSubmit={handleSubmit(handleLogin)}
          component="form"
          sx={{
            '& .MuiTextField-root': { marginBottom: 2, width: '100%' },
          }}
        >
          <TextField {...register('name', { required: true })} error={Boolean(errors.name)} label="账号" onChange={() => noiseMapRef?.current?.up()} />
          <TextField {...register('password', { required: true })} error={Boolean(errors.password)} label="密码" />
          <Button type="submit" variant="contained">
            登录
          </Button>
        </Box>
      </Card>
    </div>
  );
};

export default BaseLogin;
