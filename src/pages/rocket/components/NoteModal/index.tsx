import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DialogProps } from '@mui/material/Dialog/Dialog';
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import { useForm } from 'react-hook-form';
import { useEffect } from 'react';
import { useRequest } from 'ahooks';
import { postCambridgeWord } from '@/services/dictionary';

type NoteModalProps = Pick<DialogProps, 'open'> & {
  context: string;
  onClose: () => void;
};

const NoteModal: React.FC<NoteModalProps> = ({ context, onClose, open }) => {
  const { loading, run: fakeSaveNote } = useRequest(postCambridgeWord, {
    manual: true,
  });
  const handleClose = () => {
    onClose?.();
  };

  const handleAddNote = async (values: any) => {
    await fakeSaveNote({
      ...values,
      english: context,
    });
    onClose?.();
  };

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: {
      chinese: '',
    },
  });

  useEffect(() => {
    if (open) {
      reset();
    }
  }, [open, reset]);

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>笔记</DialogTitle>
      <DialogContent>
        <DialogContentText>{context}</DialogContentText>
        <Box component="form" id="note-form" sx={{ width: 360 }} onSubmit={handleSubmit(handleAddNote)}>
          <TextField {...register('chinese', { required: '释意不能为空' })} error={Boolean(errors.chinese)} autoFocus margin="dense" label="释意" fullWidth variant="standard" />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose}>Cancel</Button>
        <Button disabled={loading} form="note-form" type="submit">
          Subscribe
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default NoteModal;
