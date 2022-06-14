import { Box, Button, Stack, Typography } from "@mui/material";
import Api from "../../Api/Api";
import { UserInfo } from "../../Api/Contracts/Common";
import { Election } from "../../Api/Contracts/Elections";
import snackbarService from "../../Services/SnackbarService";
import userService from "../../Services/UserService";
import SimpleLink from "../Common/SimpleLink";

interface PrefectRegistrationViewProps {
  election: Election;
  updateParent: () => void;
}

const createCandidateInfo = (candidate: UserInfo) => {
  return (
    <SimpleLink component="div" to={`/users/${candidate?.id}`}>
      {candidate?.userName}
    </SimpleLink>
  )
}

function PrefectRegistrationView(props: PrefectRegistrationViewProps) {
  const isAuthorized = userService.isAuthorized();
  const userId = userService.getUserId();  
  const isAlreadyRegistered = isAuthorized && props.election.candidates?.find(x => x.id == userId) != undefined ? true : false;

  const canRegister = isAuthorized && !isAlreadyRegistered;
  const register = async () => {
    const result = await Api.elections.register(props.election.sectionInfo?.id!);
    if (!result.ensureSuccess()) {
      if (result.code == 400) {
        snackbarService.push('Ваш профиль не отвечает требованиям на подачу заявки', 'warning');
        return;
      }
      snackbarService.push('Ошибка при подаче заявки', 'error');
      return;
    }
    props.updateParent();
  }

  const revokeRegister = async () => {
    const result = await Api.elections.revokeRegister(props.election.sectionInfo?.id!);
    if (!result.ensureSuccess()) {
      if (result.code == 400) {
        snackbarService.push('Вы и так не подавали заявку на выборы', 'warning');
        return;
      }
      snackbarService.push('Ошибка при подаче заявки', 'error');
      return;
    }
    props.updateParent();
  }

  return (
    <>
      {canRegister &&
        <Button size="small" color="info" onClick={() => register()} variant="contained" sx={{ mt: 1 }}>
          Подать заявку
        </Button>
      }
      {isAlreadyRegistered &&
        <Button size="small" color="warning" onClick={() => revokeRegister()} variant="contained" sx={{ mt: 1 }}>
          Отозвать заявку
        </Button>
      }
      <Typography sx={{ mt: 1 }}>Пользователи, подавшие заявку:</Typography>
      {props.election.candidates?.length ?? 0 > 0
        ? <Stack>
            {props.election.candidates?.map((x) => createCandidateInfo(x))}
          </Stack>
        : <Typography>Пока отсутствуют</Typography>
      }
      
    </>
  )
}

export default PrefectRegistrationView;