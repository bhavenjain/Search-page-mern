import React, { useState } from 'react'
import '../public/css/Results.css'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'

function ReadMore ({ children, maxCharacterCount = 250 }) {
  const text = children
  const [truncated, setTruncated] = useState(true)
  const resultStr = truncated ? text.substring(0, 250) : text

  function toggleTruncated () {
    setTruncated(!truncated)
  }

  return (
    <h3 className='results__description'>
      {resultStr}
      <ExpandMoreIcon onClick={toggleTruncated} />
    </h3>
  )
}

function Results ({ title, unit, frequency, description, source }) {
  return (
    <div className='results__container'>
      <div className='results__results'>
        <h1 className='results__heading'>{title}</h1>
        <h2 className='results__subHeading'>
          {unit}, {frequency}, {source}
        </h2>

        <ReadMore>{description}</ReadMore>
      </div>
    </div>
  )
}

export default Results
