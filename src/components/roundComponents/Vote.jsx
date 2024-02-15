import { useEffect, useState } from "react";

export default function Vote(props) {
    const {
        setRoundStep,
        userNicknames,
        userIndex,
        setUserIndex,
        votes,
        setVotes,
        questionData,
        setQuestionData,
        scores,
        setScores,
        numberOfSongsToPlay,
        setRoundNumber
    } = props;

    const [countDown, setCountDown] = useState(10);

    useEffect(() => {
      const timer = countDown > 0 && setInterval(() => {
        decreaseCountDown();
      }, 1000);

      if (countDown == 0) {
        playerVotesBlank();
      }
      return () => clearInterval(timer);
    }, [countDown]);

    const playerVotes = (index) => {
      const playerVotedFor = index >= 0 ? userNicknames[index] : null;
      savePlayerVote(playerVotedFor);
      handleUserTurns();
    }

    function handleUserTurns() {
      if(isLastUser()) {
        saveVotesInQuestionData();
        computeScoresFromQuestionData();
        if(numberOfSongsToPlay == 0) {
          startNextRound();
        } else {
          playNextRandomSong();
          resetUserIndex();
        }
      } else {
        nextUserTurn();
      }
      resetCountDown();
    }

    const saveVotesInQuestionData = () => {
      setQuestionData(prevQuestionData => ({
        ...prevQuestionData,
        "votes": votes
      }));
    }

    function computeScoresFromQuestionData(){
      const chooser = questionData.chosenBy;
      const finders = [];
      votes.forEach((ballot) => {
        if(ballot.player == chooser) return;

        if(ballot.votedFor == chooser){
          finders.push(ballot.player);
        }
      });
      if(finders.length == 0) return;

      else if(finders.length == 1) {
        add3PointsTo(chooser, finders[0]);
      }
      else {
        add1PointTo(finders);
      }
    }

    function add3PointsTo(chooser, finder){
      const newScores = [];
      scores.forEach((player) => {
        if(player.nickname == chooser || player.nickname == finder){
          newScores.push({ "nickname": player.nickname, "score": player.score + 3 });
        } else {
          newScores.push(player);
        }
      });
      setScores(newScores);
    }

    function add1PointTo(finders) {
      const newScores = [];
      scores.forEach((player) => {
        if(finders.includes(player.nickname)) {
          newScores.push({ "nickname": player.nickname, "score": player.score + 1 });
        } else {
          newScores.push(player);
        }
      });
      setScores(newScores);
    }

    // Helper functions for better readability
    const resetUserIndex = () => setUserIndex(0);
    const nextUserTurn = () => setUserIndex(userIndex + 1);
    const resetCountDown = () => setCountDown(10);
    const decreaseCountDown = () => setCountDown(prevCountDown => prevCountDown - 1);
    const isLastUser = () => userIndex == userNicknames.length - 1;
    const playerVotesBlank = () => playerVotes(-1);
    const playNextRandomSong = () => setRoundStep(2);
    const startNextRound = () => {
      setRoundNumber(prevRoundNumber => prevRoundNumber + 1);
      setRoundStep(1);
    }
    const savePlayerVote = (playerVotedFor) => {
      setVotes([
        ...votes,
        {
          "player": userNicknames[userIndex],
          "votedFor": playerVotedFor
        }
      ]);
    }

    // Buttons Component
    function Buttons({ number }) {
      const buttons = [];
      for(let i = 0; i < number; i++) {
        buttons.push(<button onClick={() => playerVotes(i)} key={i}>{userNicknames[i]}</button>);
      }
      return buttons;
    }

    return (
        <>
          <h2>{userNicknames[userIndex]}, your time to vote</h2>
          <p>{countDown}</p>
          <Buttons number={userNicknames.length}/>
        </>
    )
  }
