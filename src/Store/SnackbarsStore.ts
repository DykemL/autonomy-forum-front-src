import { AlertColor } from "@mui/material";
import { IObservableArray, makeAutoObservable, observable } from "mobx";

const DEFAULT_ALERT_COLOR: AlertColor = 'info';
const SNACKBAR_DURATION: number = 3000;

interface Snackbar {
  content: string;
  severenity: AlertColor;
}

class SnackbarsStore {
  private _snackbars: IObservableArray<Snackbar> = observable([]);

  constructor() {
    makeAutoObservable(this);
  }

  get snackbars() {
    return this._snackbars;
  }

  enqueueSnackbar(content: string, severenity?: AlertColor) {
    const index = this._snackbars.push({
      content: content,
      severenity: severenity ?? DEFAULT_ALERT_COLOR
    }) - 1;
    const snackbar = this._snackbars[index];
    setTimeout(() => this.removeSnackbar(snackbar), SNACKBAR_DURATION);
  }

  removeSnackbar(snackbar: Snackbar) {
    this._snackbars.remove(snackbar);
  }
}

export default SnackbarsStore;