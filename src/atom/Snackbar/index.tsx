import React from "react";
import { Theme } from "@mui/material/styles";
import createStyles from "@mui/styles/createStyles";
import makeStyles from "@mui/styles/makeStyles";
import Snackbar from "@mui/material/Snackbar";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    bottom1: {
      marginBottom: theme.spacing(0),
    },
    bottom2: {
      marginBottom: theme.spacing(8),
    },
    bottom3: {
      marginBottom: theme.spacing(16),
    },
  })
);

export default function SnackbarUI({ index, toast }: any) {
  const classes = useStyles("");
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
        className={classes[`bottom${index}`]}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        open={true}
        autoHideDuration={6000}
        // onClose={handleClose}
        ContentProps={{
          "aria-describedby": "message-id",
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
