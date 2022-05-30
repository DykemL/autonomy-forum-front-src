import { AddModerator, Block, Upgrade } from "@mui/icons-material";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Api/Api";
import { UserExtended } from "../../Api/Contracts/Common";
import { Guid, Nullable } from "../../Common/Types";
import snackbarService from "../../Services/SnackbarService";
import userService from "../../Services/UserService";
import { localizeRole, Role } from "../../Store/User/Roles";
import BaseProgress from "../Common/BaseProgress";

function UserPage() {
  const [loading, setLoading] = useState(true);

  const {userId} = useParams<Guid>();
  const currentUserId = userService.getUserId();
  const isMyProfile = userId === currentUserId;

  const [user, setUser] = useState<Nullable<UserExtended>>(undefined);

  useEffect(() => {
    setUser(undefined);
  }, [userId, currentUserId])

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

  const addRole = async (userId: Guid, role: Role) => {
    const result = await Api.users.addUserRole(userId, role);
    if (!result.ensureSuccess()) {
      snackbarService.push(result?.body ?? 'Неизвестная ошибка от сервера при установке роли', 'error');
      return;
    }
    snackbarService.push('Роль успешно добавлена', 'success');
    setUser(undefined);
  }

  const removeRole = async (userId: Guid, role: Role) => {
    const result = await Api.users.removeFromRole(userId, role);
    if (!result.ensureSuccess()) {
      snackbarService.push(result?.body ?? 'Неизвестная ошибка от сервера при удалении из роли', 'error');
      return;
    }
    snackbarService.push('Роль успешно удалена', 'success');
    setUser(undefined);
  }

  const hasUserRoles = user?.roles !== undefined && user?.roles.length > 0;
  const canBan = userService.checkPermission('ban');
  const alreadyBanned = user?.roles?.includes('Banned');

  const canSetModerator = userService.checkPermission('set-moderator');
  const alreadyIsModerator = user?.roles?.includes('Moderator');

  const createRoleLine = (role: string) => {
    return (
      <Typography color="orange" variant="subtitle1">
        {localizeRole(role as Role)}
      </Typography>
    )
  }
  return(!loading ?
    <Container sx={{ p: 2 }}>
      <Stack spacing={1} sx={{ maxWidth: "fit-content" }}>
        {false && isMyProfile &&
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" fontFamily="cursive">Ваш профиль</Typography>
            <Button sx={{ mt: 1 }} variant="contained" component="label">
              Загрузить аватар
              <input type="file" accept=".png,.jpg,.bmp" hidden />
            </Button>
          </Box>
        }
        <Box>
          <Typography variant="caption">Имя пользователя:</Typography>
          <Typography variant="subtitle1">{user?.userName}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Email:</Typography>
          <Typography variant="subtitle1">{user?.email}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Роли:</Typography>
          {hasUserRoles ? user!.roles!.map(x => createRoleLine(x)) : createRoleLine('Нет ролей')}
        </Box>
      </Stack>
      {!isMyProfile &&
        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 'fit-content' }}>
          {canBan && !alreadyBanned &&
            <Button size="small" color="error" onClick={() => addRole(user?.id!, 'Banned')} variant="contained" sx={{ mt: 2 }} startIcon={<Block />}>
              Заблокировать
            </Button>
          }
          {alreadyBanned &&
            <Button size="small" color="success" onClick={() => removeRole(user?.id!, 'Banned')} variant="contained" sx={{ mt: 2 }} startIcon={<Block />}>
              Разблокировать
            </Button>
          }
          {canSetModerator && !alreadyIsModerator &&
            <Button size="small" color="warning" onClick={() => addRole(user?.id!, 'Moderator')} variant="contained" sx={{ mt: 2 }} startIcon={<AddModerator />}>
              Назначить модератором
            </Button>
          }
          {alreadyIsModerator &&
            <Button size="small" color="error" onClick={() => removeRole(user?.id!, 'Moderator')} variant="contained" sx={{ mt: 2 }} startIcon={<AddModerator />}>
              Разжаловать модератора
            </Button>
          }
        </Box>
      }
    </Container>
    :
    <BaseProgress />
  )
}

export default UserPage;