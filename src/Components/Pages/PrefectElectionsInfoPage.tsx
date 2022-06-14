import { Stack, Box, Typography, Container } from "@mui/material";
import moment from "moment";
import { useState, useEffect } from "react";
import Api from "../../Api/Api";
import { ElectionsConditions } from "../../Api/Contracts/Elections";
import { humanize } from "../../Common/Helpers/Humanizer";
import { Nullable } from "../../Common/Types";
import snackbarService from "../../Services/SnackbarService";

function PrefectElectionsInfoPage() {
  const [electionsConditions, setElectionsConditions] = useState<Nullable<ElectionsConditions>>(undefined);

  useEffect(() => {
    if (electionsConditions !== undefined) {
      return;
    }
    const effectAsync = async () => {
      const electionsConditionsResult = await Api.elections.getElectionsConditions();
      if (!electionsConditionsResult.ensureSuccess()) {
        snackbarService.push('Ошибка', 'error');
        return;
      }

      setElectionsConditions(electionsConditionsResult.body!);
    };
    effectAsync();
  }, [electionsConditions]);

  const electionsPeriodText = humanize(moment.duration(electionsConditions?.electionsPeriod).asMilliseconds());
  const periodBetweenRoundsText = humanize(moment.duration(electionsConditions?.periodBetweenRounds).asMilliseconds());
  return (
    <Container sx={{ mt: 2 }}>
      <Typography variant="h5" fontFamily="cursive">Правила выборов префекта</Typography>
      <Stack sx={{ mt: 1 }} spacing={1}>
        <Box>
          Рейтинг, необходимый для права голоса:
          <Typography>{electionsConditions?.ratingNeededToVote}</Typography>
        </Box>
        <Box>
          Количество ответов, необходимое для права голоса:
          <Typography>{electionsConditions?.repliesNeededToVote}</Typography>
        </Box>
        <Box>
          Рейтинг, необходимый для права подачи заявки на выборы:
          <Typography>{electionsConditions?.ratingNeededToBeElected}</Typography>
        </Box>
        <Box>
          Количество ответов, необходимое для подачи заявки на выборы:
          <Typography>{electionsConditions?.repliesNeededToBeElected}</Typography>
        </Box>
        <Box>
          Период между выборами:
          <Typography>{electionsPeriodText}</Typography>
        </Box>
        <Box>
          Период между турами выборов:
          <Typography>{periodBetweenRoundsText}</Typography>
        </Box>
      </Stack>
    </Container>
  )
}

export default PrefectElectionsInfoPage;