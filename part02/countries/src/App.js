import { useEffect, useState } from "react";
import axios from "axios";

const FilterName = ({ setFilterName }) => {
  return (
    <div>
      find countries:
      <input
        onChange={(event) => {
          setFilterName(event.target.value);
        }}
      />
    </div>
  );
};

const Weather = ({ latlng }) => {
  const [weather, setWeather] = useState({});
  useEffect(() => {
    const api_key = process.env.REACT_APP_API_KEY;
    const weatherUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${latlng[0]}&lon=${latlng[1]}&APPID=${api_key}&units=metric`;
    axios.get(weatherUrl).then((response) => {
      setWeather({
        temp: response.data.main.temp,
        speed: response.data.wind.speed,
        icon: response.data.weather[0].icon,
        description: response.data.weather[0].description,
      });
    });
  }, [latlng]);

  const iconUrl = `http://openweathermap.org/img/wn/${weather.icon}@2x.png`;

  return (
    <>
      <div>temperature {weather.temp} Celcius </div>
      <img src={iconUrl} alt={weather.description} />
      <div>wind {weather.speed} m/s</div>
    </>
  );
};

const Country = ({ country }) => {
  if (country & !Object.hasOwn(country, "name")) return null;
  return (
    <>
      <h2>{country.name.common}</h2>
      <div>capital {country.capital[0]}</div>
      <div>area {country.area}</div>

      <h3>languages:</h3>
      {Object.entries(country.languages).map(([key, value]) => (
        <li key={key}>{value}</li>
      ))}

      <img src={country.flags.png} alt="flag" />
      <h2>Weather in {country.capital[0]}</h2>
      <Weather latlng={country.capitalInfo.latlng} />
    </>
  );
};

const Counties = ({ filterName }) => {
  const [allCountries, setAllCountries] = useState([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    axios.get("https://restcountries.com/v3.1/all").then((response) => {
      setAllCountries(response.data);
    });
  }, []);

  const showCountries = allCountries.filter((country) =>
    country.name.common.toUpperCase().includes(filterName.toUpperCase())
  );

  if (showCountries.length === 1) {
    return <Country country={showCountries[0]} />;
  }

  if (showCountries.length > 10) {
    return <div>Too many matches, specify another filter</div>;
  }

  if (showCountries.length > 1 && showCountries.length <= 10) {
    return (
      <>
        {showCountries.map((country, index) => (
          <div key={country.name.common}>
            {country.name.common}{" "}
            <button onClick={() => setIndex(index)}>show</button>
          </div>
        ))}
        <Country country={showCountries[index]} />
      </>
    );
  }
};

const App = () => {
  const [filterName, setFilterName] = useState("");
  return (
    <>
      <FilterName setFilterName={setFilterName} />
      <Counties filterName={filterName} />
    </>
  );
};

export default App;
