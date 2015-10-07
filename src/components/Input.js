/* global google */
import React, { Component, PropTypes } from 'react'
import Moment from 'moment'
import GoogleMap from 'react-google-maps/lib/GoogleMap'
import SearchBox from 'react-google-maps/lib/SearchBox'
import Marker from 'react-google-maps/lib/Marker'

export default class Input extends Component {

  handleChange (e, inputType) {
    const { fieldName } = this.props
    let inputValue = e.target.value

    switch (inputType) {
      case 'text':
        break
      case 'date':
        this.props.valid = DATE_FORMATS.some((format) => {
          if (Moment(inputValue, format).isValid()) {
            this.props.format = format
            console.log('valid', Moment(inputValue, format).format(format))
            return true
          }
        })
        break
      case 'time':
        this.props.valid = TIME_FORMATS.some((format) => {
          if (Moment(inputValue, format).isValid()) {
            this.props.format = format
            console.log('valid', Moment(inputValue, format).format(format))
            return true
          }
        })
        break
    }
    var field = {
      fieldName: fieldName,
      value: inputValue,
      format: this.props.format,
      valid: this.props.valid
    }
    this.props.onChange(field)
  }

  handleBlur (e, type) {
    let inputValue = e.target.value
    const { valid, format, fieldName, onChange } = this.props

    switch (type) {
      case 'date':
      case 'time':
        if (valid) {
          inputValue = Moment(inputValue, format).format(format)
        }
        break
    }

    var field = {
      fieldName: fieldName,
      value: inputValue,
      format: format,
      valid: valid
    }
    onChange(field)
  }

  handlePlacesChanged () {
    'place changed'
    const { fieldName, onChange } = this.props

    var places = this.refs.searchBox.getPlaces()
    var name = places[0].name
    var latlong = places[0].geometry.location

    var field = {
      fieldName: fieldName,
      name: name,
      latlong: latlong
    }
    console.log(field)
    onChange(field)
  }

  handleBoundsChanged () {
    this.refs.map.getBounds()
    this.refs.map.getCenter()
    // TODO do something with these
  }

  render () {
    const { type, className, value } = this.props

    switch (type) {
      case 'text':
        return (
          <input
            type='text'
            value={value}
            onChange={e => this.handleChange(e, 'text')}
            className={className} />
        )
      case 'location':
      console.log('latlong is', this.props.latlong)
        return (
          <div className={className} >
            <GoogleMap
              containerProps={{
                style: {
                  height: '100%'
                }
              }}
              ref='map'
              defaultZoom={12}
              center={this.props.latlong || {lat: 30.253958, lng: -97.763168}}
              onClick={e => console.log('clicked', e)}>
              <SearchBox
                controlPosition={google.maps.ControlPosition.BOTTOM_CENTER}
                onPlacesChanged={() => this.handlePlacesChanged()}
                ref='searchBox'
                style={{
                  width: '20em',
                  backgroundColor: 'white',
                  border: 'none'
                }} />
              <Marker position={this.props.latlong} />
            </GoogleMap>
          </div>
        )
      case 'date':
        return (
          <input
            type='text'
            placeholder={Moment().format('L')}
            onChange={e => this.handleChange(e, 'date')}
            onBlur={e => this.handleBlur(e, 'date')}
            value={value}
            className = {className} />
        )
      case 'time':
        return (
          <input
            type='text'
            placeholder={Moment().format('LT')}
            onChange={e => this.handleChange(e, 'time')}
            onBlur={e => this.handleBlur(e, 'time')}
            value={value}
            className={className} />
        )
    }
  }
}

let DATE_FORMATS = [
  'MM/DD/YYYY'
]

let TIME_FORMATS = [
  'LT'
]

Input.propTypes = {
  onChange: PropTypes.func.isRequired,
  value: PropTypes.node,
  fieldName: PropTypes.string.isRequired,
  type: PropTypes.oneOf([
    'text',
    'location',
    'date',
    'time'
  ]).isRequired,
  valid: PropTypes.bool,
  format: PropTypes.string,
  className: PropTypes.string,
  center: PropTypes.node,
  bounds: PropTypes.node,
  latlong: PropTypes.node
}
