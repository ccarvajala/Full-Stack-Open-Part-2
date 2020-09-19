import React from 'react';


const Header = ({ course }) => {
    return (
      <h1>{course.name}</h1>
    )
  }
  
  const Total = ({ course }) => {
    const total = course.parts.reduce((sum,{exercises}) => ((sum+exercises)),0);
    return(
      <p>
        Total of {total} exercises
      </p>
    ) 
  }
  
  const Part = (props) => {
    return (
      <li key={props.part.id}>
        {props.part.name} {props.part.exercises}
      </li>    
    )
  }
  
  const Content = ({ course }) => {
    return (
      <ul>
       {course.parts.map(part => <Part key = {part.id} part= {part}/>)}
      </ul>
    )
  }
  
  const Course = (props) =>{
    return(
      <li key= {props.id}>
        <Header course={props.course}/>
        <Content course={props.course}/>
        <Total course={props.course}/>
      </li>
    )
  }

export default Course;