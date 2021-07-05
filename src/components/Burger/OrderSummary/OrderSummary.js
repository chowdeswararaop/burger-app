import React, { Component } from 'react'
import Aux from "../../../hoc/Auxi/Auxilar"
import Button from '../../../UI/Button/Button'
import {Link} from'react-router-dom'
const OrderSummary =props=>{
 
     const ingredientSummary=Object.keys(props.ingredients)
             .map(igKey=>{
                 return <li key={igKey}><strong style={{textTransform:'capitalize'}}>{igKey}</strong>:{props.ingredients[igKey]}</li>
             })
        return <Aux>
    <h3>Your order</h3>
    <p><strong>Total price:{props.price.toFixed(2)}</strong></p>
    <p>Burger ingredients:</p>
    <ul>{ingredientSummary}</ul>
    <p>continue to check out</p>
    <Button btnType='Danger'  clicked={props.cancel}>cancel</Button>
    <Button  btnType='Success' clicked={props.continue} >continue</Button>
 

</Aux>
 
}

export default OrderSummary;