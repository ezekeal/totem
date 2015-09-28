import React, { Component, PropTypes } from 'react'

export default class EventFilter extends Component {

  render () {
    return (
      <div className='event-filter'>
        Display:
        <select onChange={e =>
          this.props.onFilterChange(e.target.value)}>
          <option value='SHOW_ALL'>All</option>
          <option value='SHOW_MONTH'>Month</option>
        </select>
      </div>
    )
  }
}

EventFilter.propTypes = {
  onFilterChange: PropTypes.func.isRequired,
  filter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_MONTH',
    'SHOW_TODAY'
  ]).isRequired
}
