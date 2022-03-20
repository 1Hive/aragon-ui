import React from 'react'
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom'
import { Root } from '../../providers/Root'

const RootPortal = props => (
  <Root>
    {rootElement => {
      if (!rootElement) {
        return null
      }

      return ReactDOM.createPortal(props.children, rootElement)
    }}
  </Root>
)

RootPortal.propTypes = {
  children: PropTypes.node.isRequired,
}

export default RootPortal
