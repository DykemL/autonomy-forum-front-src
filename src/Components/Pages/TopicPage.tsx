import { Delete as DeleteIcon, ThumbUp as ThumbIcon, Person, Send } from "@mui/icons-material";
import { Avatar, Badge, Box, Button, Container, Divider, Fab, Grid, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useCallback, useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Api/Api";
import { Reply } from "../../Api/Contracts/Replies";
import { Topic } from "../../Api/Contracts/Topics";
import { getFilePath } from "../../Common/Helpers/WebFilesHelper";
import { Guid, Nullable } from "../../Common/Types";
import { useField } from "../../Hooks/useField";
import snackbarService from "../../Services/SnackbarService";
import userService from "../../Services/UserService";
import BaseProgress from "../Common/BaseProgress";
import SearchField from "../Common/SearchField";
import SimpleLink from "../Common/SimpleLink";
import ConfirmDialog from "../Modals/ConfirmDialog";

function TopicPage() {
  const [loading, setLoading] = useState(true);
  const {topicId} = useParams();
  const [topic, setTopic] = useState<Topic>();

  const [sendMessage, setSendMessage] = useState(false);

  const filter = useField();
  const newMessage = useField();

  const [isDeleteReplyOpen, setIsDeleteReplyOpen] = useState(false);
  const [isDeleteReply, setIsDeleteReply] = useState(false);
  const currentReplyId = useRef<Nullable<Guid>>();

  const currentUserId = userService.getUserId();

  useEffect(() => {
    if (topic !== undefined) {
      return;
    }
    setLoading(true);

    Api.topics.findTopicById(topicId!).then(result => {
      if (!loading) {
        return;
      }
      if (!result.ensureSuccess()) {
        snackbarService.push('Ошибка', 'error');
        return;
      }

      result!.body!.creationDateTime = new Date(result!.body!.creationDateTime!).toLocaleString();
      setTopic(result.body);
      setLoading(false);
    });
  });

  const createReply = () => {
    if (sendMessage) {
      return;
    }
    setSendMessage(true);
    setLoading(true);

    Api.replies.createReply(newMessage.value!, topic!.id!).then(result => {
      if (!result.ensureSuccess()) {
        snackbarService.push('Произошла ошибка при отправке ответа', 'error');
      }
      newMessage.clear();
      setLoading(false);
      setTopic(undefined);
      setSendMessage(false);
    });
  };

  const deleteReply = useCallback(async () => {
    if (isDeleteReply) {
      return;
    }
    setLoading(true);

    setIsDeleteReply(true);
    const result = await Api.replies.deleteReply(currentReplyId.current!);
    if (!result.ensureSuccess()) {
      snackbarService.push('Ошибка при удалении раздела', 'error');
    }
    setIsDeleteReply(false);
    setLoading(false);
    setTopic(undefined);
  }, [isDeleteReply]);

  const [isDoLikeReply, setIsDoLikeReply] = useState(false);
  const doLikeReply = async (replyId: Guid): Promise<boolean> => {
    if (isDoLikeReply) {
      return false;
    }
    setIsDoLikeReply(true);
    const result = await Api.replies.doLikeReply(replyId);
    if (!result.ensureSuccess()) {
      snackbarService.push('Не удалось оценить ответ', 'error');
    }
    setIsDoLikeReply(false);
    return true;
  }

  const hasDeleteReplyPermission = userService.checkPermission('delete-reply');
  const buildReply = (reply: Reply, index: number): any => {
    const creationDate = new Date(reply.creationDateTime!);
    const canLike = currentUserId !== undefined && !reply?.favoredBy?.includes(currentUserId!) && reply.author?.id != currentUserId;
    const avatarWebPath = getFilePath(reply.author?.avatarFilePath);
    return (
      <Paper key={index} sx={{ mt: 2, p: 1 }} variant="outlined" elevation={2}>
        <Grid columns={14} container direction="row" columnSpacing={1}>
          <Grid item xs={2}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Avatar src={avatarWebPath} sx={{ width: 36, height: 36, mr: 1 }}></Avatar>
              <SimpleLink to={"/users/" + reply?.author?.id}>
                {reply?.author?.userName}
              </SimpleLink>
            </Box>
          </Grid>
          <Grid item xs zeroMinWidth sx={{ overflowWrap: 'break-word' }}>
            <Typography >{reply?.message}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="caption">{creationDate.toLocaleString()}</Typography>

            <Fab onClick={() => {
              doLikeReply(reply.id!).then(wasLiked => {
                if (wasLiked && reply && reply.favoredBy && currentUserId) {
                  let newReplyIndex = topic!.replies!.map(x => x.id).indexOf(reply!.id);
                  let favoredBy = topic!.replies![newReplyIndex].favoredBy;
                  topic!.replies![newReplyIndex].favoredBy = [...favoredBy!, currentUserId];
                  setTopic(topic);
                }
              });
            }} disabled={!canLike} size="small" color="default">
              <Badge anchorOrigin={{ vertical: 'top', horizontal: 'left' }} color="secondary" badgeContent={reply?.favoredBy?.length ?? 0} showZero>
                <ThumbIcon color="success" />
              </Badge>
            </Fab>

          </Grid>
          {hasDeleteReplyPermission &&
            <Grid item sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end' }} xs="auto">
              <Tooltip title='Удалить ответ'>
                <Fab onClick={() => {
                  currentReplyId.current = reply.id;
                  setIsDeleteReplyOpen(true);
                }} 
                sx={{ ml: 2 }} color="error" size="small">
                  <DeleteIcon />
                </Fab>
              </Tooltip>
            </Grid>
          }
        </Grid>
      </Paper>
    )
  }

  let replies = topic?.replies;
  if (!loading && filter.value !== undefined && filter.value !== '') {
    replies = topic?.replies?.filter(reply => reply!.message!.indexOf(filter.value!) !== -1)
  }
  const avatarWebPath = getFilePath(topic?.author?.avatarFilePath);
  return (!loading ?
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5" fontFamily="cursive">{topic?.title}</Typography>
      
      <Paper sx={{ mt: 2, p: 1 }} variant="outlined" elevation={2}>
        <Grid columns={14} container direction="row" columnSpacing={1}>
          <Grid item xs={2}>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap' }}>
              <Avatar src={avatarWebPath} sx={{ width: 36, height: 36, mr: 1 }}></Avatar>
              <SimpleLink to={"/users/" + topic?.author?.id}>
                {topic?.author?.userName}
              </SimpleLink>
            </Box>
          </Grid>
          <Grid item xs zeroMinWidth sx={{ overflowWrap: 'break-word' }}>
            <Typography>{topic?.titleMessage}</Typography>
          </Grid>
          <Grid item xs={1}>
            <Typography variant="caption">{topic?.creationDateTime}</Typography>
          </Grid>
        </Grid>
      </Paper>

      <Divider sx={{ mt: 3 }}><Typography fontFamily="cursive">Ответы</Typography></Divider>
      <Box>
        <SearchField value={filter?.value} onChange={filter?.onChange} />
      </Box>
      <Stack>
        {replies?.map((reply, index) => buildReply(reply, index))}
      </Stack>

      <Box sx={{ p: 3 }}>
        <TextField
          placeholder="Ответ"
          fullWidth
          multiline
          minRows={4}
          maxRows={12} 
          onChange={newMessage.onChange}
          value={newMessage.value}/>
        <Button onClick={() => createReply()} variant="contained" sx={{ mt: 2 }} startIcon={<Send />}>
          Отправить
        </Button>
      </Box>

      <ConfirmDialog message="Вы уверены?" agreeMessage="Удалить"
        isOpen={isDeleteReplyOpen}
        close={() => setIsDeleteReplyOpen(false)}
        onAgree={() => deleteReply()} />
    </Container>
    :
    <BaseProgress />
  )
}

export default observer(TopicPage);