import { blue } from "@mui/material/colors";
import { Link, LinkProps } from "react-router-dom";

function ClearLink(props: LinkProps) {
  return(
    <Link style={ {textDecoration: 'none', color: 'inherit'} } {...props}>
      {props.children}
    </Link>
  )
}

export default ClearLink;