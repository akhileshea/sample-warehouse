import React, { Component } from 'react';
import {connect} from 'react-redux';
import {fetchProducts,fetchItems} from '../redux/ActionCreators';
import Header from './HeaderComponent';
import Products from './ProductsComponent';


const mapStateToProps = state => {
    return {
        products:state.products
    }
  }

const mapDispachToProps = (dispatch) => ({
    fetchProducts: () => {dispatch(fetchProducts())},
    fetchItems: () => {dispatch(fetchItems())}
})

class Main extends Component {
    constructor(props) {
        super(props);
        this.state = {
          
        };
      }
    
    

    componentDidMount() {
        this.props.fetchProducts();
        this.props.fetchItems();
    }

    render() {
            return(
                <>
                    <Header/>
                    <Products/>
                </>
            )
    }
}

export default (connect(mapStateToProps,mapDispachToProps)(Main));