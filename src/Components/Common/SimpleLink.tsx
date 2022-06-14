import { SxProps, Theme, Typography } from "@mui/material";
import { blue } from "@mui/material/colors";
import { useNavigate } from "react-router-dom";

type Variant = "inherit" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "subtitle1" | "subtitle2" | "body1" | "body2" | "caption" | "button" | "overline" | undefined; 

interface SimpleLinkProps {
  children?: any,
  component?: any,
  variant?: Variant,
  color?: any,
  to: string
}

function SimpleLink(props: SimpleLinkProps) {
  const navigate = useNavigate();

  const sx: SxProps<Theme> = {
    cursor: 'pointer',
    color: props.color ?? blue['800'],
    ":hover": { 
      color: blue['400']
    }
  };

  return (
    <Typography onClick={() => navigate(props.to)} variant={props.variant ?? "body1"} component={props.component ?? "span"} sx={sx} {...props}>
      {props.children}
    </Typography>
  )
}

export default SimpleLink;