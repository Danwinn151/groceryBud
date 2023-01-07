import React, { useEffect } from 'react'

const Alert = ({msg, type, removeAlert, list}) => {
  useEffect(() => {
       const timeout = setTimeout(() => {
        removeAlert()
  },3000)
  //cleanupCode
  return () => clearTimeout(timeout)
  }, [list])
  return (
    <div className={`alert alert-${type}`}>
    {msg}
    </div>
  )
}

export default Alert