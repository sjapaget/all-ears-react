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
        </>
    )
  }
