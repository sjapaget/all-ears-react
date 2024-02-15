import React, { useState, useEffect } from 'react';

export default function PlayRandomSong(props) {
  const {
    playableSongs,
    setPlayableSongs,
    chosenSongs,
    setRoundStep,
    setQuestionData,
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
    setCurrentSong(selectRandomSong())
  }, []);

  function newQuestionData() {
    const songChosenBy = findWhoChose(currentSong);
    setQuestionData({
      "roundNumber": roundNumber,
      "spotifySongId": currentSong.spotifyId,
      "chosenBy": songChosenBy,
    });
  }

  const findWhoChose = (songToFind) => {
    const chosenSong = chosenSongs.find(chosenSong => chosenSong.spotifyId == songToFind.spotifyId);
    return chosenSong.player;
  }

  const prepareNextStep = () => {
    newQuestionData();
    setRoundStep(3);
  }

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
        onClick={() => prepareNextStep()}
      >
        Next
      </button>
    </>
  );
}
