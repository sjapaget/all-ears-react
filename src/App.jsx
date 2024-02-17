import { useEffect, useState } from 'react'
import './App.css'
import WelcomeScreen from './components/screens/WelcomeScreen';
import PlayersScreen from './components/screens/PlayersScreen';
import AddRounds from './components/screens/AddRoundsScreen';
import RoundScreen from './components/screens/RoundScreen';
import MatchRecapScreen from './components/screens/MatchRecapScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);
  const [userNicknames, setUserNicknames] = useState([]);
  const [matchId, setMatchId] = useState();
  const [numRounds, setNumRounds] = useState(3);
  const [scores, setScores] = useState([]);

  useEffect(() => {
    setInitialScores();
  }, [userNicknames]);

  function setInitialScores() {
    const initialScores = [];
    userNicknames.forEach((nickname) => {
      initialScores.push({
        "nickname": nickname,
        "score": 0
      });
    });
    setScores(initialScores);
  }

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
        userNicknames={userNicknames}
        matchId={matchId}
        currentScreen={currentScreen}
        changeScreen={changeScreen}
        scores={scores}
        setScores={setScores}
      />}
      {currentScreen == 4 && <MatchRecapScreen
        scores={scores}
        setCurrentScreen={setCurrentScreen}
      />}
    </>
  )
}

export default App
