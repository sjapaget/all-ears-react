import { useState } from 'react'
import ScoreTable from '../utilities/ScoreTable';

export default function MatchRecapScreen(props) {
  const {
    scores,
    setScores,
    setCurrentScreen
  } = props;

  const startNewgame = () => {
    goToPlayersScreen();
    resetScores();
  }

  const resetScores = () => setScores([]);
  const goToPlayersScreen = () => setCurrentScreen(1);

  return(
    <>
    <h1>Match finished !</h1>
    <h3>Final scores:</h3>
    <ScoreTable scores={scores} />
    <button onClick={startNewgame}>Start New Game</button>
    </>
  )
}
