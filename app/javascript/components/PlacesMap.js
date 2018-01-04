import React from 'react'
import ReactMapboxGl, { Layer, Feature, Marker } from 'react-mapbox-gl'
import { connect } from 'react-redux'
import {  Icon  } from 'semantic-ui-react'

const MapBoxAccessToken = 'pk.eyJ1IjoibWlrZXRhbWlzIiwiYSI6ImNqYzA5N20zdjA2eWYycW1wcjZldXFzbm8ifQ.Vbx9_kz5j0ZxIPghNDRtkQ';

const defaultCenter = [0, 0];

const Map = ReactMapboxGl({
  accessToken: MapBoxAccessToken,
});

const PlacesMap = ({ places }) => (
  <Map
    style="mapbox://styles/mapbox/outdoors-v9" // eslint-disable-line
    containerStyle={{ height: '100%', width: '100%' }}
    onStyleLoad={ (map) => { map.resize() } }
    center={ places.length ? [places[0].lng, places[0].lat] : defaultCenter }
    zoom={[5]}
  >
    {places.map(place =>
      <Marker anchor="bottom" offset={-10} coordinates={[place.lng, place.lat]}>
        <Icon name='marker'  style={{ fontSize: '3em' }}/>
      </Marker>
    )}
  </Map>
)

const mapStateToProps = (state, ownProps) => {
  return {
    places: state.places,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {}
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesMap);
