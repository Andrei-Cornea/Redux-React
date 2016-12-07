import {store} from '../index';
import * as types from './actionTypes';
// import Fuse from "fuse";


export function receiveCarMarket( carData ) {
  return {
    type: types.RECEIVE_CAR_MARKET,
    carData
  }
}


export function proba( carData ) {
  console.log(carData);
}



export function filterAfterSearchField( searchText ) {
  let filteredData = [ ];
  const models = store.getState( ).car.data.models;
  const options = {
    threshold: 0.3,
    keys: ['name', 'make']
  }
  const fuse = new Fuse( models, options );

  if ( searchText.length != 0 ) {
    filteredData = fuse.search( searchText );
  } else {
    filteredData = models
  }

  return {
    type: types.FILTER_AFTER_SEARCH_FIELD,
    searchText,
    filteredData
  }
}

export function filterAfterBrandDropdown( brandDropdown ) {
  let filteredData = [ ]
  const models = store.getState( ).cars.data.models;

  if ( brandDropdown.length != 0 ) {
    filteredData = models.filter( ( value ) => { return value.make === brandDropdown } ) ;
  } else {
    filteredData = models
  }

  console.log('brandfilter', filteredData);

  return {
    type: 'brandDropdown',
    payload:filteredData
  }
}

export function filterAfterModelDropdown( filterDropdown ) {
  let filteredData = []
  const models = store.getState( ).carData.models;

  if ( filterDropdown.modelDropdown.length != 0 ) {
    filteredData = models.filter( ( value ) => { return value.name === filterDropdown.modelDropdown } ) ;
  } else {
    filteredData = models.filter( ( value ) => { return value.make === filterDropdown.brandDropdown } ) ;
  }
  // console.log("modelDropdown", filteredData);

  return {
    type: types.FILTER_AFTER_MODEL_DROPDOWN,
    filterDropdown,
    filteredData
  }
}

export function addRemoveCartItem( addRemoveItem ) {

  let carData = store.getState( ).cars;

  let cars = Object.assign( carData, addRemoveItem.isSelected = !addRemoveItem.isSelected );
  let cart = carData.data.models.filter( ( value ) => { return value.isSelected === true } )  ;

  store.dispatch({
    type:'toggle_isSelected_model',
    payload: cars
  });

     return {
                type: types.ADD_REMOVE_CART_ITEM,
                // carData,
                // filteredData,
                // cartData: state.cartData
                payload: cart
              };

}

export function completeTransaction( ) {
  let carData = { };

  carData.models = store.getState( ).carData.models;
  carData.name = store.getState( ).carData.name;

  carData.models = carData.models.map (function ( value ) {
    value.isSelected = false;
    return value;
  });

  return {
    type: types.COMPLETE_TRANSACTION,
    carData
  }
}
