import { Box, Container, Fab, Grid, IconButton, Link, Paper, Stack, Tooltip, Typography } from "@mui/material";
import { Add as AddIcon, AssuredWorkload as AssuredWorkloadIcon, Delete as DeleteIcon, Forum as ForumIcon } from "@mui/icons-material";
import SimpleLink from "../Common/SimpleLink";
import { Section } from "../../Api/Contracts/Sections";
import { useCallback, useEffect, useRef, useState } from "react";
import Api from "../../Api/Api";
import userService from "../../Services/UserService";
import { observer } from "mobx-react-lite";
import CreateSectionDialog from "../Modals/CreateSectionDialog";
import ConfirmDialog from "../Modals/ConfirmDialog";
import snackbarService from "../../Services/SnackbarService";
import { Guid } from "../../Common/Types";
import BaseProgress from "../Common/BaseProgress";
import SectionView from "../Common/SectionView";
import CurrentPrefectView from "./CurrentPrefectView";

function ForumPage() {
  const [loading, setLoading] = useState(true);
  const [sections, setSections] = useState<Section[]>([]);

  const [isCreateSectionDialogOpen, setIsCreateSectionDialogOpen] = useState(false);

  const [isDeleteSectionOpen, setIsDeleteSectionOpen] = useState(false);
  const [isDeleteSection, setIsDeleteSection] = useState(false);
  const currentSectionId = useRef<Guid>();

  const hasAddSectionPermission = userService.checkPermission('create-section');
  const hasDeleteSectionPermission = userService.checkPermission('delete-section');

  useEffect(() => {
    setLoading(true);
    Api.sections.getSections().then(result => {
      setSections(result.body!);
    });
    setLoading(false);
  }, [isDeleteSection, isDeleteSectionOpen, isCreateSectionDialogOpen]);

  const deleteSection = useCallback(async () => {
    setLoading(true);
    if (isDeleteSection) {
      return;
    }

    setIsDeleteSection(true);
    const result = await Api.sections.deleteSection(currentSectionId.current!);
    if (!result.ensureSuccess()) {
      snackbarService.push('Ошибка при удалении раздела', 'error');
    }
    setIsDeleteSection(false);
    setLoading(false);
  }, [isDeleteSection]);

  const buildSection = (section: Section, hasDeleteSectionPermission: boolean): any => {
    return (
      <Paper sx={{ display: 'inline-flex', mt: 2, p: 2, alignItems: 'center' }} elevation={6}>
        <ForumIcon color="info" sx={{ mr: 1 }} />
        <Grid container direction="row" columnSpacing={1}>
          <Grid item xs={8}>
            <SimpleLink to={"/sections/" + section.id}>{section.title}</SimpleLink>
            <Typography>{section.description}</Typography>
          </Grid>
          <Grid item xs>
            <CurrentPrefectView prefect={section?.prefect} />
          </Grid>
          {hasDeleteSectionPermission &&
            <Grid item sx={{ display: 'inline-flex', alignItems: 'center', justifyContent: 'flex-end' }} xs={1}>
              <Tooltip title='Удалить раздел'>
                <Fab onClick={() => {
                  currentSectionId.current = section.id;
                  setIsDeleteSectionOpen(true);
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

  return (!loading ?
    <>
      <Container>
        <Box sx={{ mt: 2, display: 'inline-flex', alignItems: 'center' }}>
          <Typography variant="h5" fontFamily="cursive">Основные разделы</Typography>
          {hasAddSectionPermission && 
            <Tooltip title='Добавить раздел'>
              <Fab onClick={() => setIsCreateSectionDialogOpen(true)} sx={{ ml: 2 }} color="secondary" size="small">
                <AddIcon />
              </Fab>
            </Tooltip>
          }
        </Box>
        <Stack>
          {sections?.map(section => { return buildSection(section, hasDeleteSectionPermission)})}
        </Stack>

        <Box sx={{ mt: 2, display: 'inline-flex', alignItems: 'center' }}>
          <Typography variant="h5" fontFamily="cursive">Административные разделы</Typography>
        </Box>
        <Stack>
          <SectionView
            title="Префектура"
            to="prefecture"
            description="В данном разделе можно проголосовать за префекта раздела либо зарегистрироваться в качестве кандидата в префекты раздела"
            icon={AssuredWorkloadIcon} />
        </Stack>
      </Container>

      <CreateSectionDialog isOpen={isCreateSectionDialogOpen} onClose={() => setIsCreateSectionDialogOpen(false)} />
      <ConfirmDialog message="Вы уверены?" agreeMessage="Удалить"
        isOpen={isDeleteSectionOpen}
        close={() => setIsDeleteSectionOpen(false)}
        onAgree={() => deleteSection()} />
    </>
    :
    <BaseProgress />
  )
}

export default observer(ForumPage);