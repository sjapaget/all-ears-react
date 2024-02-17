import { useState } from 'react';

import PlayRandomSong from '../roundComponents/PlayRandomSong';
import DiscussionTime from '../roundComponents/DiscussionTime';
import ChooseSongScreen from './ChooseSongScreen';
import Vote from '../roundComponents/Vote';
import RoundRecap from '../roundComponents/RoundRecap';

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

  const [questionData, setQuestionData] = useState({});
  const [scores, setScores] = useState(setInitialScores());

  function setInitialScores() {
    const initialScores = [];
    userNicknames.forEach((nickname) => {
      initialScores.push({
        "nickname": nickname,
        "score": 0
      });
    });
    return initialScores;
  }

  const numberOfSongsToPlay = playableSongs.length;

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
        setQuestionData={setQuestionData}
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
        questionData={questionData}
        setQuestionData={setQuestionData}
        scores={scores}
        setScores={setScores}
        numberOfSongsToPlay={numberOfSongsToPlay}
        setRoundNumber={setRoundNumber}
      />}
      {5 == roundStep && <RoundRecap
        roundNumber={roundNumber}
        setRoundNumber={setRoundNumber}
        totalNumberOfRounds={totalNumberOfRounds}
        scores={scores}
        setRoundStep={setRoundStep}
        setChosenSongs={setChosenSongs}
      />}
    </>
  )
}
