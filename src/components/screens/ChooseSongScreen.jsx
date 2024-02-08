import { useState } from 'react'

export default function ChooseSongScreen(props) {
  const {
    roundNumber,
    userNicknames,
  } = props;

  const [currentUser, setCurrentUser] = useState(0);

  return (
    <>
      <h1>Round #{roundNumber}</h1>
      <h2>{userNicknames[currentUser]}, pick a song !</h2>
    </>
  )
}
