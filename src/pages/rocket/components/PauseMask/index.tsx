import * as React from 'react';
import Dialog from '@mui/material/Dialog';
import { TransitionProps } from '@mui/material/transitions';
import { DialogProps } from '@mui/material/Dialog/Dialog';
import { Fade } from '@mui/material';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement;
  },
  ref: React.Ref<unknown>,
) {
  return <Fade ref={ref} {...props} />;
});

const PauseMak: React.FC<Pick<DialogProps, 'open'>> = ({ open }) => {
  return (
    <div>
      <Dialog fullScreen open={open} PaperProps={{ style: { backgroundColor: 'rgba(255, 255, 255, 0.5)' } }} TransitionComponent={Transition}>
        <Box
          sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            backgroundColor: 'transparent',
            width: '100%',
          }}
        >
          <Typography variant="body1" component="p">
            输入任意键取消暂停
          </Typography>
        </Box>
      </Dialog>
    </div>
  );
};

export default PauseMak;
