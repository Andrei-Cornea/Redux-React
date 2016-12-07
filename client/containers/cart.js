import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';

import {addRemoveCartItem} from "../actions/actionCreators";


class Cart extends Component {

    render(){
  let cartItems = this.props.cart ? this.props.cart.map( (item, index )=>(
                  < li className = "list-group-item active " key = {index} >
                    <div className="row">
                      <div className="col-xs-10">
                          <span>
                              <b>Brand:</b>
                              {item.make}
                          </span><br/>
                          <span>
                              <b>Model:</b>
                              {item.name}
                          </span>
                      </div>
                      <div className="col-xs-1">
                          <span aria-hidden="true" 
                                className="close" 
                                style={{fontSize: '40px'}}
                                 onClick={()=> this.props.addRemoveCartItem(item) }
                          >&times;</span>
                      </div>
                    </div>
                  < /li>
                    )) : null;


        return (
            <ul className="list-group"  >
                {cartItems}
		    </ul>
        )
    }

}



function  mapStateToProps(state){
  return {
    cart: state.cart
  }
};


// Get actions and pass them as props to to UserList
//      > now UserList has this.props.selectUser
function matchDispatchToProps(dispatch){
    return bindActionCreators({addRemoveCartItem}, dispatch);
}


export default connect(mapStateToProps,matchDispatchToProps)(Cart);

