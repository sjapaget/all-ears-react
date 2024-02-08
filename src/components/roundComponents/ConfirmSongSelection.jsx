import { useState } from 'react'

export default function ConfirmSongSelection(props) {
  const {
    songData,
  } = props;

  return(
    <>
      <p>{songData.artistName} - {songData.trackName} ({songData.albumName})</p>
      <button>Pick this song</button>
    </>
  )
}
