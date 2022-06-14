import { AssuredWorkload as AssuredWorkloadIcon } from "@mui/icons-material";
import { Paper, Grid, Typography } from "@mui/material";
import SimpleLink from "./SimpleLink";

interface SectionViewProps {
  title: string;
  description: string;
  to: string;
  icon: any
}

function SectionView(props: SectionViewProps) {
  return (
    <Paper sx={{ display: 'inline-flex', mt: 2, p: 2, alignItems: 'center' }} elevation={6}>
      <AssuredWorkloadIcon color="info" sx={{ mr: 1 }} />
      <Grid container direction="row" columnSpacing={1}>
        <Grid item xs={8}>
          <SimpleLink to={props.to}>{props.title}</SimpleLink>
          <Typography>{props.description}</Typography>
        </Grid>
        <Grid item xs>
        </Grid>
      </Grid>
    </Paper>
  )
}

export default SectionView;