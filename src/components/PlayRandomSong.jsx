
export default function PlayRandomSong(props) {
  const {
    playableSongs,
    setPlayableSongs
  } = props;

  const randomIndex = Math.floor(Math.random() * (playableSongs.length))
  const song = playableSongs[randomIndex];
  setPlayableSongs( playableSongs.slice(randomIndex, 1) );

  return (
    <>
      {/* {spotify player} */}
    </>
  )
}
