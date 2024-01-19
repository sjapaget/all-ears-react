import { useState } from 'react'
import './App.css'
import WelcomeScreen from './components/screens/WelcomeScreen';

function App() {
  const [currentScreen, setCurrentScreen] = useState(0);

  const changeScreen = (nextScreen) => setCurrentScreen(nextScreen);

  return (
    <>
      {currentScreen == 0 && <WelcomeScreen 
        currentScreen={currentScreen}
        changeScreen={changeScreen}
      />}
    </>
  )
}

export default App
