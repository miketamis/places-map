import React from 'react'
import { List,  Header, Menu, Icon  } from 'semantic-ui-react'
import { connect } from 'react-redux'

const PlacesList = ({ places }) => (
  <Menu vertical fluid>
    { places.map((place) => <Menu.Item key={place.id}>
        <Header  as='h4'><Icon name='marker' />{place.name}</Header>
        <p>{place.description}</p>
      </Menu.Item>) }
  </Menu>
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
)(PlacesList);
