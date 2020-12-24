import {createStore,combineReducers,applyMiddleware} from 'redux';
import thunk from 'redux-thunk';
import logger from 'redux-logger';
import {Products} from './products';
import {Items} from './items';
import {ProductsUpload} from './productsUpload';
import {InventoryUpload} from './inventoryUpload';

export const ConfigureStore = () => {
    const store = createStore(
        combineReducers({
          products:Products,
          productUpload:ProductsUpload,
          inventoryUpload:InventoryUpload,
          items:Items
        }),
        applyMiddleware(thunk,logger)
    );

    return store;
}