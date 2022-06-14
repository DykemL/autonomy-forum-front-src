import { RestoreOutlined, ThumbUp } from "@mui/icons-material";
import { Fab, Badge, Popover, Typography, Tooltip, Box } from "@mui/material";
import { useState } from "react";
import Api from "../../Api/Api";
import { Reply } from "../../Api/Contracts/Replies";
import { Topic } from "../../Api/Contracts/Topics";
import { Guid } from "../../Common/Types";
import snackbarService from "../../Services/SnackbarService";
import userService from "../../Services/UserService";
import SimpleLink from "./SimpleLink";
import { lightBlue } from "@mui/material/colors";
import { UserInfo } from "../../Api/Contracts/Common";

interface LikeViewProps {
  reply?: Reply;
  topic?: Topic;
  setTopic: (topic?: Topic) => void;
}

function LikeView(props: LikeViewProps) {
  const currentUserId = userService.getUserId();
  const reply = props.reply;
  const topic = props.topic;

  const isAlreadyLiked = reply?.favoredBy?.includes(currentUserId!);
  const canLike = currentUserId !== undefined && !isAlreadyLiked && reply?.author?.id != currentUserId;

  const [isDoLikeReply, setIsDoLikeReply] = useState(false);
  const doLikeReply = async (replyId: Guid): Promise<boolean> => {
    if (isDoLikeReply) {
      return false;
    }
    setIsDoLikeReply(true);
    const result = await Api.replies.doLikeReply(replyId);
    if (!result.ensureSuccess()) {
      snackbarService.push('Не удалось оценить ответ', 'error');
    }
    props.setTopic(undefined);
    setIsDoLikeReply(false);
    return true;
  }

  const cancelLikeReply = async (replyId: Guid): Promise<boolean> => {
    if (isDoLikeReply) {
      return false;
    }
    setIsDoLikeReply(true);
    const result = await Api.replies.cancelLikeReply(replyId);
    if (!result.ensureSuccess()) {
      snackbarService.push('Не удалось отменить оценку', 'error');
    }
    props.setTopic(undefined);
    setIsDoLikeReply(false);
    return true;
  }

  const createRepliedByList = () => {
    return (
      <>
        Оценили:
        {reply?.favoredUsersBy?.map(x => {
          return (
            <>
              <SimpleLink component={"div"} variant="body2" color={lightBlue[50]} to={"/users/" + x?.id}>
                {x?.userName}
              </SimpleLink>
            </>
          )
        })}
      </>
    );
  };

  const thumbUpColor = !isAlreadyLiked ? 'action' : 'success';
  return (
    <Tooltip title={createRepliedByList()}>
      <Box>
        <Fab
          onClick={() => {
            if (!isAlreadyLiked) {
              doLikeReply(reply?.id!);
              return;
            }

            cancelLikeReply(reply?.id!);
          }} 
          disabled={!canLike && !isAlreadyLiked} size="small" color="default">
            <Badge anchorOrigin={{ vertical: 'top', horizontal: 'left' }} color="secondary" badgeContent={reply?.favoredBy?.length ?? 0} showZero>
              <ThumbUp color={thumbUpColor} />
            </Badge>
        </Fab>
      </Box>
    </Tooltip>
  )
}

export default LikeView;