import React from 'react';
import BuildControl from "./BuildControl/BuildControl"
import styles from "./BuildControls.module.css"

const controls=[
       {label:"Salad",type:'salad'},
       {label:"Bacon",type:'bacon'},
       {label:"Cheese",type:'cheese'},
       {label:'Meat',type:'meat'},


]

const buildControls=props=>(


    <div className={styles.BuildControls}>
        <p>price:<strong>{props.price.toFixed(2)}</strong></p>
        <button className={styles.OrderButton}
        disabled={!props.purchasable}
        onClick={props.order} 
        >{props.isAuth ?' order' :'signIn'}</button>
        {controls.map(ctrl=>{
              return  <BuildControl 
                        key={ctrl.label} 
                        label={ctrl.label}
                        added={()=>{props.ingredientAdded(ctrl.type)}}
                        remove={()=>{props.ingredientRemove(ctrl.type)}} 
                        disable={props.disabled[ctrl.type]}
                        />
        })}
    </div>
    
)


export default buildControls