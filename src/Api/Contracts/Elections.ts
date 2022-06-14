import { Section } from './Sections';
import { JsonObject, JsonProperty } from "json2typescript";
import { UserInfo } from './Common';
import { Guid } from '../../Common/Types';

@JsonObject("ElectionInfo")
export class Election {
  id?: Guid;

  sectionInfo?: Section;

  candidates?: UserInfo[];

  votingInfos?: Voting[];

  alreadyVotedUserIds?: Guid[];

  status?: ElectionsStatus;

  lastStatusModifiedDateTime?: string;

  currentRoundNumber?: number;
}

@JsonObject("VotingInfo")
export class Voting {
  candidate?: UserInfo;

  votes?: number;
}

export enum ElectionsStatus {
  Registration = 0,
  Elections = 1
}

export class ElectionsConditions {
  repliesNeededToVote?: number;
  ratingNeededToVote?: number;

  repliesNeededToBeElected?: number;
  ratingNeededToBeElected?: number;

  electionsPeriod?: string;
  periodBetweenRounds?: string;
}