import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import Api from "../../Api/Api";
import { Guid } from "../../Common/Types";
import { useField } from "../../Hooks/useField";
import snackbarService from "../../Services/SnackbarService";

interface CreateTopicDialogProps {
  isOpen: boolean,
  onClose: () => void,
  sectionId: Guid
}

function CreateTopicDialog(props: CreateTopicDialogProps) {
  const title = useField();
  const titleMessage = useField();

  const [isCreateSection, setIsCreateSection] = useState(false);

  const createTopic = useCallback(async () => {
    if (isCreateSection) {
      return;
    }

    setIsCreateSection(true);
    const result = await Api.topics.createTopic(title.value!, titleMessage.value!, props.sectionId);
    if (!result.ensureSuccess()) {
      snackbarService.push('Ошибка при создании темы', 'error');
    }
    setIsCreateSection(false);

    props.onClose();
  }, [title.value, titleMessage.value, isCreateSection]);

  return (
    <Dialog
      open={props.isOpen}
      onClose={props.onClose}
      fullWidth={true}
      maxWidth="lg"
    >
      <DialogTitle id="alert-dialog-title">
        Создание темы
      </DialogTitle>
      <DialogContent sx={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', p: 3 }}>
        <TextField sx={{ mt: 2 }} label="Заголовок" onChange={title.onChange} value={title.value} />
        <TextField label="Описание"
          multiline
          rows={8}
          sx={{ mt: 2 }}
          onChange={titleMessage.onChange} 
          value={titleMessage.value} />
      </DialogContent>
      <DialogActions>
        <Button onClick={createTopic} color='secondary'>Создать</Button>
      </DialogActions>
    </Dialog>
  )
}

export default CreateTopicDialog;