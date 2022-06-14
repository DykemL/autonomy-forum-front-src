import { Box, Container, Paper, Stack, Typography } from "@mui/material";
import moment, { Duration } from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Api/Api";
import { Election, ElectionsConditions, ElectionsStatus } from "../../Api/Contracts/Elections";
import { humanize } from "../../Common/Helpers/Humanizer";
import { Nullable } from "../../Common/Types";
import snackbarService from "../../Services/SnackbarService";
import SimpleLink from "../Common/SimpleLink";
import CurrentPrefectView from "./CurrentPrefectView";
import PrefectElectionView from "./PrefectElectionView";
import PrefectRegistrationView from "./PrefectRegistrationView";

function PrefectElectionsPage() {
  const [electionsConditions, setElectionsConditions] = useState<Nullable<ElectionsConditions>>(undefined);
  const [election, setElection] = useState<Nullable<Election>>(undefined);
  const {sectionId} = useParams();

  useEffect(() => {
    if (election !== undefined) {
      return;
    }
    const effectAsync = async () => {
      const electionsConditionsResult = await Api.elections.getElectionsConditions();
      const electionInfoResult = await Api.elections.getInfo(sectionId!);
      if (!electionInfoResult.ensureSuccess() || !electionsConditionsResult.ensureSuccess()) {
        snackbarService.push('Ошибка', 'error');
        return;
      }

      setElectionsConditions(electionsConditionsResult.body!);
      setElection(electionInfoResult.body!);
    };
    effectAsync();
  }, [election]);

  let content: JSX.Element = <></>;
  let currentStatusString: string = 'Отсутствует';
  let electionsPeriod: Duration = moment.duration(0);
  switch (election?.status) {
    case ElectionsStatus.Registration:
      currentStatusString = 'Подача заявок';
      content = (<PrefectRegistrationView election={election} updateParent={() => setElection(undefined)} />);
      electionsPeriod = moment.duration(electionsConditions?.electionsPeriod);
      break;
    case ElectionsStatus.Elections:
      currentStatusString = 'Выборы';
      content = (<PrefectElectionView election={election} updateParent={() => setElection(undefined)} />);
      electionsPeriod = moment.duration(electionsConditions?.periodBetweenRounds);
      break;
  }
  const lastStatusModifiedDateTime = new Date(election?.lastStatusModifiedDateTime!);
  let timeLeftMs = lastStatusModifiedDateTime.getTime() + electionsPeriod.asMilliseconds() - Date.now();
  timeLeftMs = timeLeftMs < 0 ? 0 : timeLeftMs;
  const timeLeftHumanized = humanize(timeLeftMs);

  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" fontFamily="cursive">Выборы префекта раздела</Typography>
        <Box sx={{ mt: 1 }}><SimpleLink to={`/sections/${sectionId}`}>{election?.sectionInfo?.title}</SimpleLink></Box>
        <Stack sx={{ mt: 1 }} spacing={1}>
          <CurrentPrefectView prefect={election?.sectionInfo?.prefect} />  
          <Box>
            Статус:
            <Typography>{currentStatusString}</Typography>
          </Box>
          <Box>
            Осталось времени:
            <Typography>{timeLeftHumanized}</Typography>
          </Box>
        </Stack>
      </Box>
      <Paper sx={{ mt: 2, p: 1 }} elevation={2}>
        {content}
      </Paper>
    </Container>
  )
}

export default PrefectElectionsPage;