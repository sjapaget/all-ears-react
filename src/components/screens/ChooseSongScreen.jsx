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

  const [userIndex, setUserIndex] = useState(0);
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
    // Fetch song details in form and format the data for API call
    const form = e.currentTarget;
    const songDetails = getSongDetails(form);

    // Return if no title has been provided
    if(!songDetails.title) return;

    // Fetch song from spotify and retrieve its data from the response
    const spotifyResponse = await fetchSpotify(songDetails);
    // Return if response contains no result
    if(spotifyResponse.tracks.items.length == 0) return;
    const spotifyTrack = getSpotifyTrackDetails(spotifyResponse);

    setSongData({
      "trackName": spotifyTrack.track,
      "albumName": spotifyTrack.album,
      "artistName": spotifyTrack.artist,
      "id": spotifyTrack.id
    })
  }

  async function fetchSpotify(songDetails) {
    const url = `https://api.spotify.com/v1/search?q=track:${songDetails.title}%20${songDetails.artist}%20${songDetails.album}&type=track`;

    const songSearch = await fetch(url, {
      method: 'GET',
      headers: {
          'Authorization': `Bearer ${spotifyToken}`
      }
    });
    const json = await songSearch.json();
    return json;
  }

  function getSongDetails(form){
    const formData = new FormData(form);
    const title = formData.get('song-title').trim();
    let artist = formData.get('artist').trim();
    let album = formData.get('album').trim();

    return apiFormattedSongDetails(title, artist, album);
  }

  function apiFormattedSongDetails(title, artist, album) {
    // Formats provided details into SpotifyAPI filters
    if(artist){
      artist = `artist:${encodeURIComponent(artist)}`;
    }
    if(album){
      album = `album:${encodeURIComponent(album)}`
    }
    return {
      "title": encodeURIComponent(title),
      "artist": artist,
      "album": album
    }
  }

  function getSpotifyTrackDetails(spotifyResponse){
    const track = spotifyResponse.tracks.items[0].name;
    const album = spotifyResponse.tracks.items[0].album.name;
    const artist = spotifyResponse.tracks.items[0].artists[0].name;
    const id = spotifyResponse.tracks.items[0].id;

    return {
      "track": track,
      "album": album,
      "artist": artist,
      "id": id
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
      <h2>{userNicknames[userIndex]}, pick a song !</h2>

      <SongSearchForm fetchSpotifySong={fetchSpotifySong} />

      {Object.keys(songData).length > 0 && <ConfirmSongSelection
        songData={songData}
        userNicknames={userNicknames}
        userIndex={userIndex}
        setUserIndex={setUserIndex}
        setSongData={setSongData}
        chosenSongs={chosenSongs}
        setChosenSongs={setChosenSongs}
        setAllSongsArePicked={setAllSongsArePicked}
      />}
    </>
  )
}
