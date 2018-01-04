import React from 'react'
import ReactDOM from 'react-dom'
import PropTypes from 'prop-types'
import '../styles/main.css'

const Hello = props => (
  <div>Hello {props.name}!</div>
)

Hello.defaultProps = {
  name: 'David'
}

Hello.propTypes = {
  name: PropTypes.string
}

export default Hello;
