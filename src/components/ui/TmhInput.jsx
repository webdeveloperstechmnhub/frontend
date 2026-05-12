import React from 'react'
import InputField from './InputField'

const TmhInput = ({ label, id, className = '', value, rightElement = null, ...props }) => {
  return (
    <InputField
      id={id}
      label={label}
      value={value}
      rightElement={rightElement}
      className={className}
      {...props}
    />
  )
}

export default TmhInput
