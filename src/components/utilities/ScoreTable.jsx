import { useState } from 'react';

export default function ScoreTable(props) {
  const {
    scores
  } = props;

  const rows = [];
  const sortedScores = scores.toSorted((a, b) => b.score - a.score);
  for(const player of sortedScores) {
    const row = <div key={player.nickname}><p>{player.nickname}</p><p>{player.score}</p></div>
    rows.push(row);
  }

  return(
    <>
    <div>{rows}</div>
    </>
  )
}
