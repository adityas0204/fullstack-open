import { useState } from 'react'

const Title = ({text}) => <h1> {text} </h1>

const FeedbackButton = ({onClick, text}) => <button onClick={onClick}> {text} </button>

const StatisticLine = ({text, value}) => <tr> <td> {text} </td> <td> {value} </td> </tr>

const Statistics = ({good, neutral, bad, total, average, positive}) => {
  if (total === 0) {
    return <div> No feedback given </div>
  }
  return (
    <table>
      <StatisticLine text={'good'} value={good}/>
      <StatisticLine text={'neutral'} value={neutral}/>
      <StatisticLine text={'bad'} value={bad}/>
      <StatisticLine text={'all'} value={total}/>
      <StatisticLine text={'average'} value={average}/>
      <StatisticLine text={'positive'} value={positive + '%'}/>
    </table>
  )
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [weightedTotal, setWeightedTotal]= useState(0)

  // these can be derived from the state, hence they do not need to be state 
  // and can be variables computed when re-rendered
  const total = good + bad + neutral
  const average = total === 0 ? 0 : weightedTotal / total
  const positive = total === 0 ? 0 : (good / total) * 100

  const handleGood = () => {
    const updatedGood = good + 1
    setGood(updatedGood)
    setWeightedTotal(weightedTotal + 1)
  }

  const handleNeutral = () => {
    const updatedNeutral = neutral + 1 
    setNeutral(updatedNeutral)
  }

  const handleBad = () => {
    const updatedBad = bad + 1
    setBad(updatedBad)
    setWeightedTotal(weightedTotal - 1)
  }

  return (
    <div>
      <Title text="give feedback"/>
      <FeedbackButton onClick={handleGood} text={'good'}/> 
      <FeedbackButton onClick={handleNeutral} text={'neutral'}/>
      <FeedbackButton onClick={handleBad} text={'bad'}/>
      <Title text="statistics"/>  
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
    </div> 
  )
}

export default App