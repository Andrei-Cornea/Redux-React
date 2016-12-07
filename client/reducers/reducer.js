import {createStore} from 'redux';
import * as types from '../actions/actionTypes';

const initialState = {
  carData: { },
  filters: {
    searchText: "",
    brandDropdown: "",
    modelDropdown: ""
  },
  filteredData: { },
  cartData: { }
}

const store = createStore( ( state = initialState, action ) => {
    switch( action.type ) {
        case types.RECEIVE_CAR_MARKET:
            return Object.assign(state, { carData: action.carData }, { filteredData: action.carData.models } );
            
        case types.FILTER_AFTER_SEARCH_FIELD:
            console.log("STATE", state);
            return Object.assign( state, { filters: { searchText: action.searchText, brandDropdown: "", modelDropdown: "" } }, { filteredData: action.filteredData } );

        case types.FILTER_AFTER_BRAND_DROPDOWN:
            console.log("STATE", state);
            return Object.assign( state, { filters: { searchText: "", brandDropdown: action.brandDropdown, modelDropdown: "" } }, { filteredData: action.filteredData } );

        case types.FILTER_AFTER_MODEL_DROPDOWN:
            console.log("STATE", state);
            return Object.assign( state, { filters: { searchText: "", brandDropdown: action.filterDropdown.brandDropdown, modelDropdown: action.filterDropdown.modelDropdown } }, { filteredData: action.filteredData } );

        case types.ADD_REMOVE_CART_ITEM:
            console.log("ADD_REMOVE_CART_ITEM", Object.assign( state, { carData: action.carData }, { filteredData: action.filteredData }, { cartData: action.cartData } ));
            return Object.assign( state, { carData: action.carData }, { filteredData: action.filteredData }, { cartData: action.cartData } );

        case types.COMPLETE_TRANSACTION:
            console.log("COMPLETE_TRANSACTION", Object.assign( state, {carData: action.carData, cartData: [ ] } ) );
            return Object.assign( state, {carData: action.carData});

        default:
            return state
    }
} )

export {store};
