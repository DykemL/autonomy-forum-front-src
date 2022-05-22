import { AlertColor } from "@mui/material";
import { ReactNode } from "react";
import SnackbarsContainer from "../Components/Common/SnackbarsContainer";
import SnackbarsStore from "../Store/SnackbarsStore";

class SnackbarService {
  private snackbarsStore: SnackbarsStore;
  private snackbarsContainer: ReactNode;

  constructor() {
    this.snackbarsStore = new SnackbarsStore();
    this.snackbarsContainer = <SnackbarsContainer store={this.snackbarsStore}></SnackbarsContainer>;
  }

  getContainer(): ReactNode {
    return this.snackbarsContainer;
  }

  push = (message: string, severenity?: AlertColor) => {
    this.snackbarsStore.enqueueSnackbar(message, severenity);
  }
}

const snackbarService = new SnackbarService();
export default snackbarService;