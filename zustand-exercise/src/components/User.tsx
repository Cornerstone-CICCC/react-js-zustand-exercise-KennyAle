import { useState, type ChangeEvent, type FormEvent } from "react";
import { useUserStore } from "../stores/user.store";

const User = () => {
  const { users, addUser, deleteUser } = useUserStore();
  const [nameInput, setNameInput] = useState<string>("");
  const [lastNameInput, setLastNameInput] = useState<string>("");
  const [hobbies, setHobbies] = useState<string[]>([]);
  const [age, setAge] = useState<number>(0);

  const handleCheckboxChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { value, checked } = e.target;
    setHobbies((prevState) => (checked ? [...prevState, value] : prevState));
    console.log(hobbies);
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!nameInput || !lastNameInput || !age) return;
    addUser({
      firstname: nameInput,
      lastname: lastNameInput,
      age: age,
      hobbies: hobbies,
    });
    setNameInput("");
    setLastNameInput("");
    setAge(0);
    setHobbies([]);
  };

  return (
    <div>
      <h1>Users</h1>
      <ul style={{ listStyleType: "none", textAlign: "start" }}>
        {users.map((user) => (
          <li
            style={{ display: "flex", justifyContent: "space-between" }}
            key={user.id}
          >
            <h2>
              Name: {user.firstname} {user.lastname} - Age: {user.age} -
              Hobbies: {user.hobbies}
            </h2>
            <button onClick={() => deleteUser(user.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <form onSubmit={handleSubmit}>
        <input
          value={nameInput}
          onChange={(e) => setNameInput(e.target.value)}
          type="text"
          placeholder="Firstname"
        />
        <input
          value={lastNameInput}
          onChange={(e) => setLastNameInput(e.target.value)}
          type="text"
          placeholder="Lastname"
        />
        <input
          value={age}
          onChange={(e) => setAge(Number(e.target.value))}
          type="number"
          placeholder="Age"
        />
        <label>
          Play Soccer
          <input
            type="checkbox"
            name="soccer"
            value="Play Soccer"
            checked={hobbies.includes("Play Soccer")}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Cooking
          <input
            type="checkbox"
            name="cooking"
            value="Cooking"
            checked={hobbies.includes("Cooking")}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Videogames
          <input
            type="checkbox"
            name="videogames"
            value="Videogames"
            checked={hobbies.includes("Videogames")}
            onChange={handleCheckboxChange}
          />
        </label>
        <button type="submit">Add User</button>
      </form>
    </div>
  );
};

export default User;
