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
  const [selectedFriend, setSelectedFriend] = useState(null);

  function handleShowAddFriend() {
    setShowAddFriend((show) => !show);
  }

  function handleAddFriend(friend) {
    setFriends((friends) => [...friends, friend]);
  }

  function handleSelection(friend) {
    setSelectedFriend((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  return (
    <div className="app">
      <div className="sidebar">
        <h1>Friends List</h1>
        <FriendsList
          friends={friends}
          selectedFriend={selectedFriend}
          onSelection={handleSelection}
        ></FriendsList>
        {showAddFriend && <FriendAddForm onAddFriend={handleAddFriend} />}
        <Button onClick={handleShowAddFriend}> Add Friend </Button>
      </div>
      {selectedFriend && (
        <FormSplitBill selectedFriend={selectedFriend}></FormSplitBill>
      )}
    </div>
  );
}

function FriendsList({ friends, onSelection, selectedFriend }) {
  return (
    <ul>
      {friends.map((friend) => (
        <Friend
          friend={friend}
          key={friend.id}
          selectedFriend={selectedFriend}
          onSelection={onSelection}
        ></Friend>
      ))}
    </ul>
  );
}

function Friend({ friend, onSelection, selectedFriend }) {
  const isSelected = selectedFriend?.id === friend.id;

  return (
    <>
      <li className={isSelected ? "selected" : ""}>
        <img src={friend.image} alt={friend.name} />
        <h3>{friend.name}</h3>
        {friend.balance < 0 ? (
          <p className="red">
            You owe {friend.name} Rs {Math.abs(friend.balance)}/-
          </p>
        ) : friend.balance > 0 ? (
          <p className="green">
            {friend.name} owes you Rs {Math.abs(friend.balance)}/-
          </p>
        ) : (
          <p>You and {friend.name} are even</p>
        )}
        <Button onClick={() => onSelection(friend)}>
          {isSelected ? "close" : "select"}
        </Button>
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

function FormSplitBill({ selectedFriend }) {
  const [bill, setBill] = useState("");
  const [paidByUser, setPaidByUser] = useState("");
  const paidByFriend = bill ? bill - paidByUser : "";
  const [whoIsPaying, setWhoIsPaying] = useState("");

  return (
    <form className="form-split-bill">
      <h2> Split the bill with {selectedFriend.name}</h2>

      <label>Bill Value</label>
      <input
        type="number"
        value={bill}
        onChange={(e) => setBill(Number(e.target.value))}
      />

      <label>Your expenses</label>
      <input
        type="number"
        value={paidByUser}
        onChange={(e) =>
          setPaidByUser(
            Number(e.target.value > bill ? paidByUser : Number(e.target.value))
          )
        }
      />

      <label>{selectedFriend.name} expense</label>
      <input type="number" value={Math.abs(paidByFriend)} disabled />

      <label>Who is paying bill? </label>
      <select
        value={whoIsPaying}
        onChange={(e) => setWhoIsPaying(e.target.value)}
      >
        <option value="user">You</option>
        <option value="friend">{selectedFriend.name}</option>
      </select>

      <Button>Split Bill</Button>
    </form>
  );
}
