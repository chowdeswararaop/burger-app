import React, { Component, useEffect, useState } from 'react'
import Input from '../../UI/input/input'
import Button from '../../UI/Button/Button'
import styles from './Auth.module.css'
import * as actions from '../../hoc/store/actions/index'
import {connect} from 'react-redux'
import Spinner from '../../UI/Spinner/Spinner'
import { Redirect } from 'react-router'

const Auth=props=> {

     const [controls,setcontrols] =useState({

        email: {
            elementType:'input',
            elementConfig:{
                type:'email',
                placeholder:'E-mail'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
    },
    password: {
        elementType:'input',
        elementConfig:{
            type:'password',
            placeholder:'password'
        },
        value:'',
        validation:{
            required:true
        },
        valid:false,
        touched:false
}       

    
    })

    const [isSignup,setisSignup]=useState(true)


    const {onSetRedirectPath,buildingBurger,authRedirectPath}=props

    useEffect(()=>{

        if(!buildingBurger && authRedirectPath !== '/'){
            onSetRedirectPath()
        }

    },[buildingBurger,authRedirectPath,onSetRedirectPath])

const  checkValidity=(value,rules)=>{
        //console.log(rules)
        let isValid=true
        if(rules.required){
            isValid=value.trim() !=='' &&isValid;
        }
    if(rules.minLength){
        isValid=value.length >= rules.minLength &&isValid
    }
    if(rules.maxLength){
        isValid=value.length <= rules.maxLength  && isValid
    }
    
        return isValid; 
    }

const inputChengeedHandler=(event,controlName)=>{
    const updatedControls={
        ...controls,
        [controlName]:{
            ...controls[controlName],
            value:event.target.value,
            valid:checkValidity(event.target.value,controls[controlName].validation),
            touched:true
        }
    }

    setcontrols(updatedControls)
}

const submitHandler=(event)=>{
    event.preventDefault()
    props.onAuth(controls.email.value,
                   controls.password.value,
                   isSignup)
}

const switchAuthModeHandler=()=>{
    setisSignup(prevState=>{
       return {isSignup:!prevState.isSignup}
    })
}

    const formElementsArray=[]

    for(let key  in controls){
        formElementsArray.push({
            id:key,
            config:controls[key]
        })
    }

let form = formElementsArray.map(formElement=>(

    <Input
     key={formElement.id}
     elementType={formElement.config.elementType}
     elementConfig={formElement.config.elementConfig}
     value={formElement.config.value}
     shouldValidate={formElement.config.validation}
     invalid={!formElement.config.valid}
     changed={event=>inputChengeedHandler(event,formElement.id)}
     touched={formElement.config.touched} />
     
     ))
     if(props.loading){
         form=<Spinner />
     }
let errorMessage=null;
 if(props.error){
     errorMessage=(
         <p>{props.error.message}</p>
     )
 }

let authRedirect = null;
           
     if(props.isAuth && props.buildingBurger){
           authRedirect=<Redirect to="/checkout" />
        }
     else if(props.isAuth){
            authRedirect=<Redirect to="/" />
        }
     return(
         
         <div className={styles.ContactData}>
             {authRedirect}
             {errorMessage}
    <form onSubmit={submitHandler}>
     {form}
    <Button  btnType='Success'>submit</Button>
    <Button clicked={switchAuthModeHandler} btnType='Danger'>switch to 
     {isSignup ?'  signIn ':' signUp'}</Button>
    </form>
</div>

)
}


const mapStateToProps=state=>{
    console.log(state)
    return{
        loading:state.auth.loading,
        error:state.auth.error,
        isAuth:state.auth.token !==null,
        buildingBurger:state.burgerBuilder.building,
        authRedirectPath:state.auth.authRedirectPath,
        refreshToken:state.auth.refreshToken
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onAuth:(email,password,isSignup)=>dispatch(actions.auth(email,password,isSignup)),
        onSetRedirectPath:()=>dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default  connect(mapStateToProps,mapDispatchToProps)(Auth)