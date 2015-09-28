import { combineReducers } from 'redux'
import {
  ADD_EVENT, REMOVE_EVENT, UPDATE_EVENT, SET_VISIBILITY_FILTER,
  HIDE_COMPONENT, SHOW_COMPONENT, UPDATE_FORM,
  VisibilityFilters
} from './actions'
const { SHOW_ALL } = VisibilityFilters

function visibilityFilter (state = SHOW_ALL, action) {
  switch (action.type) {
    case SET_VISIBILITY_FILTER:
      return action.filter
    default:
      return state
  }
}

let initialEventUI = {
  show: {
    addEvent: false
  }
}

function eventUI (state = initialEventUI, action) {
  var obj = {}
  switch (action.type) {
    case HIDE_COMPONENT:
      obj[action.name] = false
      return {...state, ...{ show: obj } }
    case SHOW_COMPONENT:
      obj[action.name] = true
      return {...state, ...{ show: obj } }
    default:
      return state
  }
}

function events (state = [], action) {
  switch (action.type) {
    case ADD_EVENT:
      return [...state, {
        date: action.event.date,
        text: action.event.text
      }]
    case UPDATE_EVENT:
      return [
        ...state.slice(0, action.index),
        Object.assign({}, state[action.index], action.event),
        ...state.slice(action.index + 1)
      ]
    case REMOVE_EVENT:
      return [
        ...state.slice(0, action.index),
        ...state.slice(action.index + 1)
      ]
    default:
      return state
  }
}

const initialForm = {
  name: {},
  location: {},
  date: {},
  time: {},
  description: {}
}

function form (state = initialForm, action) {
  switch(action.type) {
    case UPDATE_FORM:
      var field = {}
      field[action.field.fieldName] = {
        value: action.field.value,
        format: action.field.format,
        valid: action.field.valid
      }
      var returnObject = {...state, ...field}
      return returnObject
    default:
      return state
  }
}

const totemApp = combineReducers({
  visibilityFilter,
  events,
  eventUI,
  form
})

export default totemApp
