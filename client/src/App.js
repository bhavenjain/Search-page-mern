import React, { useState, useEffect } from 'react'
import Searchbar from './components/SearchBar'
import Results from './components/Results'
import axios from 'axios'

import './public/css/App.css'

function App () {
  const [fields, setFields] = useState([])
  const [searches, setSearches] = useState('')

  const getData = async () => {
    axios
      .get('http://localhost:5000/')
      .then(response => {
        const see = response.data
        setFields(see)
        // console.log(see)
      })
      .catch(error => alert('Not Recived'))
  }

  useEffect(() => {
    getData()
  }, [])

  return (
    <div className='app'>
      <div className='app__search'>
        <h1 className='app__heading'>Search</h1>
        <Searchbar
          onChange={event => {
            setSearches(event.target.value)
          }}
        />
      </div>
      <div className='app__resultsContainer'>
        {fields
          .filter(val => {
            if (searches === '') {
              return val
            } else if (
              val.title.toLowerCase().includes(searches.toLowerCase())
            ) {
              console.log(val)
              return val
            }
          })
          .map((data, key) => {
            return (
              <Results
                className='app__results'
                title={data.title}
                unit={data.unit}
                frequency={data.frequency}
                description={data.description}
                source={data.source}
              />
            )
          })}
      </div>
    </div>
  )
}

export default App
