import { useEffect, useState } from 'react'

export default function ConfirmSongSelection(props) {
  const {
    songData,
    setCurrentUser,
    currentUser
  } = props;

  return(
    <>
      <p>{songData.artistName} - {songData.trackName} ({songData.albumName})</p>
      <button onClick={() => {setCurrentUser(currentUser + 1)}}>Pick this song</button>
    </>
  )
}
