import { useState, useEffect } from 'react'

export default function ChooseSongScreen(props) {
  const {
    roundNumber,
    userNicknames,
  } = props;

  const [currentUser, setCurrentUser] = useState(0);
  const [spotifyToken, setSpotifyToken] = useState('');

  const fetchSpotifySong = (e) => {
    e.preventDefault();
    console.log("In fetchSpotifySong");
  }

  async function getSpotifyApiToken() {
    const url = 'https://accounts.spotify.com/api/token';
    let response = await fetch(url, {
      method: 'POST',
      body: `grant_type=client_credentials&client_id=${import.meta.env.VITE_SPOTIFY_CLIENT_ID}&client_secret=${import.meta.env.VITE_SPOTIFY_CLIENT_SECRET}`,
      headers: {
        'Content-type': 'application/x-www-form-urlencoded'
      }
    })

    response = await response.json();

    setSpotifyToken(response.access_token);
  }

  useEffect(() => {
    getSpotifyApiToken();
  }, []);

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
