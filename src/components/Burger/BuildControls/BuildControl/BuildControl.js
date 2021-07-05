import React from 'react'
import styles from './BuildControl.module.css'
const buildControl=props=>{
   return  <div className={styles.BuildControl}>
        <div  className={styles.Label}>{props.label}</div>
        <button className={styles.Less} disabled={props.disable} onClick={props.remove}>Less</button>
        <button className={styles.More} onClick={props.added}>More</button>
</div>

}

export default buildControl