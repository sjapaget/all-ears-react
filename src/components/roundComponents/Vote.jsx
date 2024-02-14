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
      countDown > 0 && setTimeout(() => {
        setCountDown(countDown - 1)
      }, 1000);
      countDown == 0 && playerVotes(-1)
    }, [countDown]);

    function Buttons({ number }) {
      const buttons = [];
      for(let i = 0; i < number; i++) {
        buttons.push(<button onClick={() => playerVotes(i)} key={i}>{userNicknames[i]}</button>);
      }
      return buttons;
    }

    function playerVotes(index) {
      const playerVotedFor = index >= 0 ? userNicknames[index] : null
      setVotes([
        ...votes,
        {
          "player": userNicknames[userIndex],
          "voted_for": playerVotedFor
        }
      ]);
      updateUserIndex();
    }

    const updateUserIndex = () => {
      if(userIndex == userNicknames.length - 1) {
        setRoundStep(2);
      } else {
        setUserIndex(userIndex + 1);
        setCountDown(10);
      }
    }

    return (
        <>
            {/*
                1. Render name of player whose turn it is to vote w/ button to start vote
                2. Player clicks start
                3. Render a grid of buttons with players nicknames.
                4. Player clicks who they're voting for

                If still players who need to vote, GOTO 1

                5. Store result of vote to be revealed later & restart roundsteps from
                PlayRandomSong component.
            */}
          <h2>{userNicknames[userIndex]}, your time to vote</h2>
          <p>{countDown}</p>
          <Buttons number={userNicknames.length}/>
        </>
    )
  }
