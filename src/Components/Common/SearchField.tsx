import { Search } from "@mui/icons-material";
import { InputAdornment, TextField } from "@mui/material";
import { ChangeEvent } from "react";
import { Nullable } from "../../Common/Types";

interface SearchFieldProps {
  value: Nullable<string>,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void | undefined
}

function SearchField(props: SearchFieldProps) {
  return (
    <TextField
      sx={{ mt: 2 }}
      size="small"
      InputProps={{
        startAdornment: (
          <InputAdornment position="start">
            <Search />
          </InputAdornment>
        ),
      }}
      value={props.value}
      onChange={props.onChange}
    />
  )
}

export default SearchField;