import React, { useState, useEffect } from 'react';

export default function PlayRandomSong(props) {
  const {
    playableSongs,
    setPlayableSongs,
    setRoundStep,
    setRoundDetails,
    roundNumber
  } = props;

  const [currentSong, setCurrentSong] = useState(null);

  useEffect(() => {
    function selectRandomSong() {
      const randomIndex = Math.floor(Math.random() * playableSongs.length);
      const selectedSong = playableSongs[randomIndex];

      const updatedSongs = playableSongs.filter((_, index) => index !== randomIndex);
      setPlayableSongs(updatedSongs);

      return selectedSong;
    }
    setCurrentSong(selectRandomSong());
  }, []);

  useEffect(() => {
    // initialize roundDetails with .number, .spotifySongId, .chosenBy
  }, [currentSong]);

  return (
    <>
      <script src="https://open.spotify.com/embed/iframe-api/v1" async></script>
      <div id="embed-iframe"></div>

      {currentSong && currentSong.spotifyId && <iframe
        title="Spotify Web Player"
        src={`https://open.spotify.com/embed/track/${currentSong.spotifyId}`}
        allow="true"
      />}

      <button
        onClick={() => setRoundStep(3)}
      >
        Next
      </button>
    </>
  );
}
