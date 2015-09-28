import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import * as Actions from '../actions'
import AddEvent from '../components/AddEvent'
import EventList from '../components/EventList'
import EventFilter from '../components/EventFilter'
import '!style!css!less!../styles/styles.less'

class App extends Component {
  render () {
    // Injected by connect() call:
    const { dispatch, visibleEvents, visibilityFilter, eventUI, form } = this.props

    return (
      <div className='events-section'>
        <div className='events-header'>
          <h4>Events</h4>
          <button
            style={{ display: eventUI.show.addEvent ? 'none' : 'block' }}
            className='events-action-button'
            onClick={() =>
              dispatch(Actions.showComponent('addEvent'))
            }>+</button>
        </div>
        <AddEvent
          formData={form}
          show={eventUI.show.addEvent}
          onChange={field =>
            dispatch(Actions.updateForm(field))
          }
          onAddClick={event => {
            dispatch(Actions.addEvent(event))
            dispatch(Actions.hideComponent('AddEvent'))
          }} />
        <EventFilter
          filter={visibilityFilter}
          onFilterChange={nextFilter =>
            dispatch(Actions.setVisibilityFilter(nextFilter))
          } />
        <EventList
          events={visibleEvents}
          onEventClick={index =>
            dispatch(Actions.selectEvent(index))
          } />
      </div>
    )
  }
}

App.propTypes = {
  dispatch: PropTypes.func.isRequired,
  visibleEvents: PropTypes.arrayOf(PropTypes.shape({
    text: PropTypes.string.isRequired,
    date: PropTypes.instanceOf(Date).isRequired
  })),
  visibilityFilter: PropTypes.oneOf([
    'SHOW_ALL',
    'SHOW_MONTH'
  ]).isRequired,
  eventUI: PropTypes.object.isRequired,
  form: PropTypes.object.isRequired
}

function selectEvents (events, filter) {
  switch (filter) {
    case Actions.VisibilityFilters.SHOW_ALL:
      return events
    case Actions.VisibilityFilters.SHOW_MONTH:
      var today = new Date()
      return events.filter(event => event.date.getMonth() === today.getMonth())
  }
}

// Which props do we want to inject, given the global state?
// Note: use https://github.com/faassen/reselect for better performance.
function mapStateToProps (state) {
  return {
    visibleEvents: selectEvents(state.events, state.visibilityFilter),
    visibilityFilter: state.visibilityFilter,
    eventUI: state.eventUI,
    form: state.form
  }
}

// Wrap the component to inject dispatch and state into it
export default connect(mapStateToProps)(App)
