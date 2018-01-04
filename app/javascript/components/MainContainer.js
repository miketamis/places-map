import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlaces } from '../ducks/places';
import PlacesList from './PlacesList'

class MainContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPlaces())
  }

  render() {
    return <div>
      <PlacesList />
    </div>
  }
}

export default connect()(MainContainer);
