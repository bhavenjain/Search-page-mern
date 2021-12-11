import React from 'react'
import '../public/css/Toggle.css'

function Toggle ({ isOn, handleToggle, id }) {
  return (
    <div className='toggle'>
      <input
        className='toggle__checkbox'
        checked={isOn}
        onChange={handleToggle}
        id={id}
        type='checkbox'
      />
      <label
        style={{ background: isOn && '#06D6A0' }}
        className='toggle__label'
        htmlFor={id}
      >
        <span className={`toggle__button`} />
      </label>
    </div>
  )
}

export default Toggle
