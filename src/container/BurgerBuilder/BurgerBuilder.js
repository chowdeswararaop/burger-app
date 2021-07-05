import React, { Component, useCallback, useEffect, useState } from "react";
import Aux from '../../hoc/Auxi/Auxilar'
import Burger from "../../components/Burger/Burger"
import BuildControls from "../../components/Burger/BuildControls/BuildControls"
import { object } from "prop-types";
import Modal from "../../UI/Modal/Modal"
import OrderSummary from "../../components/Burger/OrderSummary/OrderSummary";
import Checkout from "../checkout/checkout";
import { connect, useDispatch, useSelector } from "react-redux";
import * as BurgerBuilderActions from '../../hoc/store/actions/index.js'
import axios from "axios";
import Spinner from '../../UI/Spinner/Spinner'

const BurgerBuilder=props=> {

const [purchasing,setpurchasing]=useState(false)

const dispatch=useDispatch()


const ings=useSelector(state=>{
    return state.burgerBuilder.ingredients
})
const price=useSelector(state=>{
    return state.burgerBuilder.totalPrice
})
const error=useSelector(state=>{
    return state.burgerBuilder.error
})
const isAuth=useSelector(state=>{
    return state.auth.token !==null
})
const onIngredientAdded=(ingName)=>dispatch(BurgerBuilderActions.addIngredents(ingName))
const onIngredientRemove=(ingName)=>dispatch(BurgerBuilderActions.removeIngredents(ingName))
const onInitIngredients=useCallback(()=>dispatch(BurgerBuilderActions.initIngredients()),[dispatch])
const onIntPurchase=()=>dispatch(BurgerBuilderActions.purchaseInt())
const onSetRedirectPath=(path)=>dispatch(BurgerBuilderActions.setAuthRedirectPath(path))



useEffect(()=>{
    // console.log(this.props)
     onInitIngredients()

},[onInitIngredients])

const updatePurchaseHandler=(ingredients)=>{
       
           const sum=Object.keys(ingredients)
           .map(igKey=>{
               return ingredients[igKey]
           }).reduce((sum,el)=>{
               return sum+el
           })
        return sum >0;
    }
const purchaseHandler=()=>{
    if(isAuth){

        setpurchasing(true)
    }else{
        onSetRedirectPath('/checkout')
        props.history.push('/auth')
    }
    }

const purchaseCancelHandler=()=>{
    setpurchasing(false)
}
const purchaseContinueHandler=()=>{

    onIntPurchase()
   
    props.history.push({
        pathname:'/checkout'
    })

}


    // console.log(this.state.purchasing);
    const disableInfo={
            ...ings
        }
        //console.log(disableInfo)
        for(let key in disableInfo){
            disableInfo[key]=disableInfo[key] <=0

          //  console.log(disableInfo[key])

        }
        let orderSummary=null
        let burger= error ? <p>Ingredients can't br loaded</p> : <Spinner />
      if(ings){  
    burger=(
        <Aux>
          <Burger  ingredients={ings}/>
                <BuildControls
                 ingredientAdded={onIngredientAdded}
                 ingredientRemove={onIngredientRemove}
                 disabled={disableInfo}
                 price={price}
                 purchasable={updatePurchaseHandler(ings)}
                 order={purchaseHandler}
                 isAuth={isAuth}
                 />
        </Aux>
    )
    orderSummary=<OrderSummary 
    price={price}
    continue={purchaseContinueHandler}
    cancel={purchaseCancelHandler}
   ingredients={ings}/>


 }

        return(

            <Aux>
            <Modal  show={purchasing} modalClicked={purchaseCancelHandler} >
                {orderSummary}
            </Modal>
              {burger}
            </Aux>
        
           
        );
    }

//  const mapStateToProps=state=>{
//      console.log(state)
//     return {
//         ings:state.burgerBuilder.ingredients,
//         price:state.burgerBuilder.totalPrice,
//         error:state.burgerBuilder.error,
//         isAuth:state.auth.token !==null
//     }
// }
// const mapDispatchToProps=dispatch=>{
//     return{
//         onIngredientAdded:(ingName)=>dispatch(BurgerBuilderActions.addIngredents(ingName)),
//         onIngredientRemove:(ingName)=>dispatch(BurgerBuilderActions.removeIngredents(ingName))
//         ,onInitIngredients:()=>dispatch(BurgerBuilderActions.initIngredients()),
//         onIntPurchase:()=>dispatch(BurgerBuilderActions.purchaseInt()),
//         onSetRedirectPath:(path)=>dispatch(BurgerBuilderActions.setAuthRedirectPath(path))
      
//     }
// }

// export default connect(mapStateToProps,mapDispatchToProps)(BurgerBuilder)

export default BurgerBuilder