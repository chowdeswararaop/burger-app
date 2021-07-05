import React, { Component, useState } from 'react'
import { connect } from 'react-redux';
import {Redirect}  from 'react-router-dom'
import * as  actions  from '../../../hoc/store/actions/index'

const Logout=props=>{

    const {onLought}=props
useState(()=>{
    onLought;
},[onLought])


        return  <Redirect to='/' />
    }



const mapDispatchToProps=dispatch=>{
    return{
        onLought:dispatch(actions.logout())
    }
}


export default connect(null,mapDispatchToProps) (Logout)