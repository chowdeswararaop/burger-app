import React from 'react'
import Burger from '../../Burger/Burger'
import Button from '../../../UI/Button/Button'
import styles from './checkOutSummary.module.css'
import {Link,withRouter} from 'react-router-dom'
import { object } from 'prop-types'
const checkOutSummary=props=>{
    
    console.log(props.price)
    return(
        <div className={styles.checkOutSummary}>
        
         
        <div>
            <h1>we hope it taste well!</h1>
            <div style={{width:'100%',margin:'auto'}}>
                <Burger ingredients={props.ingredients}/>

            </div>
            {/* <p><strong>Total:{props.price}</strong></p> */}
            
            <Button 
                btnType='Danger'
                clicked={props.cancel}
            >cancel</Button>
            <Button 
                btnType='Success'
                clicked={props.continue}
                disable={props.price === 4}
            >continue</Button>
            </div>
        </div>
    )
}

export default withRouter(checkOutSummary)