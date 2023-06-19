import React from 'react';
import Box from '@mui/material/Box';
import { TextField, MenuItem, Container } from '@mui/material';
import { getEncryptionType } from './cosnt';
import { useForm } from 'react-hook-form';
import Button from '@mui/material/Button';

const modes = getEncryptionType();

// type HtpasswdFormValue = {
//   username: string;
//   password: string;
//   mode: ENCRYPTION_TYPE;
// };

/**
 * 加密
 * https://hostingcanada.org/htpasswd-generator
 * @constructor
 */
const Htpasswd: React.FC = () => {
  const {
    register,
    // handleSubmit,
    formState: { errors, defaultValues },
  } = useForm({
    defaultValues: {
      username: '',
      password: '',
      mode: modes[0].value,
    },
  });

  // const handleEncryption = async (values: HtpasswdFormValue) => {
  //   const { mode } = values;
  //   console.log(mode);
  // };

  return (
    <Container disableGutters={true}>
      <Box
        component="form"
        aria-autocomplete="none"
        // onSubmit={handleSubmit(handleEncryption)}
        sx={{
          '& .MuiTextField-root': { marginBottom: 2, width: '100%' },
        }}
      >
        <TextField autoComplete="off" {...register('username', { required: true })} error={Boolean(errors.username)} label="username" />
        <TextField {...register('password', { required: true })} error={Boolean(errors.password)} type="password" label="password" />
        <TextField {...register('mode', { required: true })} defaultValue={defaultValues?.mode} select label="mode">
          {modes.map((option) => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
        <Button type="submit" variant="contained">
          generate
        </Button>
      </Box>
    </Container>
  );
};

export default Htpasswd;
