import { Add as AddIcon, Delete, ExpandLess, ExpandMore, Feed as FeedIcon, Person, Search } from "@mui/icons-material";
import { Avatar, Box, CircularProgress, Container, Divider, Fab, Grid, InputAdornment, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Api/Api";
import { Section } from "../../Api/Contracts/Sections";
import { Topic } from "../../Api/Contracts/Topics";
import { getFilePath } from "../../Common/Helpers/WebFilesHelper";
import { Nullable, Guid } from "../../Common/Types";
import { useField } from "../../Hooks/useField";
import snackbarService from "../../Services/SnackbarService";
import userService from "../../Services/UserService";
import BaseProgress from "../Common/BaseProgress";
import SearchField from "../Common/SearchField";
import SimpleLink from "../Common/SimpleLink";
import ConfirmDialog from "../Modals/ConfirmDialog";
import CreateTopicDialog from "../Modals/CreateTopicDialog";

function SectionPage() {
  const [loading, setLoading] = useState(true);
  const {sectionId} = useParams();
  const [section, setSection] = useState<Nullable<Section>>(undefined)

  const [isCreateDialog, setIsCreateDialog] = useState(false);

  const filter = useField(undefined);

  useEffect(() => {
    if (section !== undefined) {
      return;
    }
    setLoading(true);

    Api.sections.getSectionById(sectionId!).then(result => {
      if (!result.ensureSuccess()) {
        snackbarService.push('Ошибка', 'error');
        return;
      }

      setSection(result.body);
      setLoading(false);
    });
  });

  const [isDeleteTopicOpen, setIsDeleteTopicOpen] = useState(false);
  const [isDeleteTopic, setIsDeleteTopic] = useState(false);
  const currentTopicId = useRef<Nullable<Guid>>();
  const deleteTopic = async () => {
    setLoading(true);
    if (isDeleteTopic) {
      return;
    }

    setIsDeleteTopic(true);
    const result = await Api.topics.deleteTopic(currentTopicId.current!);
    if (!result.ensureSuccess()) {
      snackbarService.push('Ошибка при удалении темы', 'error');
    }
    setIsDeleteTopic(false);
    setSection(undefined);
    setLoading(false);
  }

  const hasDeleteTopicPermission = userService.checkPermission('delete-topic');
  const buildTopic = (topic: Topic): any => {
    const creationDate = new Date(topic.creationDateTime!);
    const avatarWebPath = getFilePath(topic.author?.avatarFilePath);
    return (
      <Paper sx={{ mt: 2, p: 1 }} elevation={2}>
        <Grid columns={14} container direction="row" columnSpacing={1}>
          <Grid item xs={2} sx={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap' }}>
          <Avatar src={avatarWebPath} sx={{ width: 32, height: 32, mr: 1 }}></Avatar>
            <SimpleLink to={"/users/" + topic?.author?.id}>
              {topic.author?.userName}
            </SimpleLink>
          </Grid>
          <Grid item xs zeroMinWidth sx={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', overflowWrap: 'break-word' }}>
            <SimpleLink variant="subtitle1" to={"/topics/" + topic.id}>{topic.title}</SimpleLink>
          </Grid>
          <Grid item xs={2}>
            <Typography variant="body2">{creationDate.toLocaleString()}</Typography>
          </Grid>
          {hasDeleteTopicPermission &&
            <Grid item sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end' }} xs={1}>
              <Tooltip title='Удалить тему'>
                <Fab onClick={() => {
                  currentTopicId.current = topic.id;
                  setIsDeleteTopicOpen(true);
                }} 
                sx={{ ml: 2 }} color="error" size="small">
                  <Delete />
                </Fab>
              </Tooltip>
            </Grid>
          }
        </Grid>
      </Paper>
    )
  }

  let topics = section?.topics;
  if (!loading && filter.value !== undefined && filter.value !== '') {
    topics = section?.topics?.filter(topic => topic!.title!.indexOf(filter.value!) !== -1)
  }
  return (!loading ?
    <>
      <Container sx={{ mt: 2 }}>
        <Box sx={{ display: 'inline-flex', alignItems: 'center' }}>
          <Typography variant="h5" fontFamily="cursive">{section?.title}</Typography>
          <Tooltip title='Создать тему'>
            <Fab onClick={() => setIsCreateDialog(true)} sx={{ ml: 2 }} color="secondary" size="small">
              <AddIcon />
            </Fab>
          </Tooltip>
        </Box>

        <Box>
          <SearchField value={filter?.value} onChange={filter?.onChange} />
        </Box>

        <Stack>
          {topics?.map(topic => buildTopic(topic))}
        </Stack>
      </Container>
      <CreateTopicDialog isOpen={isCreateDialog} onClose={() => {
        setIsCreateDialog(false);
        setSection(undefined);
      }} sectionId={sectionId!} />    
      <ConfirmDialog message="Вы уверены?" agreeMessage="Удалить"
        isOpen={isDeleteTopicOpen}
        close={() => setIsDeleteTopicOpen(false)}
        onAgree={() => deleteTopic()} /> 
    </>
    :
    <BaseProgress />
  )
}

export default observer(SectionPage);