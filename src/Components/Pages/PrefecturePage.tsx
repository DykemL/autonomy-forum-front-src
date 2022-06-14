import { AssuredWorkload as AssuredWorkloadIcon } from "@mui/icons-material";
import { Box, Container, Divider, Grid, Paper, Stack, Typography } from "@mui/material";
import moment from "moment";
import { useEffect, useState } from "react";
import Api from "../../Api/Api";
import { Election, ElectionsConditions as ElectionsConditions, ElectionsStatus } from "../../Api/Contracts/Elections";
import { humanize } from "../../Common/Helpers/Humanizer";
import { Nullable } from "../../Common/Types";
import snackbarService from "../../Services/SnackbarService";
import BaseProgress from "../Common/BaseProgress";
import SimpleLink from "../Common/SimpleLink";
import CurrentPrefectView from "./CurrentPrefectView";

function PrefecturePage() {
  const [loading, setLoading] = useState(true);
  const [electionsConditions, setElectionsConditions] = useState<Nullable<ElectionsConditions>>(undefined);
  const [elections, setElections] = useState<Nullable<Election[]>>(undefined);

  useEffect(() => {
    const effectAsync = async () => {      
      const electionsConditions = await Api.elections.getElectionsConditions();
      const elections = await Api.elections.getInfos();
      if (!electionsConditions.ensureSuccess() || !elections.ensureSuccess()) {
        snackbarService.push('Ошибка при получении информации о выборах', 'error');
        return;
      }

      setElectionsConditions(electionsConditions.body);
      setElections(elections.body);
      setLoading(false);
    };
    setLoading(true);
    effectAsync();
  }, []);

  if (loading) {
    return (
      <BaseProgress />
    )
  }

  const buildElectionView = (election: Election): any => {
    let currentStatusString: string = 'Отсутствует';
    switch (election.status) {
      case ElectionsStatus.Registration:
        currentStatusString = 'Подача заявок';
        break;
      case ElectionsStatus.Elections:
        currentStatusString = 'Выборы';
        break;
    }
    const lastStatusModifiedDateTime = new Date(election.lastStatusModifiedDateTime!);
    const electionsPeriod = moment.duration(electionsConditions?.electionsPeriod);
    let timeLeftMs = lastStatusModifiedDateTime.getTime() + electionsPeriod.asMilliseconds() - Date.now();
    timeLeftMs = timeLeftMs < 0 ? 0 : timeLeftMs;
    const timeLeftHumanized = humanize(timeLeftMs);
    return (
      <Paper sx={{ mt: 2, p: 1 }} elevation={2}>
        <Grid container direction="row" columnSpacing={1}>
          <Grid item xs={2} sx={{ display: 'inline-flex', alignItems: 'center', flexWrap: 'wrap', ml: 1 }}>
            <SimpleLink to={`/prefecture/elections/${election.sectionInfo!.id}`}>
              {election.sectionInfo?.title}
            </SimpleLink>
          </Grid>
          <Grid item xs>
            <CurrentPrefectView prefect={election.sectionInfo?.prefect} />
          </Grid>
          <Grid item xs={2}>
            Статус:
            <Typography>{currentStatusString}</Typography>
          </Grid>
          <Grid item xs={2}>
            Осталось времени:
            <Typography>{timeLeftHumanized}</Typography>
          </Grid>
        </Grid>
      </Paper>
    )
  }

  return (
    <Container>
      <Box sx={{ mt: 2, display: 'inline-flex', alignItems: 'center' }}>
        <Typography variant="h5" fontFamily="cursive">Префектура</Typography>
      </Box>
      <Paper sx={{ mt: 2, p: 1 }} elevation={2}>
        <SimpleLink to={"/prefecture/info"}>
          <Box sx={{ display: "inline-flex", alignItems: "center" }}>
            <AssuredWorkloadIcon fontSize="large" color="error" />
            <Typography sx={{ ml: 1 }} component={"span"} color={"darkred"} variant="h6">Правила выборов префекта</Typography>
          </Box>
        </SimpleLink>
      </Paper>
      <Divider sx={{ mt: 3 }}><Typography fontFamily="cursive">Выборы по разделам</Typography></Divider>
      <Stack>
        {elections?.map(election => buildElectionView(election))}
      </Stack>
    </Container>
  );
}

export default PrefecturePage;