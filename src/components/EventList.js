import React, { Component, PropTypes } from 'react'
import Event from './Event'

export default class EventList extends Component {
  render () {
    return (
      <ul className='event-list'>
        {this.props.events.map((event, index) =>
          <Event {...event}
                key={index}
                onClick={() => this.props.onEventClick(index)} />
        )}
      </ul>
    )
  }
}

EventList.propTypes = {
  onEventClick: PropTypes.func.isRequired,
  events: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    location: PropTypes.string.isRequired,
    date: PropTypes.string.isRequired,
    time: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired
  }).isRequired).isRequired
}
