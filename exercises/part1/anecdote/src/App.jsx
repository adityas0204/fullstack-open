import { useState } from 'react'

const Title = ({title}) => <h1> {title} </h1>

const Button = ({onClick, text}) => <button onClick={onClick}> {text} </button>

const AnecdoteDisplay = ({anecdote}) => <div> {anecdote} </div>

const VotesDisplay = ({votes}) => <div> has {votes} votes </div>

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [votes, setVotes] = useState({})

  const handleVotes = () => {
    const copy = { ...votes }
    copy[selected] = (copy[selected] || 0) + 1 // if the selected value isnt in copy 
    setVotes(copy)
  }

  // Find index of anecdote with highest votes
  const topAnecdoteIndex = Object.keys(votes).reduce((maxIndex, key) =>
    votes[key] > (votes[maxIndex] || 0) ? Number(key) : maxIndex, 0
  )

  // returns a random int
  const getRandomInt = (min, max) => {
    const minCeiled = Math.ceil(min)
    const maxFloored = Math.floor(max)
    return Math.floor(Math.random() * (maxFloored - minCeiled + 1) + minCeiled) // The maximum is exclusive and the minimum is inclusive
  }

  const handleNextAnecdote = () => {
    let randomInt = getRandomInt(0, 7)
    while (randomInt === selected) {randomInt = getRandomInt(0, 7)}
    setSelected(randomInt)
  }

  return (
    <div>
      <Title title='Anecdote of the day'/> 
      <AnecdoteDisplay anecdote={anecdotes[selected]}/>
      <VotesDisplay votes={votes[selected] ?? 0}/>
      <Button onClick={handleVotes} text='vote'/>
      <Button onClick={handleNextAnecdote} text='next anecdote'/>
      <Title title='Anecdote with most votes'/>
      <AnecdoteDisplay anecdote={anecdotes[topAnecdoteIndex]}/>
      <VotesDisplay votes={votes[topAnecdoteIndex] ?? 0}/>
    </div>
  )
}

export default App