import { useState } from 'react';
import '../../PlayersScreen.css';

export default function PlayersScreen(props) {
  const {
    currentScreen,
    changeScreen,
    setUserNicknames,
  } = props;

  const [numberOfInputs, setNumberOfInputs] = useState(3);

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
    setNumberOfInputs(numberOfInputs + 1);
  }

  const removePlayer = (e) => {
    e.preventDefault();
    setNumberOfInputs(numberOfInputs - 1);
  }

  return (
    <>
      <h1>Who's playing ?</h1>
      <form action="http://localhost:3000/users/" method="post" onSubmit={createPlayers} id="playersForm">
        <Inputs number={numberOfInputs} />
        {numberOfInputs !== 10 && <button onClick={addPlayer}>Add a player</button> }
        {numberOfInputs !== 3 && <button onClick={removePlayer}>Remove a player</button> }
        <button type="submit">Next Step</button>
      </form>
    </>
  )
}

export function Inputs({ number }) {
  const inputs = [];
  for(let i = 1; i <= number; i++) {
    inputs.push(<input type="text" name="user" key={i}/>);
  }
  return inputs;
}
