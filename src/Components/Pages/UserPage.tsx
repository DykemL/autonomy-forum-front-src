import { AddModerator, Block, Upgrade } from "@mui/icons-material";
import { Avatar, Box, Button, Container, Stack, Typography } from "@mui/material";
import { ChangeEvent, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import Api from "../../Api/Api";
import { UserExtended } from "../../Api/Contracts/Common";
import { getFilePath } from "../../Common/Helpers/WebFilesHelper";
import { Guid, Nullable } from "../../Common/Types";
import snackbarService from "../../Services/SnackbarService";
import userService from "../../Services/UserService";
import { localizeRole, Role } from "../../Store/User/Roles";
import BaseProgress from "../Common/BaseProgress";
import ImageSelector from "../Common/ImageSelector";
import SimpleLink from "../Common/SimpleLink";

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

  const onAvatarChange = async (event: ChangeEvent<HTMLInputElement>) => {
    let formData = new FormData();
    formData.append("file", event.target!.files![0]);
    let result = await Api.files.upload(formData);
    await Api.users.attachAvatar(result.body?.id!);
    setUser(undefined);
  }
  const avatarWebPath = getFilePath(user?.avatarFilePath);

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
        <Avatar src={avatarWebPath} sx={{ width: 128, height: 128 }}></Avatar>
        {isMyProfile &&
          <Box sx={{ mb: 2 }}>
            <Typography variant="h5" fontFamily="cursive">Ваш профиль</Typography>
            <ImageSelector title="Загрузить аватар" changeHandler={onAvatarChange} sx={{ mt: 1 }} />
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
          <Typography variant="caption">Ответы:</Typography>
          <Typography variant="subtitle1">{user?.repliesCount}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Рейтинг:</Typography>
          <Typography variant="subtitle1">{user?.rating}</Typography>
        </Box>
        <Box>
          <Typography variant="caption">Роли:</Typography>
          {hasUserRoles ? user!.roles!.map(x => createRoleLine(x)) : createRoleLine('Нет ролей')}
        </Box>
      </Stack>
      {!isMyProfile &&
        <Box sx={{ display: 'flex', flexDirection: 'column', maxWidth: 'fit-content' }}>
          {currentUserId !== undefined &&
            <Box sx={{ mt: 2 }}>
              <SimpleLink component={"div"} variant="body2" to={"/messages/" + userId}>
                Перейти к диалогу
              </SimpleLink>
            </Box>
          }
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