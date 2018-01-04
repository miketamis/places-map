import React, { Component } from 'react'
import { connect } from 'react-redux'
import { getPlaces } from '../ducks/places';
import PlacesList from './PlacesList'
import PlacesMap from './PlacesMap'
import { Grid  } from 'semantic-ui-react'


class MainContainer extends Component {
  componentDidMount() {
    const { dispatch } = this.props;
    dispatch(getPlaces())
  }

  render() {
    return <div style={{ height: '100%', width: '100%'}}>
      <div className="sidebar"><PlacesList /></div>
      <PlacesMap />
    </div>

  }
}

export default connect()(MainContainer);
