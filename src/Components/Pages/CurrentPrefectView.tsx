import { LocalPolice } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { UserInfo } from "../../Api/Contracts/Common";
import { Nullable } from "../../Common/Types";
import SimpleLink from "../Common/SimpleLink";

interface CurrentPrefectViewProps {
  prefect: Nullable<UserInfo>
}

function CurrentPrefectView(props: CurrentPrefectViewProps) {
  return (
    <Box>
      Текущий префект: 
      {props.prefect !== null ?
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <LocalPolice color="warning" />
          <SimpleLink component="span" to={`/users/${props.prefect?.id}`}>
            {props.prefect?.userName}
          </SimpleLink>
        </Box>
        :
        <Typography>Отсутствует</Typography>
      }
    </Box>
  )
}

export default CurrentPrefectView;