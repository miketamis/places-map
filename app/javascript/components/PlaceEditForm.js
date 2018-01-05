import React from 'react'
import { connect } from 'react-redux'
import {  Input, TextArea, Form  } from 'semantic-ui-react'
import { cancelEdit, editPlaceFields, savePlace } from '../ducks/places'


const PlaceEditForm = ({ place, doCancelEdit, setEditingPlaceFields, saveEditingPlace }) => {
  if(!place) {
    throw Error('Not Edit a place');
  }



  return   <Form onSubmit={saveEditingPlace }>
      <Form.Field required control={Input} onChange={(evt) => setEditingPlaceFields({ name: evt.target.value }) } label='Name' value={ place.name }/>
      <Form.Field control={TextArea} onChange={(evt) => setEditingPlaceFields({ description: evt.target.value }) } autoHeight label='Description' value={ place.description }/>
      <Form.Field required control={Input} onChange={(evt) => setEditingPlaceFields({ lat: evt.target.value }) }  label='Latitude (Click on map to change)' value={ place.lat }/>
      <Form.Field required control={Input} onChange={(evt) => setEditingPlaceFields({ lng: evt.target.value }) } label='Longitude  (Click on map to change)' value={ place.lng }/>
      <Form.Group >
        <Form.Button primary>Save</Form.Button>
        <Form.Button onClick={doCancelEdit}>Cancel</Form.Button>
      </Form.Group>
    </Form>
};

const mapStateToProps = (state, ownProps) => {
  return {
    place: state.editingPlace,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    doCancelEdit: () => dispatch(cancelEdit()),
    setEditingPlaceFields: (payload) => dispatch(editPlaceFields(payload)),
    saveEditingPlace: () => dispatch(savePlace()),
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlaceEditForm);
