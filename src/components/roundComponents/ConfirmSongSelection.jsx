export default function ConfirmSongSelection(props) {
  const {
    songData,
    userNicknames,
    setCurrentUser,
    currentUser,
    setSongData,
    chosenSongs,
    setChosenSongs,
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
        "player": userNicknames[currentUser]
      }
    ]);
    setSongData({});
    if(currentUser == userNicknames.length - 1){
      setAllSongsArePicked(true);
    } else {
      setCurrentUser(currentUser + 1);
    }
  }

  return(
    <>
      <p>{songData.artistName} - {songData.trackName} ({songData.albumName})</p>
      <button onClick={() => { updateChooseSongScreen(); } }> Pick this song </button>
    </>
  )
}
