import axios from 'axios'
import { useEffect, useState } from 'react';
import './App.css';
import City from './components/City'
import {TbTemperatureCelsius, TbSearch } from 'react-icons/tb'
import {GrFormClose} from 'react-icons/gr'


function App() {
  const [info, setInfo] = useState([]) //Api ile gelen bilgileri tutuyoruz
  const [city, setCity] = useState() //inputa yazilan sehir degerini burada tutyoruz
  const [cityName, setCityName] = useState('')
  const [country, setCountry] = useState('')
  const [icon, setIcon] = useState('')
  const [today, setToday]=useState('')
  const [todayInfo, setTodayInfo] = useState([])
  const [hour, setHour] = useState([])

  const key = '9c173a0caa6343799d1232521232703'



  useEffect( () => {

    const getApi = async () => {

      if(!city) return 

     const response = await axios.get(`https://api.weatherapi.com/v1/forecast.json?key=${key}&q=${city}&days=5&aqi=no&alerts=no`)
     setToday(response.data.forecast.forecastday[0].day.avgtemp_c      )
     setIcon(response.data.forecast.forecastday[0].day.condition.icon)
     setInfo(response.data.forecast.forecastday)
     setCityName(response.data.location.name)
     setCountry(response.data.location.country)
     setTodayInfo(response.data.forecast.forecastday[0].day.condition.text)
    setHour(response.data.forecast.forecastday[0].hour)
 }
     getApi()

    },[city])

 const onChangeFunc = ((e)=>{

      setCity(e.target.value)

 })

 const searchClose= (()=>{
  setCity(' ')
 })
console.log(info)
console.log(hour)
  return (

<div className="App" >
  
      <div className='header'>
        <div className='searchIcon'><TbSearch/></div>
        <input onChange={onChangeFunc} className='searchInput' placeholder='Search a city..' type="text" />
        <button onClick={searchClose} className='searchClose'><GrFormClose/></button>
      </div>


{
    cityName ?  (
    <>
    <h1 className='cityName'>{cityName},{country}</h1>
    <div className='today' >
      <img className='icon' src={icon}></img>
      <h1 className='todayTemp'>{today} <TbTemperatureCelsius/> </h1>
      <h6 className='todayInfo'>{todayInfo}</h6>
      </div></>
    ):(
      <h1 className='entry'>Please enter a city name for the five-day weather forecast:</h1>
    )
}
      


      {
          info.map((item)=> (
         
          <City
           key={item.date}
           date={item.date}
           maxtemp={item.day.maxtemp_c}
           mintemp={item.day.mintemp_c}
           icon={item.day.condition.icon}
           text={item.day.condition.text}
          />))
      }

</div>

  );
}

export default App;
