import { Send } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Paper, Stack, TextField, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Api/Api";
import { UserExtended } from "../../Api/Contracts/Common";
import { PrivateMessage } from "../../Api/Contracts/PrivateMessages";
import { getFilePath } from "../../Common/Helpers/WebFilesHelper";
import { Guid, Nullable } from "../../Common/Types";
import { useField } from "../../Hooks/useField";
import snackbarService from "../../Services/SnackbarService";
import userService from "../../Services/UserService";
import SimpleLink from "../Common/SimpleLink";

function PrivateChatPage() {
  const userId = userService.getUserId();
  const {collocutorId} = useParams<Guid>();
  const [collocutor, setCollocutor] = useState<Nullable<UserExtended>>(undefined);
  const [messages, setMessages] = useState<Nullable<PrivateMessage[]>>(undefined);

  const messageField = useField();

  useEffect(() => {
    if (messages !== undefined) {
      return;
    }
    const effectAsync = async () => {
      const collocutorResult = await Api.users.getUserExtended(collocutorId!);
      const messagesResult = await Api.messages.getMessages(collocutorId!);
      if (!collocutorResult.ensureSuccess() || !messagesResult.ensureSuccess()) {
        snackbarService.push('Ошибка', 'error');
        return;
      }

      setCollocutor(collocutorResult.body!);
      setMessages(messagesResult.body!);
    }
    effectAsync();
  })

  const sendMessage = async () => {
    if (messageField.value === undefined || messageField.value == '') {
      snackbarService.push('Отправьте непустое сообщение', 'warning');
      return;
    }
    const result = await Api.messages.addMessage(collocutorId!, messageField.value!);
    if (!result.ensureSuccess()) {
      snackbarService.push('Не удалось отправить сообщение', 'error');
      return;
    }

    setMessages(undefined);
  }

  const avatarWebPath = getFilePath(collocutor?.avatarFilePath);
  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" fontFamily="cursive">Диалог</Typography>
        <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
          <Avatar src={avatarWebPath} sx={{ width: 36, height: 36, mr: 1 }}></Avatar>
          <SimpleLink to={"/users/" + collocutorId}>
            {collocutor?.userName}
          </SimpleLink>
        </Box>
      </Box>
      <Stack sx={{ width: "60%" }}>
        {messages?.map(x => {
          const flexDirection = x.sender?.id == userId ? 'row-reverse' : 'row'
          return (
            <Box sx={{ display: "flex", flexDirection: flexDirection,  width: "100%", mt: 1 }}>
              <Paper sx={{ p: 1 }} elevation={2}>
                <Typography>
                  {x.message}
                </Typography>
              </Paper>
            </Box>
          )
        })}
      </Stack>
      <Box sx={{ mt: 2, width: "60%" }}>
        <TextField
          placeholder="Ответ"
          fullWidth
          multiline
          minRows={3}
          maxRows={6} 
          onChange={messageField.onChange}
          value={messageField.value}/>
        <Button onClick={() => sendMessage()} variant="contained" sx={{ mt: 2 }} startIcon={<Send />}>
          Отправить
        </Button>
      </Box>
    </Container>
  )
}

export default PrivateChatPage;