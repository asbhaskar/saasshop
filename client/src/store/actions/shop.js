import * as actionTypes from '../actions/actionTypes';
import firebase from "../../firebase/firebase";

export const addItem = (itemID, size, amount) => {
    return {
        type: actionTypes.ADD_ITEM,
        itemID: itemID,
        size: size,
        amount: amount
    };
};

export const pullShopItems = () =>{
    const dataObject = {}
    const initialData = {}
    return dispatch => {
        firebase
      .firestore()
      .collection("inventory")
      .get()
      .then((snapshot) => {
        snapshot.forEach((item) => {
          const data = initialData;
          data[item.id] = item.data();
        });
      }).then(() => {
          Object.entries(initialData).forEach(([key, value]) => {
            dataObject[key] = value;
          })
      }).then(() => {
        dispatch(getData(dataObject))
      })
    }
}

export const getData = (data) =>{
    console.log("action called")
    return {
        data:data,
        type: actionTypes.PULL_SHOP_ITEMS
    }
}