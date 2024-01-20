import '../../PlayersScreen.css';

export default function PlayersScreen(props) {
  const {
    currentScreen,
    changeScreen,
    setUserNicknames,
  } = props;

  const createPlayers = (e) => {
    e.preventDefault();
    const users = buildData();
    const formattedUsers = { users };
    const url = "http://localhost:3000/users/";
    submitPlayers(formattedUsers, url);
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

  const submitPlayers = (users, url) => {
    fetch(url, {
      headers: {
        "Content-Type": "application/json",
      },
      method: "POST",
      body: JSON.stringify(users)
    })
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      setUserNicknames(data.map((user) => user.nickname));
      changeScreen(currentScreen + 1);
    });
  }

  const addPlayer = (e) => {
    e.preventDefault();
    // TODO: add new player fields on click (limit = (3..10))
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
