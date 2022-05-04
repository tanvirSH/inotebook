import React from 'react'

const Alert = (props) => {
  const capitalise = (text) => {
    let newtext = (text === 'danger' ? 'error': text);
    newtext = newtext.toLowerCase();
    return newtext.charAt(0).toUpperCase() + newtext.slice(1);
  }  
  return (
    props.alert && <div className={`alert alert-${props.alert.type} alert-dismissible fade show`} role="alert">
        <strong>{capitalise(props.alert.type)}: </strong> {props.alert.msg}
    </div>
  )
}

export default Alert;