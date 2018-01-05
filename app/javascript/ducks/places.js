const REQUEST_PLACES = 'places/REQUEST_PLACES';
const RECEIVE_PLACES = 'places/RECEIVE_PLACES';
const SELECT_PLACE = 'places/SELECT_PLACE';
const EDIT_PLACE = 'places/EDIT_PLACE';
const CANCEL_EDIT = 'places/CANCEL_EDIT';
const EDIT_PLACES_FIELD = 'places/EDIT_PLACES_FIELD';
const OPEN_BLANK_PLACE = 'places/OPEN_BLANK_PLACE';

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



export function selectPlace(placeId) {
  return {
    type: SELECT_PLACE,
    payload: placeId,
  }
}
export function openBlankPlace() {
  return {
    type: OPEN_BLANK_PLACE,
  }
}

export function editPlaceFields(payload) {
  return {
    type: EDIT_PLACES_FIELD,
    payload,
  }
}

export function cancelEdit() {
  return {
    type: CANCEL_EDIT,
  }
}

export function editPlace(placeId) {
  return {
    type: EDIT_PLACE,
    payload: placeId,
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

function encodeParams(params) {
  var esc = encodeURIComponent;
  return Object.keys(params)
    .map(k => esc(k) + '=' + esc(params[k]))
    .join('&');
}

function updateOrCreate(state) {
  const paramString = encodeParams({
    lng: state.editingPlace.lng,
    lat: state.editingPlace.lat,
    description: state.editingPlace.description,
    name: state.editingPlace.name,
  });

  if(state.editingPlace.id) {
    return fetch(`/places/${state.editingPlace.id}?${paramString}`, {
      method: 'put',
    }).then(() => {
      return state.editingPlace.id;
    });
  }

  return fetch(`/places?${paramString}`, {
    method: 'post',
  })
  .then(response => response.json())
  .then((json) => {
    return json.id;
  });
}

export function savePlace() {
  return (dispatch, getState) => {
    updateOrCreate(getState()).then((id) => {
      dispatch(cancelEdit())
      getPlaces()(dispatch, getState).then(() => {
        dispatch(selectPlace(id));
      });
    })

  }
}


function placesReducer(state = [], action = {}) {
  switch (action.type) {
    case RECEIVE_PLACES:
      return action.payload;
    case EDIT_PLACE:
    case SELECT_PLACE:
      return state.map((place) =>
        Object.assign({}, place, {
           selected: place.id === action.payload,
           editing: place.id === action.payload &&
            (place.editing || action.type === EDIT_PLACE),
        })
      );
    case CANCEL_EDIT:
      return state.map((place) =>
        Object.assign({}, place, {
           editing: false,
        })
      );
    default:
      return state;
  }
}


const floatRegex = /^-?[0-9]*\.?[0-9]*$/;

function cleanCordinateString(string, max) {
  const parsed = parseFloat(string);
  if(!parsed) {
    return string === '-' ? '-' : '';
  }
  if(parsed < -max) {
    return -max;
  }
  if(parsed > max) {
    return max;
  }
  if(parseFloat(parsed.toFixed(6)) !== parsed) {
    return parsed.toFixed(6);
  }

  if(floatRegex.test(string))  {
    return string;
  }
  return parsed
}

export default function reducer(state = { places: [] }, action = {}) {
  state = Object.assign({}, state, { places: placesReducer(state.places, action) });
  switch (action.type) {
    case EDIT_PLACE:
      return Object.assign(state, {
        editingPlace: state.places.find(place => place.id === action.payload),
      });
    case CANCEL_EDIT:
      return Object.assign(state, {
        editingPlace: null,
      });

    case OPEN_BLANK_PLACE:
      return  Object.assign(state, {
        editingPlace: {
          name: '',
          description: '',
          lat: 0,
          lng: 0,
        },
      });
    case EDIT_PLACES_FIELD:
      if(!state.editingPlace) {
        return state;
      }

      const editingPlace = Object.assign({}, state.editingPlace, action.payload);
      editingPlace.lat = cleanCordinateString(editingPlace.lat, 90);
      editingPlace.lng = cleanCordinateString(editingPlace.lng, 180);
      return Object.assign(state, {
        editingPlace,
      });
    default:
      return state;
  }
}
