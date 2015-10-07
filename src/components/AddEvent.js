import React, { Component, PropTypes } from 'react'
import Input from './Input'

export default class AddEvent extends Component {

  render () {
    const { show, onChange } = this.props
    const { name, date, time, location, description } = this.props.formData
    if (show) {
      return (
        <div className='add-event'>
          <Input className='name-input'
            type='text'
            fieldName='title'
            value={name.value}
            onChange={onChange}/>
          <Input className='location-input'
            type='location'
            fieldName='location'
            name={location.name}
            latlong={location.latlong}
            onChange={onChange}/>
          <Input className='date-input'
            type='date'
            fieldName='date'
            value={date.value}
            onChange={onChange}
            format={date.format}
            valid={date.valid}/>
          <Input className='time-input'
            type='time'
            fieldName='time'
            value={time.value}
            onChange={onChange}
            format={time.format}
            valid={time.valid}/>
          <Input className='description-input'
            type='text'
            fieldName='description'
            value={description.value}
            onChange={onChange}/>
          <button type='submit' onClick={e => { this.handleClick(e) }}>
            Add
          </button>
        </div>
      )
    } else {
      return (
        <span />
      )
    }
  }
}

AddEvent.propTypes = {
  onChange: PropTypes.func.isRequired,
  onAddClick: PropTypes.func.isRequired,
  show: PropTypes.bool.isRequired,
  formData: PropTypes.object.isRequired
}
