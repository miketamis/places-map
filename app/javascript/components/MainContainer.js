import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlaces } from '../ducks/places';
import PlacesList from './PlacesList'
import PlacesMap from './PlacesMap'

class MainContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPlaces())
  }

  render() {
    return <div>
      <PlacesList />
      <PlacesMap />
    </div>
  }
}

export default connect()(MainContainer);
