import React from 'react'
import { List } from 'semantic-ui-react'
import { connect } from 'react-redux'

const PlacesList = ({ places }) => (
  <List>
    { places.map((place) => <List.Item key={place.id}>
        <List.Icon name='marker' />
        <List.Content>
          <List.Header as='a'>{place.name}</List.Header>
          <List.Description>{place.description}</List.Description>
        </List.Content>
      </List.Item>) }
  </List>
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
