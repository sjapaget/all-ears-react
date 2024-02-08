import { useState } from 'react'

export default function AddRounds(props) {

    const {
        currentScreen,
        changeScreen,
        userNicknames,
        setMatchId,
        numRounds,
        setNumRounds
    } = props;

    const handleClick = () => {

        const data = {
            "match": {
                "number_of_rounds": numRounds
            },
            "nicknames": userNicknames
        }

        fetch("http://localhost:3000/matches", {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "Content-Type": "application/json",
            },
        })
        .then(response => {
            return response.json()
        })
        .then(data => {
            // Set match id in state with response data
            setMatchId(data.id)
            changeScreen(currentScreen + 1)
        })
        .catch(error => {
            console.error('There has been a problem with your fetch operation:', error);
        });
    }

    return (
        <>
            <input
                type="range"
                id="num-rounds"
                name="num-rounds"
                min="3"
                max="10"
                step="1"
                value={numRounds}
                onChange={(e) => setNumRounds(e.target.value)}

            />
            <label for="num-rounds">How many rounds do you want to play?</label>

            <button
                onClick={handleClick}
            >
                Play {numRounds} Rounds
            </button>
        </>
    )
}
