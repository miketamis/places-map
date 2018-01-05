import React from 'react'
import { List,  Header, Menu, Icon, Button  } from 'semantic-ui-react'
import { connect } from 'react-redux'
import { selectPlace, editPlace } from '../ducks/places'
import PlaceEditForm from './PlaceEditForm';

const EditButton = ({ onClick }) => <Button icon style={{float: 'right'}} onClick={onClick}>
   <Icon name='edit' />
 </Button>


const EditPane = ({ place }) => <Menu.Item active={place.selected}>
  <PlaceEditForm placeId={place.id} />
</Menu.Item>

const PlaceMenuItem = ({ place, placeSelected, setEditPlace }) => {
  return <Menu.Item active={place.selected} key={place.id} onClick={() => placeSelected(place.id)}>
      <span className="menu-heading" style={{color: place.selected ? '#FE4A49' : 'black' }}>
        <Icon name='marker' style={{float: 'left'}} />
        {  place.name }
        { place.selected && <EditButton place={place} onClick={() => setEditPlace(place.id)} /> }
      </span>
      <p>{place.description}</p>
  </Menu.Item>

}
const PlacesList = ({ places, placeSelected, setEditPlace }) => {
  const editingPlace = places.find(place => place.editing);
  if(editingPlace) {
    return <Menu vertical fluid><EditPane place={editingPlace}/></Menu>;
  }
  return <Menu vertical fluid>
    { places.map((place) => <PlaceMenuItem
        place={place}
        placeSelected={placeSelected}
        setEditPlace={setEditPlace}
      />) }
  </Menu>
};

const mapStateToProps = (state, ownProps) => {
  return {
    places: state.places,
  }
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return {
    placeSelected: (id) => dispatch(selectPlace(id)),
    setEditPlace: (id) => dispatch(editPlace(id))
  }
}


export default connect(
  mapStateToProps,
  mapDispatchToProps
)(PlacesList);
