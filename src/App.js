import './App.css';
import * as dotenv from 'dotenv';
import React, { useEffect, useState, useRef } from "react";
import GridLayout from './components/GridLayout';
import mockcalendar from '../src/sample/calendar.json'
import mockweather from '../src/sample/weather.json'
// set up dotenv 
dotenv.config()


function App() {
  const [weatherData, setWeatherData] = useState([]);
  const [calendarData, setCalendarData] = useState([]);
  const ws = useRef(null);


  const fetchData = async () => {
    await fetch(`${process.env.REACT_APP_API_URL}/forecast?lat=${process.env.REACT_APP_LAT}&lon=${process.env.REACT_APP_LONG}&units=${process.env.REACT_APP_UNIT}&appid=${process.env.REACT_APP_API_KEY}`)
      .then(res => res.json())
      .then(result => {
        setWeatherData(result)
      });
  }

  const fetchCalendarData = async () => {
    await fetch(`http://localhost:8000/getEvents`)
      .then(res => res.json())
      .then(result => {
        setCalendarData(result.data)
      });
  }

  // try {
  //   sock.onmessage = ({data}) => {
  //     this.message = data; 
  //     console.log(thismessage);
  //   }
  // } catch (err) {
  //   console.error(err)
  // }

  // const subscribeWeather = 

  
  useEffect(() => {
    ws.current = new WebSocket(process.env.REACT_APP_SOCKET_URI + process.env.REACT_APP_SOCKET_PORT);
    ws.current.onopen = () => console.log("ws opened");
    ws.current.onclose = () => console.log("ws closed"); 

    // fetchData();
    // fetchCalendarData();
    setCalendarData(mockcalendar.data);
    setWeatherData(mockweather);
  }, [])


  return (
    <div className="App"> 
      {((typeof weatherData.list != 'undefined') && (typeof calendarData != 'undefined') )? (
        <GridLayout weatherData={weatherData} calendarData={calendarData.slice(0,4)}/>
      ) : (
        <div>Data not loaded, please refresh</div>
      )}
    </div>
  );
}

export default App;
