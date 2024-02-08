import { useState, useEffect } from 'react'

export default function ChooseSongScreen(props) {
  const {
    roundNumber,
    userNicknames,
  } = props;

  const [currentUser, setCurrentUser] = useState(0);
  const [spotifyToken, setSpotifyToken] = useState('');

  async function fetchSpotifySong(e){
    e.preventDefault();
    console.log("In fetchSpotifySong");

    // Get song details from form and format the data
    const songDetails = new FormData(e.currentTarget);
    let songTitle = songDetails.get('song-title').trim();
    let artist = songDetails.get('artist').trim();
    let album = songDetails.get('album').trim();

    // Return if no title has been provided
    if(!songTitle) return;

    songTitle = encodeURIComponent(songTitle);
    if(artist){
      artist = "artist:" + encodeURIComponent(artist);
    }
    if(album){
      album = "album:" + encodeURIComponent(album);
    }

    const url = `https://api.spotify.com/v1/search?q=track:${songTitle}%20${artist}%20${album}&type=track`;

    const songSearch = await fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${spotifyToken}`
      }
    });
    const json = await songSearch.json();
    // songId = json.tracks.items[0].id;

    const trackName = json.tracks.items[0].name;
    const albumName = json.tracks.items[0].album.name;
    const artistName = json.tracks.items[0].artists[0].name;

    console.log(trackName);
    console.log(albumName);
    console.log(artistName);
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
