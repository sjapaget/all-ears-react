import { useEffect, useState } from "react";

export default function Vote(props) {
    const {
        setRoundStep,
        userNicknames,
        userIndex,
        setUserIndex,
        votes,
        setVotes
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
        playNextRandomSong();
        resetUserIndex();
      } else {
        nextUserTurn();
      }
      resetCountDown();
    }

    // Helper functions for better readability
    const resetUserIndex = () => setUserIndex(0);
    const nextUserTurn = () => setUserIndex(userIndex + 1);
    const resetCountDown = () => setCountDown(10);
    const decreaseCountDown = () => setCountDown(prevCountDown => prevCountDown - 1);
    const isLastUser = () => userIndex == userNicknames.length - 1;
    const playerVotesBlank = () => playerVotes(-1);
    const playNextRandomSong = () => setRoundStep(2);
    const savePlayerVote = (playerVotedFor) => {
      setVotes([
        ...votes,
        {
          "player": userNicknames[userIndex],
          "voted_for": playerVotedFor
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
