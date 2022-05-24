import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useState } from 'react';

interface CoonfirmDialogProps {
  isOpen: boolean,
  close: () => void,
  message: string,
  agreeMessage: string,
  onAgree: () => void
}

function ConfirmDialog(props: CoonfirmDialogProps) {
  const handleCancel = () => {
    props.close();
  };

  return (
    <Dialog
      open={props.isOpen}
      onClose={handleCancel}
    >
      <DialogTitle>
        {props.message}
      </DialogTitle>
      <DialogActions sx={{ p: 2 }}>
        <Button color='warning' onClick={() => {
          props.close();
          props.onAgree();
        }}>{props.agreeMessage}</Button>
        <Button color='primary' onClick={handleCancel} autoFocus>Отмена</Button>
      </DialogActions>
    </Dialog>
  );
}

export default ConfirmDialog;