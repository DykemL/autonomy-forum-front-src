import { Button } from "@mui/material";
import ClearLink from "../Common/ClearLink";

function NonAuthorizedHeaderBar () {
  return (
    <>
      <Button component={ClearLink} to={"/login"} color="inherit">
        Вход
      </Button>
      <Button component={ClearLink} to={"/register"} color="inherit">
        Регистрация
      </Button>
    </>
  );
}

export default NonAuthorizedHeaderBar;