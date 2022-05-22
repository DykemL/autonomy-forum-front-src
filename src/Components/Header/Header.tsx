import { AppBar, Toolbar, Box, Typography } from "@mui/material";
import { observer } from "mobx-react-lite";
import userService from "../../Services/UserService";
import ClearLink from "../Common/ClearLink";
import AuthorizedHeaderBar from "./AuthorizedHeaderBar";
import NonAuthorizedHeaderBar from "./NonAuthorizedHeaderBar";

function Header() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Box sx={{ flexGrow: 1 }}>
          <Typography sx={{ p: 1 }} component={ClearLink} to="/" variant="h6">
            Autonomy forum
          </Typography>
        </Box>
        { userService.isAuthorized() ? <AuthorizedHeaderBar /> : <NonAuthorizedHeaderBar /> }
      </Toolbar>
    </AppBar>
  )
}

export default observer(Header);