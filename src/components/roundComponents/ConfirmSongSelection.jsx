export default function ConfirmSongSelection(props) {
  const {
    songData,
    userNicknames,
    setUserIndex,
    userIndex,
    setSongData,
    chosenSongs,
    setChosenSongs,
    setPlayableSongs,
    setAllSongsArePicked
  } = props;

  const resetInputs = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = "";
    });
  }

  function updateChooseSongScreen() {
    resetInputs();
    setChosenSongs([
      ...chosenSongs,
      {
        "spotifyId": songData.id,
        "player": userNicknames[userIndex]
      }
    ]);
    setSongData({});
    if(userIndex == userNicknames.length - 1){
      setPlayableSongs(chosenSongs);
      setAllSongsArePicked(true);
    } else {
      setUserIndex(userIndex + 1);
    }
  }

  return(
    <>
      <p>{songData.artistName} - {songData.trackName} ({songData.albumName})</p>
      <button onClick={() => { updateChooseSongScreen(); } }> Pick this song </button>
    </>
  )
}
