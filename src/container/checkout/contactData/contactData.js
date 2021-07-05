import React, { Component, useState } from 'react'
import Spiner from '../../../UI/Spinner/Spinner'
import Button from '../../../UI/Button/Button'
import styles from  './contactData.module.css'
import axios from 'axios'
import Input from '../../../UI/input/input'
import {connect} from 'react-redux'
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler'
import * as actions from '../../../hoc/store/actions/index'

const ContactData=props=>{

   

const [orderForm,setorderForm]=useState({ 
            name: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'Your name'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
        },
        email: {
            elementType:'input',
            elementConfig:{
                type:'text',
                placeholder:'Your E-name'
            },
            value:'',
            validation:{
                required:true
            },
            valid:false,
            touched:false
    },
            street: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'street'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
        },
            zipCode: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'ZIP code'
                },
                value:'',
                validation:{
                    required:true,
                    minLength:5,
                    maxLength:5
                },
                valid:false,
                touched:false
        },
            country: {
                elementType:'input',
                elementConfig:{
                    type:'text',
                    placeholder:'country'
                },
                value:'',
                validation:{
                    required:true
                },
                valid:false,
                touched:false
        },
            
            deliveryMethod: {
                elementType:'select',
                elementConfig:{
                   options:[
                       {value:'fastest',displayValue:'Fastest'},
                       {value:'cheapest',displayValue:'Cheapest'}
                    ]
                   
                },
                value:"fastest",
                validation:{},
                valid:true
               
        }
    })
    const [formIsValid,setformIsValid]=useState(false)

const orderHandler=(e)=>{
    console.log(e)
    e.preventDefault();
    setorderForm({loading:true})
    const formdata={}
   for(let formElementIdentifier in orderForm) {
       formdata[formElementIdentifier]=orderForm[formElementIdentifier].value
      
    }
    const order = {
        ingredients: props.ings,
        price: props.price,
        orderData:formdata,
        userId:props.userId
    }
console.log(order);
  props.onOrderBurger(order,props.token)
}

const checkValidity=(value,rules)=>{
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



const inputChengeedHandler=(event,inputIdentifier)=>{
    //console.log(event)
    const updatedOrderForm={
        ...orderForm
    }
   
    const updatedFormElement={...updatedOrderForm[inputIdentifier]}
    updatedFormElement.value=event.target.value;
    updatedFormElement.valid=checkValidity(updatedFormElement.value, updatedFormElement.validation)
    updatedFormElement.touched=true
    updatedOrderForm[inputIdentifier]=updatedFormElement
    let formIsValid=true;
    for(let inputIdentifier in updatedOrderForm){
       formIsValid=updatedOrderForm[inputIdentifier].valid && formIsValid;

    }
    setorderForm(updatedOrderForm)
    setformIsValid(formIsValid)
   // this.setState({orderForm:updatedOrderForm,formIsValid:formIsValid})
 //   console.log(updatedFormElement)
}


    //   let ingredients=Object.keys(this.props.ings).length
    
      
        const formElementsArray=[]

        for(let key  in orderForm){
            formElementsArray.push({
                id:key,
                config:orderForm[key]
            })
        }

        let form=(
     
                // <Input type='input' placeholder='' value='' />
            <form onSubmit={orderHandler} >
             {formElementsArray.map(formElement=>{
               return <Input
                            key={formElement.id}
                            elementType={formElement.config.elementType}
                             elementConfig={formElement.config.elementConfig}
                             value={formElement.config.value}
                             shouldValidate={formElement.config.validation}
                             invalid={!formElement.config.valid}
                             changed={event=>inputChengeedHandler(event,formElement.id)}
                             touched={formElement.config.touched}
                             />
           })}
            <Button  btnType='Success' disable={!formIsValid || props.price === 4}>ORDER</Button>
        </form>
        )

        if(props.loading){
          form =<Spiner/>   
        }
    
    return(
        <div className={styles.ContactData}>
            <h4>Enter your contact data</h4>
           {form}
          
        </div>
    )
}

const mapStateToProps=state=>{
    console.log(state);
    return {
        ings:state.burgerBuilder.ingredients,
        price:state.burgerBuilder.totalPrice,
        loading:state.order.loading,
        token:state.auth.token,
        userId:state.auth.userId
    }
}

const mapDispatchToProps=dispatch=>{
    return{
        onOrderBurger:(orderData,token)=>dispatch(actions.purchaseBurger(orderData,token))

    }
      }

export default connect(mapStateToProps,mapDispatchToProps)(ContactData)

