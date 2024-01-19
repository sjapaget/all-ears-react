import { useState } from 'react'
import './App.css'
import WelcomeScreen from './components/screens/WelcomeScreen';
import AddRounds from './components/screens/AddRoundsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [matchId, setMatchId] = useState();
  const [numRounds, setNumRounds] = useState(3);

  console.log(matchId)

  const changeScreen = (nextScreen) => setCurrentScreen(nextScreen);

  return (
    <>
      {currentScreen == 0 && <WelcomeScreen 
        currentScreen={currentScreen}
        changeScreen={changeScreen}
      />}

      {currentScreen == 2 && <AddRounds
        currentScreen={currentScreen}
        changeScreen={changeScreen}
        setMatchId={setMatchId}
        numRounds={numRounds}
        setNumRounds={setNumRounds}
      />}
    </>
  )
}

export default App
