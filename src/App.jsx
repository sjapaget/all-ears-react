import { useState } from 'react'
import './App.css'
import WelcomeScreen from './components/screens/WelcomeScreen';
import PlayersScreen from './components/screens/PlayersScreen';
import AddRounds from './components/screens/AddRoundsScreen';
import RoundScreen from './components/screens/RoundScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [userNicknames, setUserNicknames] = useState([]);
  const [matchId, setMatchId] = useState();
  const [numRounds, setNumRounds] = useState(3);

  // console.log(matchId)
  // console.log(userNicknames);

  const changeScreen = (nextScreen) => setCurrentScreen(nextScreen);

  return (
    <>
      {currentScreen == 0 && <WelcomeScreen
        currentScreen={currentScreen}
        changeScreen={changeScreen}
      />}

      {currentScreen == 1 && <PlayersScreen
        currentScreen={currentScreen}
        changeScreen={changeScreen}
        setUserNicknames={setUserNicknames}
      />}

      {currentScreen == 2 && <AddRounds
        currentScreen={currentScreen}
        changeScreen={changeScreen}
        userNicknames={userNicknames}
        setMatchId={setMatchId}
        numRounds={numRounds}
        setNumRounds={setNumRounds}
      />}

      {currentScreen == 3 && <RoundScreen
        totalNumberOfRounds={numRounds}
      />}
    </>
  )
}

export default App
