import { FileUpload as FileUploadIcon } from "@mui/icons-material";
import { Button, SxProps, Theme } from "@mui/material";
import { ChangeEvent } from "react";

interface ImageSelectorProps {
  title: string,
  changeHandler: (event: ChangeEvent<HTMLInputElement>) => Promise<void>,
  sx?: SxProps<Theme>
}

function ImageSelector(props: ImageSelectorProps) {
  return (
    <Button sx={props.sx} startIcon={<FileUploadIcon />} variant="contained" component="label">
      {props.title}
      <input type="file" onChange={props.changeHandler} accept=".png,.jpg,.bmp" hidden />
    </Button>
  )
}

export default ImageSelector;