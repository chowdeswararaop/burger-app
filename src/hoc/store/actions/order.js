import axios from 'axios'
import order from '../../../components/order/order'
import * as actionTypes from './actionTypes'


export const purchaseBurgerSuccess=(id,orderData)=>{
    return{
       type:actionTypes.PURCHASE_BURGER_SUCCESS,
       orderId:id,
       orderData:orderData
    }
}

export const purchaseBurgerFail=(error)=>{

    return{
        type:actionTypes.PURCHASE_BURGER_FAIL,
        error:error 
     }

}
export const purchaseBurgeStart=()=>{
    return {
        type:actionTypes.PURCHASE_BURGER_START
    }
}

export const purchaseBurger=(orderData,token)=>{

     return dispatch=>{
        dispatch(purchaseBurgeStart())
        axios.post('https://react-my-burger-af2ba-default-rtdb.firebaseio.com/orders.json?auth='+token,orderData )
        .then( response => {
            dispatch(purchaseBurgerSuccess(response.data.name,orderData))
        } )
        .catch( error => {

            dispatch(purchaseBurgerFail(error))
          } );
     }

}
export const purchaseInt=()=>{
    return {
        type:actionTypes.PURCHASE_INIT
    }
}


export const fetchOrderSuccess=(orders)=>{
    return{
        type:actionTypes.FETCH_ORDERS_SUCCESS,
        orders:orders
    }
}

export const fetchOrderFail=(error)=>{
    return{
        type:actionTypes.FETCH_ORDERS_FAIL,
        error:error
    }
}


export const fetchOrderStart=()=>{
    return{
       type:actionTypes.FETCH_ORDERS_START
    }
}

export const fetchOrders=(token,userId)=>{
   return dispatch=>{
       dispatch(fetchOrderStart())
       const queryParams='?auth='+ token +'&orderBy="userId"&equalTo="'+userId +'"'
    axios.get('https://react-my-burger-af2ba-default-rtdb.firebaseio.com/orders.json'+queryParams)
    .then(response=>{
        // console.log(response.data[0].userId)
        let fetchedOrders=[]
        for(let key in response.data){
            fetchedOrders.push({...response.data[key],id:key})
            
        }
    
       dispatch(fetchOrderSuccess(fetchedOrders))
    })
    .catch(err=>{
        dispatch(fetchOrderFail(err))
    })
   }
 }