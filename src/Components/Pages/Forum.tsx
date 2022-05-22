import { Container, Grid, Link, Paper, Stack, Typography } from "@mui/material";
import { Forum as ForumIcon } from "@mui/icons-material";
import ClearLink from "../Common/ClearLink";
import { NavLink, useNavigate } from "react-router-dom";
import SimpleLink from "../Common/SimpleLink";

interface Topic {
  title: string,
  description: string
}

const topics: Topic[] = [
  {title: "Europa Universalis 4", description: "Европка тащит!!!!ашщвыашщыоваыоваоыщшаоываошщыовашыоваоыващоываоышваоывщаошыовшщаывоа"},
  {title: "Crusader kings 2", description: "Европка тащит!!!!ашщвыашщыоваыоваоыщшаоываошщыовашыоваоыващоываоышваоывщаошыовшщаывоа"},
  {title: "Политика", description: "Европка тащит!!!!ашщвыашщыоваыоваоыщшаоываошщыовашыоваоыващоываоышваоывщаошыовшщаывоа"},
  {title: "Экономика", description: "Европка тащит!!!!ашщвыашщыоваыоваоыщшаоываошщыовашыоваоыващоываоышваоывщаошыовшщаывоа"},
  {title: "Абобус", description: "Европка тащит!!!!ашщвыашщыоваыоваоыщшаоываошщыовашыоваоыващоываоышваоывщаошыовшщаывоа"},
]

function Forum() {
  const navigate = useNavigate();

  return (
    <Container>
      <Stack>
        {topics.map(topic => { return (
          <Paper sx={{ display: 'inline-flex', mt: 2, p: 2, alignItems: 'center' }} elevation={6}>
            <ForumIcon sx={{ mr: 1 }} />
            <Grid container direction="column" columnSpacing={2}>
              <Grid item xs={8}>
                <SimpleLink to="/">{topic.title}</SimpleLink>
                <Typography>{topic.description}</Typography>
              </Grid>
              <Grid item xs={4}>
              </Grid>
            </Grid>
          </Paper>
        )})}
      </Stack>
    </Container>
  )
}

export default Forum;