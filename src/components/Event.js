import React, { Component, PropTypes } from 'react'

export default class Event extends Component {
  render () {
    return (
      <li
        className="event-item"
        onClick={this.props.onClick}
        style={{
          cursor: 'pointer'
        }}>
        <div className='event-date-time'>
          <span className='event-date'>{this.props.date}</span>
          <span className='event-time'>{this.props.time}</span>
        </div>
        <span className='event-name'>{this.props.name}</span>
        <span className='event-location'>{this.props.location}</span>
        <span className='event-description'>{this.props.description}</span>
      </li>
    )
  }
}

Event.propTypes = {
  onClick: PropTypes.func.isRequired,
  name: PropTypes.string.isRequired,
  location: PropTypes.string.isRequired,
  date: PropTypes.string.isRequired,
  time: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired
}
