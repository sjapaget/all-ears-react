import { useState } from 'react'
import ScoreTable from '../utilities/ScoreTable';

export default function MatchRecapScreen(props) {
  const {
    scores,
  } = props;

  return(
    <>
    <h1>Match finished !</h1>
    <h3>Final scores:</h3>
    <ScoreTable scores={scores} />
    </>
  )
}
