import React, { Component } from 'react'
import styles from "./Modal.module.css"
import Aux from '../../hoc/Auxi/Auxilar'
import Backdrop from '../../UI/Backdrop/Backdrop'
const Modal=props=>{

// shouldComponentUpdate(nextProps,nextState){
//     return nextProps.show !== this.props.show
// }



   return <Aux>
       <Backdrop show={props.show} 
       clicked={props.modalClicked} />
    <div 
         className={styles.Modal}
         style={{
             transform:props.show?'translateY(0)':'translateY(-100vh)',
             opacity:props.show?'1':'0'
            }}
        >
        {props.children}
    </div>
    </Aux>
} 




export default React.memo(Modal,(prevProps,nextProps)=>{nextProps.show === prevProps.show});