import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Api from "../../Api/Api";
import { useField } from "../../Hooks/useField";
import snackbarService from "../../Services/SnackbarService";

interface CreateSectionDialogProps {
  isOpen: boolean,
  onClose: () => void 
}

function CreateSectionDialog(props: CreateSectionDialogProps) {
  const title = useField();
  const description = useField();

  const [isCreateSection, setIsCreateSection] = useState(false);

  const createSection = useCallback(async () => {
    if (isCreateSection) {
      return;
    }

    setIsCreateSection(true);
    const result = await Api.sections.createSection(title.value!, description.value!);
    if (!result.ensureSuccess()) {
      snackbarService.push('Ошибка при создании раздела', 'error');
    }
    setIsCreateSection(false);

    props.onClose();
  }, [title.value, description.value, isCreateSection]);

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
    >
      <DialogTitle id="alert-dialog-title">
        Создание раздела
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 3, width: 500 }}>
        <TextField sx={{ mt: 2 }} label="Название" onChange={title.onChange} value={title.value} />
        <TextField label="Описание"
          multiline
          rows={3}
          sx={{ mt: 2 }}
          onChange={description.onChange} 
          value={description.value} />
      </DialogContent>
      <DialogActions>
        <Button onClick={createSection} color='secondary'>Создать</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateSectionDialog;