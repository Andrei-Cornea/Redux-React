import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {addRemoveCartItem, toggleIsSelected} from "../actions/actionCreators";


class Products extends Component{


  render(){

    var models = this.props.filteredCars  || [];

        // if (this.props.filteredCars){
        //   models =   this.props.filteredCars;
        // }else{
        //   models =   this.props.models ;
        // }

      return(
          <div className="col-md-9"  >

              {models.map( car => {

              // let selected = car.isSelected;

              return <div key={car.id} className="panel panel-default col-xs-12 col-sm-3">

                      <div className="panel-heading">
                        {car.make}
                        <span className={"glyphicon pull-right "+ ( car.isSelected ? ' glyphicon-star':' glyphicon-star-empty') }
                               onClick={()=> {
                                        console.log(car.isSelected);
                
                                        return this.props.addRemoveCartItem(car);


                               } }
                        ></span>
                      </div>
                      <div className="panel-body">
                        <p>{car.name}</p>
                      </div>
                  </div>
            })}
          </div>
      )
  }
}


function  mapStateToProps(state){
  return {
    // models: state.cars.data.models,
    filteredCars: state.filteredCars
  }
};

// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({addRemoveCartItem,toggleIsSelected}, dispatch);
}


export default connect(mapStateToProps, matchDispatchToProps)(Products);
