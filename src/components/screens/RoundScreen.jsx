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
  const [userIndex, setUserIndex] = useState(0);

  const [chosenSongs, setChosenSongs] = useState([]);
  const [playableSongs, setPlayableSongs] = useState(chosenSongs);
  const [votes, setVotes] = useState([]);

  const [roundDetails, setRoundDetails] = useState({});

  // Add roundData state with: .number, .spotifySongId, .chosenBy, .votes(=> votes state array)
  // Initialize roundData at step 2
  // Update it with votes when all players have voted at step 4

  console.log(roundDetails);

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
        userIndex={userIndex}
        setUserIndex={setUserIndex}
      />}
      {2 == roundStep && <PlayRandomSong
        playableSongs={playableSongs}
        setPlayableSongs={setPlayableSongs}
        chosenSongs={chosenSongs}
        setRoundStep={setRoundStep}
        setRoundDetails={setRoundDetails}
        roundNumber={roundNumber}
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
        roundDetails={roundDetails}
        setRoundDetails={setRoundDetails}
      />}
    </>
  )
}
