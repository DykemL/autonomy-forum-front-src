import { Container, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Api/Api";
import { UserExtended } from "../../Api/Contracts/Common";
import { Guid, Nullable } from "../../Common/Types";
import snackbarService from "../../Services/SnackbarService";
import BaseProgress from "../Common/BaseProgress";

function UserPage() {
  const [loading, setLoading] = useState(true);

  const {userId} = useParams<Guid>();
  const [user, setUser] = useState<Nullable<UserExtended>>(undefined);

  useEffect(() => {
    if (user !== undefined) {
      return;
    }
    setLoading(true);
    Api.users.getUserExtended(userId!).then(result => {
      if (!result.ensureSuccess()) {
        snackbarService.push('Ошибка при получении информации о пользователе', 'error');
      }
      setUser(result?.body);
      setLoading(false);
    });
  })

  const hasUserRoles = user?.roles !== undefined && user?.roles.length > 0;
  return(!loading ?
    <Container>
      <Typography variant="caption">Имя пользователя:</Typography>
      <Typography variant="subtitle1">{user?.userName}</Typography>
      <Typography variant="caption">Email:</Typography>
      <Typography variant="subtitle1">{user?.email}</Typography>
      <Typography variant="caption">Роль:</Typography>
      <Typography variant="subtitle1">{hasUserRoles ? user?.roles![0] : 'Нет роли'}</Typography>
    </Container>
    :
    <BaseProgress />
  )
}

export default UserPage;