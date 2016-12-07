import React, {Component} from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';

import Cart from '../containers/cart';
import {filterAfterBrandDropdown,filterAfterModelDropdown} from "../actions/actionCreators";

class Filters extends Component {
  constructor(props){
    super(props);

    this.state = {
      brandSelected:'',
      models:[]

    };

    // this.handleBrandFilter = this.handleBrandFilter.bind(this);
  }

  // handleBrandFilter(event){
  //   console.log(event.target.value);
  //   this.setState({brandSelected: event.target.value});
  // }


  render(){
    let brands = this.props.cars.name || [];


        if(this.state.brandSelected){

          this.props.filterAfterBrandDropdown(this.state.brandSelected)

          this.models = this.props.cars.models.filter( model =>{

                if( model.make === this.state.brandSelected){
                  return model.name;
                }

          })


        }else{
          this.state.models=[];
        }

        return(
            <div className="col-md-3">
              {console.log("filter props",this.props)}
              <form>

                <div className="form-group">
                  <label htmlFor="searchCar">Search</label>
                  <div className="input-group">
                    <input type="text" className="form-control" placeholder="Search" />
                    <span className="input-group-addon" id="basic-addon1"><span className="glyphicon glyphicon-search"></span></span>
                  </div>
                  <div>
                    <label htmlFor="brandName">Select brand</label>
                    <select className="form-control" id="exampleSelect1" value={this.state.brandSelected} onChange={this.handleBrandFilter}>
                        <option value="">Select</option>
                          { brands.map(brand => (<option key={brand} value={brand}>{brand} </option>) ) }

                    </select>
                  </div>
                  <div>
                    <label htmlFor="modelName">Select model</label>
                    <select className="form-control" id="exampleSelect2" disabled={!this.state.brandSelected}>
                        <option value="">Select</option>
                          { this.state.models.map(model => (<option key={model.id} value={model.name}>{model.name}</option>))}

                    </select>
                  </div>
                </div>

              </form>
              <button className="btn btn-lg btn-primary"  >
                      <span className="glyphicon glyphicon-shopping-cart"></span> Cart <span  className="badge">{this.props.cart.length ? this.props.cart.length : '' }</span>
              </button>
              &nbsp;&nbsp;
              <button className="btn btn-lg btn-success" disabled={ !this.props.cart.length } >Complete</button>

              <br/>
              <br/>

              <Cart />

            </div>
          )
  };


}

function  mapStateToProps(state){
  return {
  cars: state.cars.data,
  cart: state.cart
  }
};

function matchDispatchToProps(dispatch){
    return bindActionCreators({filterAfterBrandDropdown,filterAfterModelDropdown}, dispatch);
}

export default connect(mapStateToProps, matchDispatchToProps)(Filters);
