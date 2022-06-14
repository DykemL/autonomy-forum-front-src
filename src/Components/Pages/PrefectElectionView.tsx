import { Box, Button, Grid, Typography } from "@mui/material";
import Api from "../../Api/Api";
import { UserInfo } from "../../Api/Contracts/Common";
import { Election } from "../../Api/Contracts/Elections";
import { Guid } from "../../Common/Types";
import snackbarService from "../../Services/SnackbarService";
import userService from "../../Services/UserService";
import SimpleLink from "../Common/SimpleLink";

interface PrefectRegistrationViewProps {
  election: Election;
  updateParent: () => void;
}

function PrefectElectionView(props: PrefectRegistrationViewProps) {
  const currentUserId = userService.getUserId();
  const isAlreadyVoted = props.election.alreadyVotedUserIds?.indexOf(currentUserId!) !== -1;
  const canVote = props.election.candidates?.find(x => x.id == currentUserId) === undefined && !isAlreadyVoted;
  const votesSum = props.election.votingInfos?.reduce((sum, next) => sum += next.votes!, 0);

  const vote = async (candidateId: Guid) => {
    const result = await Api.elections.vote(props.election.sectionInfo?.id!, candidateId);
    if (!result.ensureSuccess()) {
      snackbarService.push('Ошибка', 'error');
      return;
    }
    props.updateParent();
  }

  const createCandidateInfo = (candidate: UserInfo) => {
    const currentVotes = props.election.votingInfos?.find(x => x.candidate!.id! == candidate!.id!)?.votes;
    const percentage = Math.round(currentVotes! / votesSum! * 100);
    return (
      <Grid container direction="row" columnSpacing={1}>
        <Grid item xs={2}>
          <SimpleLink component="span" to={`/users/${candidate?.id}`}>
            {candidate?.userName}
          </SimpleLink>
        </Grid>
        {canVote &&
          <Grid item xs={3}>
            <Button size="small" color="info" onClick={() => vote(candidate.id!)} variant="contained" sx={{ mt: 1 }}>
              Проголосовать
          </Button>
          </Grid>
        }
        {isAlreadyVoted || !canVote &&
          <Grid item xs={2}>
            {currentVotes} ({percentage}%)
          </Grid>
        }
      </Grid>
    )
  }

  return (
    <>
      <Box sx={{ mb: 1 }}>
        <Typography component={'span'}>Тур: {props.election.currentRoundNumber}</Typography>
      </Box>
      {!isAlreadyVoted
        ? props.election.candidates?.map(x => createCandidateInfo(x))
        : props.election.votingInfos?.sort((a, b) => { return a.votes! < b.votes! ? 1 : -1 })
                                     .map(x => createCandidateInfo(x.candidate!))
      }
    </>
  )
}

export default PrefectElectionView;