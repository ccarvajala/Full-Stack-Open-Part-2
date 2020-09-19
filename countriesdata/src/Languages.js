import React from "react";

const Languages = ({index, language}) =>{
    return(
        <li key= {index}>
            {language}
        </li>
    )
}

export default Languages;