import React, { useContext, useCallback, useState } from 'react'
import PropTypes from 'prop-types'

const RootContext = React.createContext(null)

/**
 * RootProvider
 *
 * @typedef {object} RootProvider
 * @property {any} [children]
 * @property {[*]} [props]
 *
 * @param {RootProvider}
 * @returns {React.FC}
 */
function RootProvider({ children = undefined, ...props }) {
  const [element, setElement] = useState(null)

  const handleRef = useCallback(element => {
    if (element !== null) {
      setElement(element)
    }
  }, [])

  console.log(element)

  return (
    <RootContext.Provider value={element}>
      <div ref={handleRef} {...props}>
        {children}
      </div>
    </RootContext.Provider>
  )
}

RootProvider.propTypes = {
  children: PropTypes.node,
}

function Root(props) {
  return <RootContext.Consumer {...props} />
}
/**
 * @type {React.FC}
 */
Root.Provider = RootProvider

const useRoot = () => useContext(RootContext)

export { Root, useRoot }
export default Root
