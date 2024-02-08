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

  return (
    <>
      {true && <ChooseSongScreen
        userNicknames={userNicknames}
        roundNumber={roundNumber}
      />}
    </>
  )
}
