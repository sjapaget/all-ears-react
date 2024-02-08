import { useState, useEffect } from 'react'
import ConfirmSongSelection from '../roundComponents/ConfirmSongSelection';
import SongSearchForm from '../roundComponents/SongSearchForm';

export default function ChooseSongScreen(props) {
  const {
    roundNumber,
    userNicknames,
    roundStep,
    setRoundStep,
    chosenSongs,
    setChosenSongs
  } = props;

  const [currentUser, setCurrentUser] = useState(0);
  const [spotifyToken, setSpotifyToken] = useState('');
  const [songData, setSongData] = useState({});
  const [allSongsArePicked, setAllSongsArePicked] = useState(false);

  useEffect(() => {
    getSpotifyApiToken();
  }, []);

  useEffect(() => {
    if(allSongsArePicked) setRoundStep(roundStep + 1);
  }, [allSongsArePicked, roundStep, setRoundStep]);

  async function fetchSpotifySong(e){
    e.preventDefault();

    // Get song details from form and format the data
    const songDetails = getSongDetails(e.currentTarget);

    // Return if no title has been provided
    if(!songDetails.title) return;

    // Fetch song from spotify
    const url = `https://api.spotify.com/v1/search?q=track:${songDetails.title}%20${songDetails.artist}%20${songDetails.album}&type=track`;

    const songSearch = await fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${spotifyToken}`
      }
    });
    const json = await songSearch.json();

    // Get song details from Spotify response
    const trackName = json.tracks.items[0].name;
    const albumName = json.tracks.items[0].album.name;
    const artistName = json.tracks.items[0].artists[0].name;
    const songId = json.tracks.items[0].id;

    setSongData({
      "trackName": trackName,
      "albumName": albumName,
      "artistName": artistName,
      "id": songId
    })
  }

  function getSongDetails(form){
    const formData = new FormData(form);
    const title = formData.get('song-title').trim();
    let artist = formData.get('artist').trim();
    let album = formData.get('album').trim();
    artist = artist ? `artist:${encodeURIComponent(artist)}` : artist
    album = album ? `album:${encodeURIComponent(album)}` : album

    return {
      "title": encodeURIComponent(title),
      "artist": artist,
      "album": album
    }
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


  return (
    <>
      <h1>Round #{roundNumber}</h1>
      <h2>{userNicknames[currentUser]}, pick a song !</h2>

      <SongSearchForm fetchSpotifySong={fetchSpotifySong} />

      {Object.keys(songData).length > 0 && <ConfirmSongSelection
        songData={songData}
        userNicknames={userNicknames}
        currentUser={currentUser}
        setCurrentUser={setCurrentUser}
        setSongData={setSongData}
        chosenSongs={chosenSongs}
        setChosenSongs={setChosenSongs}
        setAllSongsArePicked={setAllSongsArePicked}
      />}
    </>
  )
}
