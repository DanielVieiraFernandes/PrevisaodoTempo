import { useState } from "react";
import './weather.css'
import {CgSearch} from 'react-icons/cg'

export const ApiWeather = () => { 
    
  const [inputCity, setInputCity] = useState(String);
  const APIkey = 'c8f41559fe0c636fd829970996a27b10';

  const [climaData, setClimaData] = useState(null);

  const apiPrevisaoTempo = () => {

    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${APIkey}&lang=pt_br`; 

    if(inputCity === ''){
      alert('Digite o nome de uma cidade no campo')
      return
    }

    fetch(apiUrl)
      .then(res => res.json())
      .then(data => {
       if(data.cod == 404){
        alert('Erro ao buscar cidade, digite novamente')
        setInputCity('')
       }
       else{
        setClimaData(data)
       }
        
      })
      .catch(error => {
        alert("Erro ao buscar cidade, digite novamente", error);
      })
  }

  const getIcon = (iconId) => {
    return `http://openweathermap.org/img/wn/${iconId}.png`
  }

  return (
    <div className="container_weather"> 
      <div className="card_return">
        <div className="search_weather">
         <input
            type="text"
            className="input_weather"
            value={inputCity}
            placeholder="Digite o nome da cidade..."
            onChange={e => setInputCity(e.target.value)}
          />
       
            <CgSearch onClick={apiPrevisaoTempo} className="icon_weather"/>
          
        </div>   
          
        {climaData && (
          <>
            <h1 className="weather_city">{climaData.name}</h1>
            <h1 className="h1-weather">{parseInt(climaData.main.temp - 273.15 /*conversão de Kelvin para Celsius*/ )}ºC</h1>
            <div className="weather-description">
              <h1>{climaData.weather[0].description}</h1> 
              <img src={getIcon(climaData.weather[0].icon)} alt={climaData.weather[0].description} />
            </div>
          </>
        )}       
      </div>
    </div>
  )
}
