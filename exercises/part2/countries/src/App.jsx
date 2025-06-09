import { useState, useEffect } from 'react'
import axios from 'axios'
import CountryInfo from './components/CountriesInfo'

function App() {
  const [value, setValue] = useState('')
  const [info, setInfo] = useState(null)

  useEffect(() => {
    if (value) {
      axios
        .get('https://studies.cs.helsinki.fi/restcountries/api/all')
        .then(response => {
          setInfo(response.data.filter(country => country.name.common.toLowerCase().includes(value.toLowerCase().trim())))
        })
    } else {
      setInfo(null)
    }
  }, [value])

  const showInfo = (cca3) => {
    setInfo(info.filter(country => country.cca3 === cca3))
  }

  return (
    <div> 
      <form>
        find countries <input value={value} onChange={event => setValue(event.target.value)}/>
      </form>
      <CountryInfo data={info} showInfo={showInfo}/>
    </div>
  )
}

export default App
