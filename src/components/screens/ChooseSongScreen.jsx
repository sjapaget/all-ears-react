import { useState } from 'react'

export default function ChooseSongScreen(props) {
  const {
    roundNumber,
    userNicknames,
  } = props;

  const [currentUser, setCurrentUser] = useState(0);

  const fetchSpotifySong = (e) => {
    e.preventDefault();
    console.log("In fetchSpotifySong");
  }

  return (
    <>
      <h1>Round #{roundNumber}</h1>
      <h2>{userNicknames[currentUser]}, pick a song !</h2>

      <form action="" method="get" onSubmit={fetchSpotifySong}>
        <label htmlFor="song-title">Title</label>
        <input
          type="text"
          id="song-title"
          name="song-title"
        />
        <label htmlFor="artist">Artist</label>
        <input
          type="text"
          id="artist"
          name="artist"
        />
        <label htmlFor="album">Album</label>
        <input
          type="text"
          id="album"
          name="album"
        />
        <button type="submit">Search on Spotify</button>
      </form>
    </>
  )
}
