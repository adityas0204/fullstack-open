const CountriesInfo = ({ data, showInfo }) => {
  if (!data) {
    return
  }
  if (data.length > 10) {
    return <div>Too many matches, specify another filter</div>
  }
  if (data.length <= 10 && data.length > 1) {
    return(
      <div> 
        {data.map(country => {
          return (
            <div key={country.cca3}> 
                {country.name.common}
                <button onClick={() => showInfo(country.cca3)}>Show</button>
            </div>
          )
        })}
      </div>
    )
  }
  if (data.length === 1) {
    return <CountryInfo country={data[0]}/>
  }
}

const CountryInfo = (country) => {
  return(
    <div>
      <h1>{country.name.common}</h1>
      <p>{country.capital}</p>
      <p>Area {country.area}</p>
      <h2>Languages</h2>
      <ul> 
        {Object.entries(country.languages).map(([code, language]) => {
          return <li key={code}>{language}</li>
        })}
      </ul>
      <img src={country.flags.png}/>
    </div>
  )
}

export default CountriesInfo