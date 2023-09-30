import { useEffect, useState } from "react"

export const Api = () =>{ 
    
  const [inputCity,setInputCity] = useState('')
  const APIkey = 'c8f41559fe0c636fd829970996a27b10'

  const [climaData, setClimaData] = useState(null)

    const apiPrevisaoTempo = () => {

      const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${inputCity}&appid=${APIkey}&lang=pt_br`
      
        fetch(apiUrl)
          .then(res => res.json())
          .then(data => {
            if(data.cod == 404){
              alert("Cidade não encontrada, digite novamente")
            } else{
              setClimaData(data)
            }
          })
          .catch(error => {
            console.error("Erro ao buscar dados da API:", error);
            
          });

        }
        

        const getIcon = (iconId) =>{
            return `http://openweathermap.org/img/wn/${iconId}.png`;
        }

    return(
        <div>
            <input type="text"
            value={inputCity}
            onChange={e => setInputCity(e.target.value)}
            />
            <button onClick={apiPrevisaoTempo}>Clique</button>
            {
                climaData &&(
                    <div className="">
                        <h1>Cidade: {climaData.name}</h1>
                        <h1>Clima: {parseInt(climaData.main.temp - 273.15 /*conversão de Kelvin para Celsius*/ )}º</h1>
                        <img src={getIcon(climaData.weather[0].icon)}
                        alt={climaData.weather[0].description}/>
                        <h1>Descrição: {climaData.weather[0].description}</h1>
                </div>
                ) 
            }
        </div>
    )
}