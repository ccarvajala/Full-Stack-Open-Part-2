import React,{useState,useEffect} from "react";
import Languages from "./Languages";
import axios from "axios";
const api_key = process.env.REACT_APP_API_KEY;


const Country = ({country,capital,population,flag,languages}) =>{
    const params = {
        access_key: api_key,
        query: capital
      }

    const [weatherData,setWeatherData] = useState({})
    const [isWaiting,setIsWaiting] = useState(true)

    const hook = () =>{
        axios.get('http://api.weatherstack.com/current', {params})
        .then(response => {
            console.log(response)
            setWeatherData(response.data);
            setIsWaiting(false)
            console.log("weather object:", weatherData)
        })
      }
      useEffect(hook,[])

    return(
        <div>
            <h1>{country}</h1>
            <p>capital {capital}</p>
            <p>population {population}</p>
            <p><strong>languages</strong></p>
            <ul>
            {
                languages.map((language,index) =>
                <Languages key={index} language={language.name}/>)
            }
            </ul>
            <img src= {flag} alt="flag" width="200" height="100"/>
            {isWaiting ? <div>waiting...</div> :
            <div>
                <h1>Weather in {capital}</h1>
                <p><strong>temperature</strong> {weatherData.current.temperature}℃</p>
                <img src= {weatherData.current.weather_icons[0]} alt="Weather Icon"></img>
                <p><strong>wind</strong> {weatherData.current.wind_speed} mph direction {weatherData.current.wind_dir}</p>
            </div>
            }
        
        </div>
    )
}

export default Country;