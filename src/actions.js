/*
 * action types
 */

export const ADD_EVENT = 'ADD_EVENT'
export const REMOVE_EVENT = 'REMOVE_EVENT'
export const UPDATE_EVENT = 'UPDATE_EVENT'
export const SET_VISIBILITY_FILTER = 'SET_VISIBILITY_FILTER'
export const HIDE_COMPONENT = 'HIDE_COMPONENT'
export const SHOW_COMPONENT = 'SHOW_COMPONENT'
export const UPDATE_FORM = 'UPDATE_FORM'

/*
 * other constants
 */

export const VisibilityFilters = {
  SHOW_ALL: 'SHOW_ALL',
  SHOW_MONTH: 'SHOW_MONTH'
}

/*
 * action creators
 */

export function updateForm (field) {
  return { type: UPDATE_FORM, field }
}

export function hideComponent (name) {
  return { type: HIDE_COMPONENT, name }
}

export function showComponent (name) {
  return { type: SHOW_COMPONENT, name }
}

export function addEvent (event) {
  return { type: ADD_EVENT, event }
}

export function removeEvent (index) {
  return { type: REMOVE_EVENT, index }
}

export function udpateEvent (index) {
  return { type: UPDATE_EVENT, index }
}

export function setVisibilityFilter (filter) {
  return { type: SET_VISIBILITY_FILTER, filter }
}
