import React, {useState, useEffect} from 'react';
import axios from "axios";
import Countries from "./Countries"
import Country from "./Country"

const App = () => {

  const [countries, setCountries] = useState([])
  const [search, setSearch] = useState("")

  let moreThanTen, oneCountry, singularCountry
  const hook = () =>{
    axios.get("https://restcountries.eu/rest/v2/all")
    .then(response => {
      console.log(response)
      setCountries(response.data)
    })
  }

  const handleNameFilter = (event) =>{
    console.log(event.target.value)
    setSearch(event.target.value)
  }

  useEffect(hook,[])

  const showingCountries = countries.filter(country => country.name.toLowerCase().startsWith(search.toLowerCase()))
  if(showingCountries.length>10)
    moreThanTen = true
  if(showingCountries.length===1)
    {
      oneCountry = true
      singularCountry = showingCountries[0]
    }

  return (
    <div>
      find countries <input value= {search} onChange= {handleNameFilter}/>
      {moreThanTen ? "too many matches, specify another filter" :
          oneCountry ? 
            <Country country={singularCountry.name} capital = {singularCountry.capital} population = {singularCountry.population} languages = {singularCountry.languages} flag = {singularCountry.flag}/>
          :
          <ul>
            {
              showingCountries.map((country,index) => <Countries key={index} country={country.name} capital = {country.capital} population= {country.population} languages = {country.languages} flag= {country.flag}/>)
            }
          </ul>
      }
    </div>
    
  )
}

export default App;
