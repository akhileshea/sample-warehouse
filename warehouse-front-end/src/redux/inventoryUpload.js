import * as ActionTypes from './ActionTypes';

export const InventoryUpload = (state={
    isLoading: false,
    errMess: null,
    success:false
},action) => {
    switch(action.type) {
        case ActionTypes.INVENTORY_DATA_UPLOAD_IN_PROGRESS:
            return {...state, isLoading:true, errMess: null,success:false}
        case ActionTypes.INVENTORY_DATA_UPLOAD_FAILED:
            return {...state, isLoading:false, errMess: action.payload,success:false}
        case ActionTypes.INVENTORY_DATA_UPLOAD_SUCCESS:
                return {...state, isLoading:false, errMess: null,success:true}
        default:
            return state;
    }
}