import { useEffect, useState } from 'react'

export default function ConfirmSongSelection(props) {
  const {
    songData,
    setCurrentUser,
    currentUser,
    setSongData
  } = props;

  const resetInputs = () => {
    const inputs = document.querySelectorAll('input');
    inputs.forEach((input) => {
      input.value = "";
    });
  }

  return(
    <>
      <p>{songData.artistName} - {songData.trackName} ({songData.albumName})</p>
      <button
        onClick={() => {
          setCurrentUser(currentUser + 1);
          resetInputs();
          setSongData({});
        }}
      >
        Pick this song
      </button>
    </>
  )
}
