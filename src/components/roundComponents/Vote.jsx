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

    useEffect(() => {
      if(allPlayersHaveVoted()) {
        handleEndOfTurn();
      }
    }, [votes]);


    function handleEndOfTurn(){
      saveVotesInQuestionData();
      computeScores();
      resetUserIndex();
      resetVotes();
      nextRoundOrNextSong();
    }

    const nextRoundOrNextSong = () => {
      allSongsWerePlayed() ? showRoundRecap() : playNextRandomSong();
    }

    const saveVotesInQuestionData = () => {
      // Added this function in case we later want to save rounds details in db
      setQuestionData(prevQuestionData => ({
        ...prevQuestionData,
        "votes": votes
      }));
    }

    function computeScores(){
      const chooser = questionData.chosenBy;
      const finders = getPlayersWhoVotedFor(chooser);
      if(multiplePlayersGuessed(finders)){
        addPointsToPlayers(1, finders)
      } else if(onePlayerGuessed(finders)) {
        const winners = [finders[0], chooser];
        addPointsToPlayers(3, winners);
      } else {
        scoresUnchanged();
      }
    }

    function getPlayersWhoVotedFor(chooser){
      const finders = [];
      const guesserVotes = removeChooserFromVotes(chooser);
      guesserVotes.forEach((ballot) => {
        if(votedForChooser(ballot, chooser)){
          finders.push(ballot.player);
        }
      });
      return finders;
    }

    function addPointsToPlayers(points, winners) {
      const newScores = [];
      scores.forEach((player) => {
        if(winners.includes(player.nickname)){
          newScores.push({ "nickname": player.nickname, "score": player.score + points });
        } else {
          newScores.push(player);
        }
      });
      setScores(newScores);
    }

    // Handler

    const playerVotes = (index) => {
      const playerVotedFor = index >= 0 ? userNicknames[index] : null;
      savePlayerVote(playerVotedFor);
      nextUserTurn();
    }

    // Helper functions for better readability

    const resetUserIndex = () => setUserIndex(0);
    const incrementUserIndex = () => setUserIndex(userIndex + 1);

    const nextUserTurn = () => {
      incrementUserIndex();
      resetCountDown();
    }

    const resetCountDown = () => setCountDown(10);
    const decreaseCountDown = () => setCountDown(prevCountDown => prevCountDown - 1);

    const allSongsWerePlayed = () => numberOfSongsToPlay == 0;
    const playNextRandomSong = () => setRoundStep(2);
    const showRoundRecap = () => setRoundStep(5);

    const multiplePlayersGuessed = (finders) => finders.length > 1;
    const onePlayerGuessed = (finders) => finders.length == 1;
    const votedForChooser = (ballot, chooser) => ballot.votedFor == chooser;
    const scoresUnchanged = () => setScores(scores);

    const resetVotes = () => setVotes([]);
    const playerVotesBlank = () => playerVotes(-1);
    const allPlayersHaveVoted = () => votes.length == userNicknames.length;
    const removeChooserFromVotes = (chooser) => votes.filter(ballot => ballot.player != chooser);
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
