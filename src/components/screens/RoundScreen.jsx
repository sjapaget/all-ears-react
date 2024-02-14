import { useState } from 'react';

import PlayRandomSong from '../roundComponents/PlayRandomSong';
import DiscussionTime from '../roundComponents/DiscussionTime';
import ChooseSongScreen from './ChooseSongScreen';
import Vote from '../roundComponents/Vote';

export default function RoundScreen(props) {
  const {
    totalNumberOfRounds,
    userNicknames,
    matchId,
    currentScreen,
    changeScreen,
  } = props;

  const [roundNumber, setRoundNumber] = useState(1);
  const [roundStep, setRoundStep] = useState(1);

  const [chosenSongs, setChosenSongs] = useState([]);
  const [playableSongs, setPlayableSongs] = useState(chosenSongs);


  console.log(playableSongs);
  return (
    <>
      {1 == roundStep && <ChooseSongScreen
        userNicknames={userNicknames}
        roundNumber={roundNumber}
        roundStep={roundStep}
        setRoundStep={setRoundStep}
        chosenSongs={chosenSongs}
        setChosenSongs={setChosenSongs}
        setPlayableSongs={setPlayableSongs}
      />}
      {2 == roundStep && <PlayRandomSong
        playableSongs={playableSongs}
        setPlayableSongs={setPlayableSongs}
        setRoundStep={setRoundStep}
      />}
       {3 == roundStep && <DiscussionTime
        setRoundStep={setRoundStep}
      />}
      {4 == roundStep && <Vote
        setRoundStep={setRoundStep}
        userNicknames={userNicknames}
        userIndex={userIndex}
        setUserIndex={setUserIndex}
        votes={votes}
        setVotes={setVotes}
      />}
    </>
  )
}
