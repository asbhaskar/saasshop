import * as actionTypes from '../actions/actionTypes';
import { updateObject } from '../utility';
import firebase from "../../firebase/firebase";

const initialState={
    items:{},
    cart:{}
}

const pullShopItems = (state, action) => {
    console.log(action.data)
    return updateObject(state, { items: action.data });
  };

const addItem = (state, action) => {
    console.log(action.size)
    let updatedAmount = 0
    if (state.cart[action.itemID] && state.cart[action.itemID][action.size]){
        updatedAmount= parseInt(state.cart[action.itemID][action.size]) + parseInt(action.amount)
    }else{
        updatedAmount = parseInt(action.amount)
    }
    return updateObject( state, {
        ...state,
        cart: {
            ...state.cart,
            [action.itemID]: {
                ...state.cart[action.itemID],
                [action.size]: updatedAmount
            }
        }
    });
};


const shopReducer = ( state = initialState, action ) => {
    switch ( action.type ) { 
        case actionTypes.PULL_SHOP_ITEMS: return pullShopItems(state,action);
        case actionTypes.ADD_ITEM: return addItem(state, action);
        default:
            return state;
    }
};

export default shopReducer;