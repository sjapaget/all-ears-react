import { useEffect, useState } from 'react'

export default function ConfirmSongSelection(props) {
  const {
    songData,
    userNicknames,
    setCurrentUser,
    currentUser,
    setSongData,
    songIds,
    setSongIds
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
          setSongIds([
            ...songIds,
            {
              "songId": songData.id,
              "player": userNicknames[currentUser]
            }
          ])
          setSongData({});
        }}
      >
        Pick this song
      </button>
    </>
  )
}
