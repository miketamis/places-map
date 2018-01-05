import React from 'react'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl'
import { connect } from 'react-redux'
import {  Icon  } from 'semantic-ui-react'
import { selectPlace, editPlaceFields } from '../ducks/places'

const MapBoxAccessToken = 'pk.eyJ1IjoibWlrZXRhbWlzIiwiYSI6ImNqYzA5N20zdjA2eWYycW1wcjZldXFzbm8ifQ.Vbx9_kz5j0ZxIPghNDRtkQ';

const defaultCenter = [0, 0];

function placeToLatLngArray(place) {
  if(!place) {
    return null;
  }
  return [place.lng, place.lat]
}


const Map = ReactMapboxGl({
  accessToken: MapBoxAccessToken,
});

const PlacesMap = ({ places, placeSelected, setEditingPlaceFields,editing_place }) => {
  const selected_place = places.find(place => place.selected);


  let center = placeToLatLngArray(editing_place) || placeToLatLngArray(selected_place) || placeToLatLngArray(places[0]) || defaultCenter
  return <Map
    style="mapbox://styles/mapbox/outdoors-v9" // eslint-disable-line
    containerStyle={{ height: '100%', width: '100%' }}
    onStyleLoad={ (map) => { map.resize() } }
    center={ center }
    zoom={selected_place ? [10] : [5]}
    onClick={(_, payload) => {
      setEditingPlaceFields({ lat: payload.lngLat.lat, lng: payload.lngLat.lng });
    }}
  >
    { !editing_place ? places.map(place =>
      <Marker onClick={() => placeSelected(place.id)} anchor="bottom" offset={-10} coordinates={[place.lng, place.lat]}>
        <Icon name='marker'  style={{ fontSize: '3em', cursor: 'pointer', color: place.selected ? '#FE4A49' : 'black' }}/>
      </Marker>
    ) :
    <Marker anchor="bottom" offset={-10} coordinates={[editing_place.lng, editing_place.lat]}>
      <Icon name='marker'  style={{ fontSize: '3em', cursor: 'pointer', color: '#2185d0' }}/>
    </Marker> }
  </Map>
};

const mapStateToProps = (state, ownProps) => {
  return {
    places: state.places,
    editing_place: state.editingPlace && {
      ...state.editingPlace,
      lat: parseFloat(state.editingPlace.lat) || 0,
      lng: parseFloat(state.editingPlace.lng) || 0,
    }
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    placeSelected: (id) => dispatch(selectPlace(id)),
    setEditingPlaceFields: (payload) => dispatch(editPlaceFields(payload)),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesMap);
