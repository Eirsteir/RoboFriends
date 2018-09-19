import * as actions from './actions';
import {
  CHANGE_SEARCHFIELD,
  REQUEST_ROBOTS_PENDING,
  REQUEST_ROBOTS_SUCCESS,
  REQUEST_ROBOTS_FAILED
 } from './constants'

import configureMockStore from 'redux-mock-store';
import thunkMiddleware from 'redux-thunk';

const mockStore = configureMockStore([thunkMiddleware])

function success() {
  const payload = {
    id: '1',
    username: 'test',
    email: 'test@gmail.com'
  }

  return {
    type: REQUEST_ROBOTS_SUCCESS,
    payload: payload
  }
}

function failure() {
  const error = 'Failed request'
  return {
    type: REQUEST_ROBOTS_FAILED,
    payload: error
  }
}

function fetchData(callSuccess) {
  if (callSuccess) {
    return dispatch => {
      return fetch('https://jsonplaceholder.typicode.com/users')
      .then(() => dispatch(success()))
    }
  } else {
    return dispatch => {
      return fetch('https://jsonplaceholder.typicode.com/users')
      .then(() => dispatch(failure()))
    }

  }

}


describe('Actions', () => {

  it('should create an action to search robots', ()  => {
    const text = 'woo';
    const expectedAction = {
      type: CHANGE_SEARCHFIELD,
      payload: text
    }
    expect(actions.setSearchField(text)).toEqual(expectedAction);
  })

  it('handles requesting robots API', () => {
    const store = mockStore();
    store.dispatch(actions.requestRobots());
    const action = store.getActions();
    const expectedAction = {
      type: REQUEST_ROBOTS_PENDING
    }
    expect(action[0]).toEqual(expectedAction);
  })

  it('handles REQUEST_ROBOTS_SUCCESS', () => {
    const store = mockStore({});
    const callSuccess = true

    return store.dispatch(fetchData(callSuccess))
      .then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual(success());
      })
  })

  it('handles REQUEST_ROBOTS_FAILED', () => {
    const store = mockStore({});
    const callSuccess = false

    return store.dispatch(fetchData(callSuccess))
      .then(() => {
        const action = store.getActions();
        expect(action[0]).toEqual(failure());
      })
  })

})
