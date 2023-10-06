import { useState } from "react";

// const initialFriends = [
//   {
//     name: "John",
//     id: 1,
//     image: "https://i.pravatar.cc/48?u=118836",
//     balance: 100,
//   },
//   {
//     name: "Jane",
//     id: 2,
//     image: "https://i.pravatar.cc/48?u=933372",
//     balance: -200,
//   },
//   {
//     name: "Ali",
//     id: 3,
//     image: "https://i.pravatar.cc/48?u=499476",
//     balance: 300,
//   },
// ];

export default function App() {
  const [showAddFriend, setShowAddFriend] = useState(true);

  const [friends, setFriends] = useState([]);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <h1>Friends List</h1>
        <FriendsList friends={friends}></FriendsList>
        {showAddFriend && <FriendAddForm onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}> Add Friend </Button>
      </div>
      <FormSplitBill></FormSplitBill>
    </div>
  );
}

function FriendsList({ friends }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend friend={friend} key={friend.id}></Friend>
      ))}
    </ul>
  );
}

function Friend({ friend }) {
  const myBalanace = 300;
  return (
    <>
      <li>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {friend.balance < 0 ? (
          <p className="red">
            You owe {friend.name} Rs {Math.abs(friend.balance)}/-
          </p>
        ) : friend.balance > 0 && friend.balance !== myBalanace ? (
          <p className="green">
            {friend.name} owes you Rs {Math.abs(friend.balance)}/-
          </p>
        ) : (
          <p>You and {friend.name} are even</p>
        )}
        <Button>select</Button>
      </li>
    </>
  );
}

function Button({ children, onClick }) {
  return (
    <button className="button" onClick={onClick}>
      {children}
    </button>
  );
}

function FriendAddForm({ onAddFriend }) {
  const [name, setName] = useState("");
  const [image, setImage] = useState("https://i.pravatar.cc/48?u");

  function handleOnSubmit(e) {
    e.preventDefault();

    if (!name) return alert("name or image is empty");

    const id = crypto.randomUUID();
    const newFriend = {
      id,
      name,
      image: `${image}?u=${id}`,
      balance: 0,
    };

    onAddFriend(newFriend);

    setName("");
    setImage("https://i.pravatar.cc/48");
  }
  return (
    <form className="form-add-friend" onSubmit={handleOnSubmit}>
      <label>Name</label>
      <input
        type="text"
        value={name}
        onChange={(e) => setName(e.target.value)}
      ></input>

      <label>Image url</label>
      <input
        type="text"
        value={image}
        onChange={(e) => setImage(e.target.value)}
      ></input>
      <Button>Add</Button>
    </form>
  );
}

function FormSplitBill() {
  return (
    <form className="form-split-bill">
      <h2> Split the bill with X</h2>

      <label>Bill Value</label>
      <input type="number" />

      <label>Your expenses</label>
      <input type="number" />

      <label>X experience</label>
      <input type="number" disabled />

      <label>Who is paying bill? </label>
      <select>
        <option value="user">You</option>
        <option value="friend">Friend</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
