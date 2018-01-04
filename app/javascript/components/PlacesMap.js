import React from 'react'
import ReactMapboxGl from 'react-mapbox-gl'
import { List } from 'semantic-ui-react'
import { connect } from 'react-redux'

const MapBoxAccessToken = 'pk.eyJ1IjoibWlrZXRhbWlzIiwiYSI6ImNqYzA5N20zdjA2eWYycW1wcjZldXFzbm8ifQ.Vbx9_kz5j0ZxIPghNDRtkQ';


const Map = ReactMapboxGl({
  accessToken: MapBoxAccessToken,
});

const PlacesMap = ({ places }) => (
  <Map
    style="mapbox://styles/mapbox/outdoors-v9" // eslint-disable-line
    containerStyle={{ height: '400px', width: '100vw' }}
  >
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
