import React, {  Suspense, useEffect } from 'react';
import Layout from './hoc/Layout/Layout';
import BurgerBuilder from './container/BurgerBuilder/BurgerBuilder'
import CheckOut from './container/checkout/checkout'
import {Redirect, Route, Switch} from 'react-router-dom'
import Orders from './container/orders/orders'
import Auth from './container/Auth/Auth'
import Logout from './container/Auth/Logout/Logout';
import { connect } from 'react-redux';
import * as actions from './hoc/store/actions/index'
import withErrorHandler from './hoc/withErrorHandler/withErrorHandler';

const asyncCheckout=React.lazy(()=>{
  return import('./container/checkout/checkout')
})

const asyncOrders=React.lazy(()=>{
  return import('./container/orders/orders')
})

const asyncAuth=React.lazy(()=>{
  return import('./container/Auth/Auth')
})

const app= props=> {
//   constructor(props){
//     super(props)
//     this.props.onTryAutoSignup()
//   }
//   componentDidMount(){
//   this.props.onTryAutoSignup()
// }
const {onTryAutoSignup}=props  

useEffect(()=>{
  onTryAutoSignup()
},[onTryAutoSignup])
  

let routes=(
  <Switch>
  <Route path='/auth'  component={asyncAuth}/>
  <Route path='/' exact component={BurgerBuilder}/>

  </Switch>
); 


if(props.isAuth){
  routes=(
   <Switch>
    <Route path='/checkout'   component={asyncCheckout}/>
    <Route path='/orders'  component={asyncOrders}/>
    <Route path='/logout'  component={Logout}/>
    <Route path='/' exact component={BurgerBuilder}/>
   </Switch>
  )
}

    return (
    <Layout>
      <Suspense fallback={<p>Loading......</p>}>
     <Route path='/checkout'   component={asyncCheckout}/>
    <Route path='/orders'  component={asyncOrders}/>
    <Route path='/logout'  component={Logout}/>
    <Route path='/' exact component={BurgerBuilder}/>
    <Route path='/auth'  component={asyncAuth}/>
    <Redirect to='/' />
    </Suspense>
    </Layout>
    
    )
  }


const mapStateToProps=state=>{
  return{
     isAuth:state.auth.isAuth !== null
  }
}

const mapDispatchToProps=dispatch=>{
  return{
    onTryAutoSignup:()=>dispatch(actions.authCheckState())
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(app);
