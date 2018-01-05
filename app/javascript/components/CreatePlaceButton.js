import React from 'react'
import { Button, Icon } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { openBlankPlace } from '../ducks/places'

const PlacesList = ({ createPlace }) => <Button
  positive
  onClick={createPlace}
  size="huge"
  fluid
  >
    <Icon name='plus' />Create Place
</Button>;

const mapStateToProps = (state, ownProps) => {
  return { }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    createPlace: () => dispatch(openBlankPlace()),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesList);
