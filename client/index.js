import 'babel-polyfill';
import React from 'react';
import ReactDOM from "react-dom";
import {createStore, applyMiddleware, combineReducers,} from 'redux';
import {Provider} from 'react-redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import axios from 'axios';

import App from './components/App';

// initial state object
const initialState = {

  fetching: false,
    fetched: false,
    data:[],
    error:null


  // filterBy:{
  //   searchText: '',
  //   brandDropdown: '',
  //   modelDropdown: ''
  // },
  //
  // filteredCars: [],
  //
  //   cart: []

}

// REDUCER
const userReducer =  (state=initialState , action) => {
  switch (action.type) {
    case 'fetch_users_start':
    return Object.assign({}, state, {
      fetching : true
    } );
       
    case 'receive_users':
    return Object.assign({}, state, {
          fetching: false,
          fetched:true,
          data: action.payload
        })  ;
        
    case 'fetch_users_error':
    return Object.assign({}, state, {
        fetching: false,
        error: action.payload
      })  ;
      
    case 'toggle_isSelected_model':
    return Object.assign({}, action.payload)  ;
    // default:
    //   return  state;
  }
  return state;
};



const filterby =  (state = Object.assign({}, state, {
    searchText: '',
    brandDropdown: '',
    modelDropdown: ''
}) , action) => {
  
  switch (action.type) {
    case 'searchText':
    return Object.assign({}, state, {searchText: action.payload });
    
    case 'brandDropdown':
    return Object.assign({}, state, { brandDropdown: action.payload });
        
    case 'modelDropdown':
    return Object.assign({}, state, { modelDropdown: action.payload });
  }

  return state;
};

const filteredCars =  (state = Object.assign([], state, [] ) , action) => {
  switch (action.type) {
    case 'NO_FILTERED_DATA':
        return Object.assign([],state, action.payload );
    
    case 'brandDropdown':
        return Object.assign({},state, action.payload );
        
    case 'modelDropdown':
        return Object.assign({},state, action.payload );
  }

  return state;
};

const cart =  (state = Object.assign([] , state, [] ) , action) => {
  switch (action.type) {
    case 'ADD_REMOVE_CART_ITEM':
      console.log('add payload',action.payload)
    return Object.assign([], action.payload);

  }

  return state;
};

// middleware
const middleware = applyMiddleware(thunk,logger());

// REDUCERS
const reducers = combineReducers({
  cars: userReducer,
  filterby: filterby,
  filteredCars:filteredCars,
  cart: cart
})

// STORE
export const store = createStore(reducers , window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(), middleware);

store.dispatch( (dispatch) => {

  dispatch({type:'fetch_users_start'});

  axios.get("https://api.edmunds.com/api/vehicle/v2/makes?fmt=json&api_key=e6jd7d4rx7qx64r5dskzwdwc")
      .then( (response)=>{
        var id = 0;
        var marketData = {
          models : [],
          name : []
        };
        response.data.makes.forEach(function(entry) {
                    marketData.name.push(entry.name);
                    entry.models.forEach(function(model) {
                        marketData.models.push({
                            id: id++,
                            name: model.name,
                            make: entry.name,
                            isSelected: false
                        });
                    });
                })
                
        dispatch({type:'receive_users', payload: marketData})
        dispatch({type:'NO_FILTERED_DATA',payload:marketData.models});

      })
      .catch((err) => {
        dispatch({type:'fetch_users_error', payload: err})
      })
      
});

store.subscribe(()=>console.log("Store State",store.getState()));

let root = document.getElementById('app')

ReactDOM.render(
  <Provider store={store}>
      <App />
  </Provider>
  , root)



  // import {store} from './reducers/reducer';
  // import {CarMarketService} from './services/service';
  // import * as types from './actions/actionTypes';
  // import { receiveCarMarket,
  //          filterAfterSearchField,
  //          filterAfterBrandDropdown,
  //          filterAfterModelDropdown,
  //          addRemoveCartItem,
  //          completeTransaction } from './actions/actionCreators';
