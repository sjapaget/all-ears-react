import '../../PlayersScreen.css';

export default function PlayersScreen(props) {
  const {
    currentScreen,
    nextScreen
  } = props;

  const submitPlayers = (e) => {
    e.preventDefault();
    const users = { "users": buildData() }
    console.log(users);
  }

  const buildData = () => {
    const form = document.getElementById('playersForm');
    const data = new FormData(form);
    const users = []
    for(const user of data.values()) {
      users.push(user);
    }
    return users;
  }

  return (
    <>
      <h1>Who's playing ?</h1>
      <form action="http://localhost:3000/users/" method="post" onSubmit={submitPlayers} id="playersForm">
        <input type="text" name="user"/>
        <input type="text" name="user"/>
        <input type="text" name="user"/>
        <button type="submit">Next Step</button>
      </form>
    </>
  )
}
