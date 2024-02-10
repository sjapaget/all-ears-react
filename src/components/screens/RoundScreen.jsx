import { useState } from 'react'
import ChooseSongScreen from './ChooseSongScreen';

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
      {2 == roundStep && console.log(chosenSongs)}
    </>
  )
}
