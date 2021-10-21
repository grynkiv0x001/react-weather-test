import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import { TempSlider } from './components/TempSlider/TempSlider';
import './App.css';

const apiURL = 'https://api.openweathermap.org/data/2.5/weather?';
const apiKey = '9524d1d64b3ad80cd5ec9cdf308f7cc7';

function App() {
  const [coords, setCoords] = useState({ latt: '', long: '' });
  const [status, setStatus] = useState('');
  const [condition, setCondition] = useState('');
  const [temp, setTemp] = useState(0);

  const bgc = useRef(null);

  const getLocation = async () => {
    try {
      await navigator.geolocation?.getCurrentPosition((position) => {
        setCoords({
          latt: position?.coords?.latitude,
          long: position?.coords?.longitude,
        });
      });
    } catch (error) {
      console.log(error);
      await getLocation();
    }
  };

  const fetchData = async () => {
    const request = `${apiURL}lat=${coords.latt}&lon=${coords.long}&appid=${apiKey}&units=metric`;

    axios.get(request).then((res) => {
      setTemp(res.data.main.temp);
      setStatus(res.data.weather[0].description);
      setCondition(res.data.weather[0].icon)
    });
  };

  useEffect(() => {
    getLocation();
  }, []);

  useEffect(() => {
    if(!!Object.values(coords).filter(Boolean).length) {
      fetchData();
    }
  }, [coords]);

  useEffect(() => {
    bgc.current.style.backgroundPosition = `${temp / 0.4}% 0%`;
  }, [temp]);

  return (
    <>
      <div ref={bgc} className="temprature-background">
        <div className="weather">
          <div className="weather__container">
            <img className="weather_img" src={`http://openweathermap.org/img/wn/${condition}@2x.png`} />
            <p className="weather__desc">{Number.parseInt(temp - 10)} °C, {status}</p>
          </div>
        </div>
      </div>
      <TempSlider temp={temp} handleChange={(event) => setTemp(event.target.value)} />
    </>
  );
}

export default App;
