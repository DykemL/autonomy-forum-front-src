import { Add as AddIcon, ExpandLess, ExpandMore, Feed as FeedIcon, Person, Search } from "@mui/icons-material";
import { Box, CircularProgress, Container, Divider, Fab, Grid, InputAdornment, Paper, Stack, TextField, Tooltip, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Api/Api";
import { Section } from "../../Api/Contracts/Sections";
import { Topic } from "../../Api/Contracts/Topics";
import { useField } from "../../Hooks/useField";
import snackbarService from "../../Services/SnackbarService";
import BaseProgress from "../Common/BaseProgress";
import SearchField from "../Common/SearchField";
import SimpleLink from "../Common/SimpleLink";
import CreateTopicDialog from "../Modals/CreateTopicDialog";

function SectionPage() {
  const [loading, setLoading] = useState(true);
  const {sectionId} = useParams();
  const [section, setSection] = useState<Section>()

  const [isCreateDialog, setIsCreateDialog] = useState(false);

  const filter = useField(undefined);

  useEffect(() => {
    setLoading(true);

    Api.sections.getSectionById(sectionId!).then(result => {
      if (!result.ensureSuccess()) {
        snackbarService.push('Ошибка', 'error');
        return;
      }

      setSection(result.body);
      setLoading(false);
    });
  }, [isCreateDialog]);

  const buildTopic = (topic: Topic): any => {
    const creationDate = new Date(topic.creationDateTime!);

    return (
      <Paper sx={{ mt: 2, p: 1 }} elevation={2}>
        <Grid columns={14} container direction="row" columnSpacing={1}>
          <Grid item xs={2} sx={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap' }}>
            <Person sx={{ mr: 1 }} />
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
      <CreateTopicDialog isOpen={isCreateDialog} onClose={() => setIsCreateDialog(false)} sectionId={sectionId!} />     
    </>
    :
    <BaseProgress />
  )
}

export default observer(SectionPage);