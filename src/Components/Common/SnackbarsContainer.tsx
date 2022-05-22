import { Alert, Snackbar } from "@mui/material";
import { observer } from "mobx-react-lite";
import snackbarsStore from "../../Store/SnackbarsStore";

const SNACKBAR_MARGIN: number = 7;

interface SnackbarsContainerProps {
  store: snackbarsStore
}

function SnackbarsWrapper(props: SnackbarsContainerProps) {
    const store = props.store;

    return (
      <>
        {store.snackbars.map((snackbar, index) => {
          return (
            <Snackbar key={index}
            open={true}
            sx={{ mb: index * SNACKBAR_MARGIN }}>
              <Alert onClose={() => store.removeSnackbar(snackbar)} severity={snackbar.severenity} sx={{ width: '100%' }}>
                {snackbar.content}
              </Alert>
            </Snackbar>
          );
        })}
      </>
    ) 
};

export default observer(SnackbarsWrapper);