import React, { Component } from 'react';
import {connect} from 'react-redux';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import {sellProduct} from '../redux/ActionCreators';
import CircularProgress from '@material-ui/core/CircularProgress';

const mapStateToProps = state => {
    return {
        products:state.products,
        items:state.items
    }
  }

  const mapDispachToProps = (dispatch) => ({
    sellProduct: (product) =>{dispatch(sellProduct(product))}
})

class Products extends Component  {
    constructor(props) {
        super(props);
        this.state = {
          
        };
      }
    
    showArticles = (product) => {
        return(
           product.contain_articles.map((item) => { 
               let itemDetailedInfo = this.props.items.items.filter(itemDetailed=> itemDetailed.art_id === item.art_id)[0];
               return(
                    <>
                        <span className="article-name-quantity">{itemDetailedInfo.name} : {item.amount_of}</span><br/>
                    </>
               )
           })
        )
    }

    sellProduct = (product) => {
        this.props.sellProduct({name:product.name})
    }

    buttonSection = (product) => {
        if(product.stock>0) {
            return(
                <Button variant="contained" color="primary" onClick={()=>this.sellProduct(product)}> Sell Product </Button>
            )
        }
        else {
            return(
                <></>
            )
        }
    }

    render() {
        if(this.props.products.isLoading || this.props.items.isLoading) {
            return(
               <CircularProgress/>
            )
        }
        else {
            return(
                this.props.products.products.map(product => {
                    return(
                        <Card variant="outlined" className="productCard">
                            <CardContent>
                                <div className="product-name">{product.name}</div>
                                <div className="product-articles">Articles <br/> {this.showArticles(product)}</div>
                                <div className="product-stock"><span className="stock-text">Available stock : </span>{product.stock}</div>
                                <div className="product-price">{product.price} SEK</div>
                                {this.buttonSection(product)}
                            </CardContent>
                        </Card>
                    )
                })
            )
        }
    }
}

export default (connect(mapStateToProps,mapDispachToProps)(Products));