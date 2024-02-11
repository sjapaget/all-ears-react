import { useState } from 'react';

import PlayRandomSong from '../roundComponents/PlayRandomSong';
import DiscussionTime from '../roundComponents/DiscussionTime';
import ChooseSongScreen from './ChooseSongScreen';

export default function RoundScreen(props) {
  const {
    totalNumberOfRounds,
    userNicknames,
    matchId,
    currentScreen,
    changeScreen,
  } = props;

  const [chosenSongs, setChosenSongs] = useState([]);
  const [roundNumber, setRoundNumber] = useState(1);
  const [roundStep, setRoundStep] = useState(1);

  const [tempChosenSongs, setTempChosenSongs] = useState([1, 2, 3, 4])

  const [playableSongs, setPlayableSongs] = useState(tempChosenSongs);

  return (
    <>
      {1 == roundStep && <ChooseSongScreen
        userNicknames={userNicknames}
        roundNumber={roundNumber}
        roundStep={roundStep}
        setRoundStep={setRoundStep}
        chosenSongs={chosenSongs}
        setChosenSongs={setChosenSongs}
      />}
      {2 == roundStep && <PlayRandomSong
        playableSongs={playableSongs}
        setPlayableSongs={setPlayableSongs}
        setRoundStep={setRoundStep}
      />}
       {3 == roundStep && <DiscussionTime
        setRoundStep={setRoundStep}
      />}
    </>
  )
}
