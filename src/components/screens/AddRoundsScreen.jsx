import { useState } from 'react'

export default function AddRounds(props) {

    const {
        currentScreen,
        changeScreen
    } = props;

    const [numRounds, setNumRounds] = useState(3);

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
                onClick={() => changeScreen(currentScreen + 1)}
            >
                Play {numRounds} Rounds
            </button>
        </>
    )
}