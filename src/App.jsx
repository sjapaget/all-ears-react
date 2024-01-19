import { useState } from 'react'
import './App.css'
import WelcomeScreen from './components/screens/WelcomeScreen';
import AddRounds from './components/screens/AddRoundsScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState(2);

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
      />}
    </>
  )
}

export default App
