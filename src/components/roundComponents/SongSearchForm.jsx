export default function SongSearchForm(props) {
  const {
    fetchSpotifySong
  } = props;

  return (
    <>
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
  );
}
