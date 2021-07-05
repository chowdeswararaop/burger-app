import React, { Component, useEffect, useState } from 'react';

import Modal from '../../UI/Modal/Modal';
import Aux from '../Auxi/Auxilar';


const withErrorHandler = ( WrappedComponent, axios ) => {
    return props=>{


        const [error,seterror]=useState(null)
        

        const reqInterceptor = axios.interceptors.request.use( req => {
                seterror(null)
                return req;
            } );
         const  resInterceptor = axios.interceptors.response.use( res => res, error => {
                seterror(error)
            } );
    

        useEffect(() =>{
            axios.interceptors.request.eject( reqInterceptor );
            axios.interceptors.response.eject( resInterceptor );
        },[reqInterceptor,resInterceptor])

       const errorConfirmedHandler = () => {
            seterror(null)
        }

    
            return (
                <Aux>
                    <Modal
                        show={error}
                        modalClosed={errorConfirmedHandler}>
                        {error ? error.message : null}
                    </Modal>
                    <WrappedComponent {...props} />
                </Aux>
            );
        
    }
}

export default withErrorHandler;