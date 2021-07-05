import React, { Component, useEffect } from  'react'
import Order from '../../components/order/order'
import axios from 'axios'
import Spinner from '../../UI/Spinner/Spinner'
import withErrorHandler from  '../../hoc/withErrorHandler/withErrorHandler'
import { connect } from 'react-redux'
import * as actions from '../../hoc/store/actions/index'
import { Redirect } from 'react-router'
const Orders=props=>{

const {onFetchOrders}=props

useEffect(()=>{
    onFetchOrders(props.token,props.userId)
},[onFetchOrders])

     
let order=(
   props.orders.map(order=>{
        return <Order key={order.id} data={order}/>
    })

    )
    
    if(props.token == null){
        order=null
    } 

        return (
            props.loading ? <Spinner /> :
         <div>

            {order}
        </div>)
    
    }


const mapStateToProps=state=>{
    console.log(state)
    return{
        orders:state.order.orders,
        loading:state.order.loading,
        token:state.auth.token,
        isAuth:state.auth.isAuth,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
     onFetchOrders:(token,userId)=>dispatch(actions.fetchOrders(token,userId))

    }
}

export default connect(mapStateToProps ,mapDispatchToProps)  (Orders)