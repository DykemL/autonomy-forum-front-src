import { useTheme } from "@mui/material";
import { Link, LinkProps } from "react-router-dom";

function ClearLink(props: LinkProps) {
  const theme = useTheme();
  return(
    <Link style={ {textDecoration: 'none', color: theme.palette.primary.contrastText || 'black'} } {...props}>
      {props.children}
    </Link>
  )
}

export default ClearLink;