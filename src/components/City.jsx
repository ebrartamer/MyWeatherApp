import React from 'react'
import './city.css'

function City({date, maxtemp, mintemp, icon, text}) {
  return (
(date &&  
   
    <div className='day'>
         <h3>Date: </h3> <h5>{date}</h5>
         <p>Max temp: {maxtemp}C / Min temp: {mintemp} C</p> 
         <img src={icon}></img>
         <h5>{text}</h5>
    
    </div>

)
  )
}

export default City