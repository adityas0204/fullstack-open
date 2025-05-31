
const Hello = (props) => {
  console.log(props)
  return (
    <div>
      <p>
        Hello {props.name}, you are {props.age} years old!
      </p>
    </div>
  )
}

const App = () => {
  const name = 'Amongus'
  const age = 19
  
  const friends = [
    { name: 'Peter', age: 4 },
    { name: 'Maya', age: 10 },
  ]

  return (
    <>
      <h1>Greetings</h1>
      <Hello name = {name} age = {age}/>
      <Hello name = 'Potion' age = {14 + 5}/>

      <p>{friends[0].name} {friends[0].age}</p>
      <p>{friends[1].name} {friends[1].age}</p>
    </>
  )
}

export default App

