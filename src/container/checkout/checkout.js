import React,{ Component } from 'react'
import { Route ,Redirect} from 'react-router-dom'
import CheckOutSummary from '../../components/order/checkOutSummary/checkOutSummary'
import ContactData from './contactData/contactData'
import {connect} from 'react-redux'
import * as actions from '../../hoc/store/actions/index'
const Checkout=props=>{


//IT DONT WORK
//    componentDidMount(){

//     this.props.onInitPurchase()

//    } 
  
 const checkOutContinueHandler=()=>{
        props.history.push('/checkout/contact-data')
    
    }
    
 const   checkOutCancelHandler=()=>{
        props.history.replace('/')
    }
let summary=<Redirect to='/'/>
if(props.ings){
   const purchasedRedirect= props.purchased ?<Redirect to='/' />:null
   summary= (
   <div>
       {purchasedRedirect}
   <CheckOutSummary
    price={props.price} 
   ingredients={props.ings}
   cancel={checkOutCancelHandler}
   continue={checkOutContinueHandler}
/>
<Route path={props.match.path +'/contact-data'} 
 component={ContactData}
/>
</div>
   )

   }

return summary
}


const mapStateToProps=(state)=>{
    console.log(state)
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        purchased:state.order.purchased
        
    }
} 





export default connect(mapStateToProps)(Checkout)