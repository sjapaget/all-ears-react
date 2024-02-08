import { useEffect } from "react";
import { useState } from "react";

export default function PlayRandomSong(props) {
  const {
    playableSongs,
    setPlayableSongs,
    setRoundStep
  } = props;

  const [currentSong, setCurrentSong] = useState();

  useEffect(() => {
    const randomIndex = Math.floor(Math.random() * (playableSongs.length))
    setCurrentSong(playableSongs[randomIndex]);
    setPlayableSongs(playableSongs.slice(randomIndex, 1));
  }, []);


  return (
    <>
      {/* {spotify player} */}
      <p>The song is {currentSong}</p>
      <button
        onClick={() => setRoundStep(2)}
      >
        Next
      </button>
    </>
  )
}
