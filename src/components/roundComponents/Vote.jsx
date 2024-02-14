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

    function Buttons({ number }) {
      const buttons = [];
      for(let i = 0; i < number; i++) {
        buttons.push(<button onClick={() => playerVotes(i)} key={i}>{userNicknames[i]}</button>);
      }
      return buttons;
    }

    function playerVotes(index) {
      console.log("in playerVotes");
      // TODO
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
          <p>timer placeholder</p>
          <Buttons number={userNicknames.length}/>
        </>
    )
  }
