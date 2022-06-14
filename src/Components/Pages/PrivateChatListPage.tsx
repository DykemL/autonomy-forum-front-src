import { Avatar, Box, Container, Stack, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import Api from "../../Api/Api";
import { UserInfo } from "../../Api/Contracts/Common";
import { getFilePath } from "../../Common/Helpers/WebFilesHelper";
import { Nullable } from "../../Common/Types";
import snackbarService from "../../Services/SnackbarService";
import SimpleLink from "../Common/SimpleLink";

function PrivateChatListPage() {
  const [collocutors, setCollocutors] = useState<Nullable<UserInfo[]>>(undefined);

  useEffect(() => {
    if (collocutors !== undefined) {
      return;
    }
    const effectAsync = async () => {
      const collocutorsResult = await Api.messages.getCollocutors();
      if (!collocutorsResult.ensureSuccess()) {
        snackbarService.push('Ошибка', 'error');
        return;
      }

      setCollocutors(collocutorsResult.body!);
    }
    effectAsync();
  })

  return (
    <Container>
      <Box sx={{ mt: 2 }}>
        <Typography variant="h5" fontFamily="cursive">Диалоги:</Typography>
      </Box>
      <Stack sx={{ mt: 1 }}>
        {collocutors?.length == 0 &&
          <>Активные диалоги отсутствуют</>
        }
        {collocutors?.map(x => {
          const avatarWebPath = getFilePath(x?.avatarFilePath);
          return (
            <Box sx={{ mt: 2, display: 'flex', alignItems: 'center' }}>
              <Avatar src={avatarWebPath} sx={{ width: 36, height: 36, mr: 1 }}></Avatar>
              <SimpleLink to={"/messages/" + x.id}>
                {x?.userName}
              </SimpleLink>
            </Box>
          )
        })}
      </Stack>
    </Container>
  )
}

export default PrivateChatListPage;