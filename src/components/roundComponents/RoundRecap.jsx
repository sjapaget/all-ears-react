import { useState } from 'react';
import ScoreTable from '../utilities/ScoreTable';

export default function RoundRecap(props) {
  const {
    roundNumber,
    setRoundNumber,
    totalNumberOfRounds,
    scores,
    setRoundStep,
    setChosenSongs
  } = props;

  function startNextRound() {
    if(roundNumber < totalNumberOfRounds) {
      setRoundStep(1);
      setRoundNumber(roundNumber + 1);
    } else {
      // -> Match finished: go to match recap
      console.log("MATCH FINISHED !");
    }
    setChosenSongs([]);
  }

  return(
    <>
      <h2>End of Round #{roundNumber}</h2>
      <h3>Current scores:</h3>
      <ScoreTable scores={scores} />
      <button onClick={startNextRound}>Start Next Round</button>
    </>
  )
}
