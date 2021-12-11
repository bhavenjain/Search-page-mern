import React, { useState, useEffect } from 'react'
import Searchbar from './components/SearchBar'
import Results from './components/Results'
import Toggle from './components/Toggle'
import axios from 'axios'
import Collapsible from 'react-collapsible'

import './public/css/App.css'

function App () {
  const [fields, setFields] = useState([]) // Data
  const [searches, setSearches] = useState('') // For Searches
  const [unitNum, setUnitNum] = useState(false) // Unit Number Criteria
  const [unitIndex, setUnitIndex] = useState(false) // Unit Index Criteria
  const [freqMonth, setFreqMonth] = useState(false) // Frequency Monthly Criteria
  const [freqYear, setFreqYear] = useState(false) // Frequency Yearly Criteria
  const [CSO, setCSO] = useState(false) // Source CSO Criteria
  const [DSO, setDSO] = useState(false) // Source DSO Criteria

  // To render the final results elements
  function renderResult (data) {
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
  }

  // Fetch the data
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
    document.title = 'Search Page'
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

      <div className='app__search'>
        <div className='app__leftContainer'>
          <h1 className='app__leftHeading'>Refine your search</h1>
          <p style={{ marginTop: '20px', color: 'gray' }}>
            Click on the headings
          </p>
          {/* Collapisble for Unit criteria */}
          <Collapsible trigger='Units'>
            <div className='app__element'>
              <p>Number</p>
              <Toggle
                isOn={unitNum}
                handleToggle={() => setUnitNum(!unitNum)}
                id='number'
              />
            </div>

            <div className='app__element'>
              <p>Index</p>
              <Toggle
                isOn={unitIndex}
                handleToggle={() => setUnitIndex(!unitIndex)}
                id='index'
              />
            </div>
          </Collapsible>
          {/* Collapsible for frequency criteria */}
          <Collapsible trigger='Frequency'>
            <div className='app__element'>
              <p>Monthly</p>
              <Toggle
                isOn={freqMonth}
                handleToggle={() => setFreqMonth(!freqMonth)}
                id='monthly'
              />
            </div>

            <div className='app__element'>
              <p>Yearly</p>
              <Toggle
                isOn={freqYear}
                handleToggle={() => setFreqYear(!freqYear)}
                id='yearly'
              />
            </div>
          </Collapsible>
          {/* Collapsible for source criteria */}
          <Collapsible trigger='Source'>
            <div className='app__element'>
              <p>CSO</p>
              <Toggle isOn={CSO} handleToggle={() => setCSO(!CSO)} id='CSO' />
            </div>

            <div className='app__element'>
              <p>DSO</p>
              <Toggle isOn={DSO} handleToggle={() => setDSO(!DSO)} id='DSO' />
            </div>
          </Collapsible>
        </div>
        <div className='app__resultsContainer'>
          {fields
            .filter(val => {
              if (searches === '') {
                return val
              } else if (
                val.title.toLowerCase().includes(searches.toLowerCase())
              ) {
                return val
              }
            })
            .map((data, key) => {
              if (
                unitNum &&
                data.unit.toLowerCase().includes('number') &&
                ((freqMonth &&
                  data.frequency.toLowerCase().includes('monthly')) ||
                  (freqYear && data.frequency.toLowerCase().includes('yearly')))
              ) {
                return renderResult(data)
              } else if (
                unitNum &&
                data.unit.toLowerCase().includes('number') &&
                ((CSO && data.source.toLowerCase().includes('cso')) ||
                  (DSO && data.source.toLowerCase().includes('dso')))
              ) {
                return renderResult(data)
              } else if (
                (unitNum && data.unit.toLowerCase().includes('number')) ||
                (unitIndex && data.unit.toLowerCase().includes('index'))
              ) {
                return renderResult(data)
              } else if (
                (freqMonth &&
                  data.frequency.toLowerCase().includes('monthly')) ||
                (freqYear && data.frequency.toLowerCase().includes('yearly'))
              ) {
                return renderResult(data)
              } else if (
                (CSO && data.source.toLowerCase().includes('cso')) ||
                (DSO && data.source.toLowerCase().includes('dso'))
              ) {
                return renderResult(data)
              } else if (
                !unitNum &&
                !unitIndex &&
                !freqMonth &&
                !freqYear &&
                !CSO &&
                !DSO
              ) {
                return renderResult(data)
              }
            })}
        </div>
      </div>
    </div>
  )
}

export default App
