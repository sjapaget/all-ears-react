import { useState } from 'react';
import ScoreTable from '../utilities/ScoreTable';

export default function RoundRecap(props) {
  const {
    roundNumber,
    setRoundNumber,
    totalNumberOfRounds,
    scores,
    setRoundStep,
    setChosenSongs,
    currentScreen,
    changeScreen
  } = props;

  const moreRoundsToPlay = () => roundNumber < totalNumberOfRounds;

  const startNextRound = () => {
    setChosenSongs([]);
    setRoundStep(1);
    setRoundNumber(roundNumber + 1);
  }
  const showMatchDetails = () => {
    setChosenSongs([]);
    changeScreen(currentScreen + 1);
  }

  function NextButton() {
    if(moreRoundsToPlay()) {
      return <button onClick={startNextRound}>Start Next Round</button>
    } else {
      return <button onClick={showMatchDetails}>See Match Details</button>
    }
  }

  return(
    <>
      <h2>End of Round #{roundNumber}</h2>
      <h3>Current scores:</h3>
      <ScoreTable scores={scores} />
      <NextButton />
    </>
  )
}
