import React from 'react';
import Snackbar from '@mui/material/Snackbar';

export default function SnackbarUI({ index, toast }: any) {
  // const handleClose = (event: React.SyntheticEvent | React.MouseEvent, reason?: string) => {
  //     if (reason === 'clickaway') {
  //         return;
  //     }
  //
  //     setOpen(false);
  // };

  return (
    <div>
      <Snackbar
        style={{ marginTop: index * 8 }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        open={true}
        autoHideDuration={6000}
        // onClose={handleClose}
        ContentProps={{
          'aria-describedby': 'message-id',
        }}
        message={<span id="message-id">{toast}</span>}
        //     action={[
        //         <Button key="undo" color="secondary" size="small" onClick={handleClose}>
        //             UNDO
        //         </Button>,
        //     <IconButton
        //         key="close"
        //         aria-label="close"
        //         color="inherit"
        //         className={classes.close}
        //         onClick={handleClose}
        //     >
        //         <CloseIcon />
        //     </IconButton>,
        // ]}
      />
    </div>
  );
}
