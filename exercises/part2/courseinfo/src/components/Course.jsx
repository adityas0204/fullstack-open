const Course = ({course}) => {
  return (
    <div>
      <Header course={course.name}/>
      <Content parts={course.parts}/>
      <Total total={course.parts.reduce((total, part) => total + part.exercises, 0)}/>
    </div>
  )
}

const Header = (props) => <h1>{props.course}</h1>

const Content = ({parts}) => {
  return (
    <div>
      {parts.map((part) => <Part key={part.id} name={part.name} exercises={part.exercises}/>)}
    </div>
  )
}

const Part = ({name, exercises}) => <p> {name} {exercises} </p>

const Total = ({total}) => <p><b> total of {total} exercises </b></p>

export default Course