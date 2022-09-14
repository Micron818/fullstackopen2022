import { useState } from "react";

const App = () => {
  const anecdotes = [
    "If it hurts, do it more often",
    "Adding manpower to a late software project makes it later!",
    "The first 90 percent of the code accounts for the first 10 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.",
    "Any fool can write code that a computer can understand. Good programmers write code that humans can understand.",
    "Premature optimization is the root of all evil.",
    "Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.",
    "Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients",
  ];

  const [selected, setSelected] = useState(0);
  const [maxVoteVisible, setMaxVoteVisible] = useState(false);
  const [votes, setVotes] = useState(
    [1].concat(Array(anecdotes.length - 1).fill(0))
  );

  const handleNextAncedote = () => {
    const random = Math.floor(Math.random() * anecdotes.length);
    setSelected(random);
    const newVotes = [...votes];
    newVotes[random] += 1;
    setVotes(newVotes);
  };

  const handleVote = () => {
    setMaxVoteVisible(!maxVoteVisible);
  };

  const SelectedAnecdote = ({ visible, style, anecdote, vote }) => {
    return visible ? null : (
      <div style={style}>
        <div>{anecdote}</div>
        <div>has {vote} votes</div>
      </div>
    );
  };

  const getMostVoteAnecdote = () => votes.indexOf(Math.max(...votes));

  return (
    <div>
      <h1>Anecdote of day</h1>
      <SelectedAnecdote
        anecdote={anecdotes[selected]}
        vote={votes[selected]}
        style={{ height: "80px" }}
      />
      <button onClick={handleVote}>Vote</button>
      <button onClick={handleNextAncedote}>next anecdote</button>
      <h1>Anecdote with most votes</h1>
      <SelectedAnecdote
        anecdote={anecdotes[getMostVoteAnecdote()]}
        vote={votes[getMostVoteAnecdote()]}
        visible={maxVoteVisible}
      />
    </div>
  );
};

export default App;
