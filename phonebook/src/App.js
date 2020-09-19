import React, { useState, useEffect } from 'react';
import Person from "./Person";
import Filter from "./Filter";
import PersonForm from "./PersonForm";
import Communication from "./Communication";
import Notification from "./Notification";
import "./style.css";

const App = () => {
  const [persons, setPersons] = useState([]) 
  const [newName, setNewName] = useState("")
  const [newNumber, setNewNumber] = useState("")
  const [showAll, setShowAll] = useState(true)
  const [search, setSearch] = useState("")
  const [message,setMessage] = useState(null)

  const hook = () => {
    Communication.getAll().then(initialPersons => setPersons(initialPersons))
  }


  useEffect(hook,[])

  const addNewPerson = (event) =>
  {
    event.preventDefault()
    if(persons.filter(person => person.name === newName).length){
      if (window.confirm(`${newName} is already added to phonebook, replace the old number with a new one`)){
        const modifPerson = persons.find(person => person.name === newName)

        Communication.update(modifPerson.id,{...modifPerson, number:newNumber})
        .then(returnedPerson => setPersons(persons.map(p => p.id !== modifPerson.id ? p : returnedPerson)))
        .catch(error => {
          console.log(error)
          setPersons(persons.filter(p => p.id !== modifPerson.id))
          setMessage("error this user is not in the server")
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
    }
    else{
        const personObject = {
        name: newName,
        number: newNumber,
        id: persons.length + 1
      }
        Communication.create(personObject)
        .then(response => {
          setPersons(persons.concat(response))
          setNewName('')
          setNewNumber("")
          setMessage("success")
          setTimeout(() => {
            setMessage(null)
          }, 5000)
        })
      }
  }

  const removePerson = (id,person) =>{
    if(window.confirm(`Delete ${person}?`))
    Communication.remove(id)
    setPersons(persons.filter(p => p.id !== id))
  }

  const handleNameChange = (event) => {
    console.log(event.target.value)
    setNewName(event.target.value)
  }

  const handleNumberChange = (event) => {
    console.log(event.target.value)
    setNewNumber(event.target.value)
  }

  const handleNameFilter = (event) => {
    console.log(event.target.value)
    setSearch(event.target.value)
    setShowAll(false)
  }

  const namesToShow = showAll ? persons : persons.filter(person => person.name.toLowerCase().startsWith(search.toLowerCase()))

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification message={message}/>
      <Filter search = {search} handleNameFilter={handleNameFilter}/>
      <PersonForm addNewPerson={addNewPerson} newName={newName} handleNameChange={handleNameChange} newNumber={newNumber} handleNumberChange={handleNumberChange}/>
      <h2>Numbers</h2>
      <ul>
        {namesToShow.map((person,index) =>
        <Person key={index} person={person.name} number = {person.number} id= {person.id} removePerson={removePerson} />
        )}
      </ul>
    </div>
  )
}

export default App