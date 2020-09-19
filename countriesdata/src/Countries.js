import React,{useState} from "react";
import Country from "./Country";

const Countries = ({country,index,capital,population,flag, languages}) =>{
    const [showCountry,setShowCountry] = useState(false)

    const showInfo = () =>{
        setShowCountry(true) 
    }

    if(showCountry)
        return(<Country country={country} capital = {capital} population = {population} flag = {flag} languages = {languages} /> )
    else{
        return(
            <li key= {index}>
                {country} <button onClick= {showInfo}>show</button>
            </li>
            
        )
    }
}

export default Countries;