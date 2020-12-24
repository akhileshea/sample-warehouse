import * as ActionTypes from './ActionTypes';
import { baseUrl } from '../shared/baseUrl';

export const fetchProducts = () => (dispatch) => {
    dispatch(productsLoading(true));
    var options = {
        method:'GET'
    }
    return fetch(baseUrl + 'products',options)
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error' + response.status +': '+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(products => {
        dispatch(addproducts(products));
    })
    .catch(error => dispatch(productsFailed(error.message)));
}

export const addproducts = (products) => ({
    type:ActionTypes.ADD_PRODUCTS,
    payload:products
})

export const productsLoading = () => ({
    type: ActionTypes.PRODUCTS_LOADING
});

export const productsFailed = (errmess) => ({
    type:ActionTypes.PRODUCTS_FAILED,
    payload: errmess
})

export const fetchItems = () => (dispatch) => {
    dispatch(itemsLoading(true));
    var options = {
        method:'GET'
    }
    return fetch(baseUrl + 'items',options)
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error('Error' + response.status +': '+ response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(items => {
        dispatch(additems(items));
    })
    .catch(error => dispatch(itemsFailed(error.message)));
}

export const additems = (items) => ({
    type:ActionTypes.ADD_ITEMS,
    payload:items
})

export const itemsLoading = () => ({
    type: ActionTypes.ITEMS_LOADING
});

export const itemsFailed = (errmess) => ({
    type:ActionTypes.ITEMS_FAILED,
    payload: errmess
})

export const uploadProductData = (jsonFile) =>(dispatch)=>{
    dispatch(uploadProductDataInProgress(true));
     var formData = new FormData();
     formData.append('file',jsonFile)
     var options = {
         method:'POST',
         body: formData
     }
     return fetch(baseUrl + 'products',options)
     .then(response => {
         if(response.ok) {
             return response;
         }
         else {
             var error = new Error(response.statusText);
             error.response = response;
             throw error;
         }
     },
     error => {
         var errmess = new Error(error.message);
         throw errmess;
     })
     .then(response => response.json())
     .then(uploadResult => dispatch(uploadProductDataSuccess(uploadResult)))
     .catch(error => dispatch(uploadProductDataFailed(error)));
 }
 
 
 export const uploadProductDataSuccess = (uploadResult) => ({
     type:ActionTypes.PRODUCT_DATA_UPLOAD_SUCCESS,
     payload:uploadResult
 })
 
 export const uploadProductDataInProgress = () => ({
     type: ActionTypes.PRODUCT_DATA_UPLOAD_IN_PROGRESS
 });
 
 export const uploadProductDataFailed = (errmess) => ({
     type:ActionTypes.PRODUCT_DATA_UPLOAD_FAILED,
     payload: errmess
 })

 export const uploadInventoryData = (jsonFile) =>(dispatch)=>{
    dispatch(uploadInventoryDataInProgress(true));
     var formData = new FormData();
     formData.append('file',jsonFile)
     var options = {
         method:'POST',
         body: formData
     }
     return fetch(baseUrl + 'items',options)
     .then(response => {
         if(response.ok) {
             return response;
         }
         else {
             var error = new Error(response.statusText);
             error.response = response;
             throw error;
         }
     },
     error => {
         var errmess = new Error(error.message);
         throw errmess;
     })
     .then(response => response.json())
     .then(uploadResult => {
         dispatch(uploadInventoryDataSuccess(uploadResult))
         dispatch(fetchItems())
         dispatch(fetchProducts())
     })
     .catch(error => dispatch(uploadInventoryDataFailed(error)));
 }
 
 
 export const uploadInventoryDataSuccess = (uploadResult) => ({
     type:ActionTypes.INVENTORY_DATA_UPLOAD_SUCCESS,
     payload:uploadResult
 })
 
 export const uploadInventoryDataInProgress = () => ({
     type: ActionTypes.INVENTORY_DATA_UPLOAD_IN_PROGRESS
 });
 
 export const uploadInventoryDataFailed = (errmess) => ({
     type:ActionTypes.INVENTORY_DATA_UPLOAD_FAILED,
     payload: errmess
 })

 export const sellProduct = (product) => (dispatch) => {
    var options = {
        method:'PATCH',
        body: JSON.stringify(product),
        headers: new Headers({
            'Content-type': 'application/json'
        })
    }
    return fetch(baseUrl + 'products',options)
    .then(response => {
        if(response.ok) {
            return response;
        }
        else {
            var error = new Error(response.statusText);
            error.response = response;
            throw error;
        }
    },
    error => {
        var errmess = new Error(error.message);
        throw errmess;
    })
    .then(response => response.json())
    .then(sellResult => dispatch(fetchProducts()))
    .catch(error => dispatch(uploadInventoryDataFailed(error)));
}
   