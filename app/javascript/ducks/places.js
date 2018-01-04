const REQUEST_PLACES = 'places/REQUEST_PLACES';
const RECEIVE_PLACES = 'places/RECEIVE_PLACES';

function requestPlaces() {
  return {
    type: REQUEST_PLACES,
  }
}

function receivePlaces(places) {
  return {
    type: RECEIVE_PLACES,
    payload: places,
  }
}

export function getPlaces() {
  return (dispatch, getState) => {
    dispatch(requestPlaces());
    return fetch('/places')
      .then(response => response.json())
      .then(json => dispatch(receivePlaces(json)))
  }
}


export default function reducer(state = [], action = {}) {
  switch (action.type) {
    case RECEIVE_PLACES:
      return action.payload;
    default:
      return state;
  }
}
