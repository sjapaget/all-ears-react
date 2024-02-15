import { useState } from 'react';

export default function RoundRecap(props) {
  const {
    roundNumber,
    scores,
    setRoundStep
  } = props;

  function ScoreTable({ scores }) {
    const rows = [];
    for(const player of scores) {
      const row = <div key={player.nickname}><p>{player.nickname}</p><p>{player.score}</p></div>
      rows.push(row);
    }
    return <div>{rows}</div>
  }

  function startNextRound() {
    setRoundStep(1);
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
