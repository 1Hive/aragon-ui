import React from 'react'
import PropTypes from 'prop-types'
import { noop } from '../../utils'

function DotSwitch({ checked, onChange }) {
  return (
    <div
      css={`
        display: flex;
        flex-direction: column;
        justify-content: center;
      `}
    >
      <Dot isActive={!checked} onChange={onChange} />
      <Dot isActive={checked} onChange={onChange} />
    </div>
  )
}
function Dot({ isActive, onChange }) {
  return (
    <span
      onClick={
        !isActive ?
        (e => {
          e.preventDefault()
          onChange()
        }) : undefined
      }
      css={`
        height: 10px;
        width: 10px;
        margin: 5px;
        border: 1px solid #c8c8c9;
        background-color: ${isActive ? '#C8C8C9' : '#ffffff'};
        border-radius: 50%;
        display: inline-block;
        cursor: ${!isActive && 'pointer'};
      `}
    />
  )
}

DotSwitch.propTypes = {
  checked: PropTypes.bool,
  onChange: PropTypes.func,
}

DotSwitch.defaultProps = {
  checked: false,
  onChange: noop,
}

export default DotSwitch
