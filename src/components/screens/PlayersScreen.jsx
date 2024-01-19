import '../../PlayersScreen.css';

export default function PlayersScreen(props) {
  const {
    currentScreen,
    nextScreen
  } = props;

  const createPlayers = (e) => {
    e.preventDefault();
    const users = buildData();
    const formattedUsers = { users };
    const url = "http://localhost:3000/users/";
    console.log(formattedUsers);
    submitPlayers(formattedUsers, url);
  }

  const buildData = () => {
    // Needed: {"users": [{"user": {"nickname": "peq"}}, {"user": {"nickname": "sam"}}]}
    const form = document.getElementById('playersForm');
    const data = new FormData(form);
    const users = []
    for(const user of data.values()) {
      users.push(user);
    }
    return users;
  }

  const submitPlayers = (users, url) => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(users)
    })
    .then((response) => response.json())
    .then((data) => console.log(data));
  }

  const addPlayer = () => {

  }

  return (
    <>
      <h1>Who's playing ?</h1>
      <form action="http://localhost:3000/users/" method="post" onSubmit={createPlayers} id="playersForm">
        <input type="text" name="user"/>
        <input type="text" name="user"/>
        <input type="text" name="user"/>
        <button onClick={addPlayer}>Add a player</button>
        <button type="submit">Next Step</button>
      </form>
    </>
  )
}
