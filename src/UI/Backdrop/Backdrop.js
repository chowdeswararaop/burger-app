import React from 'react'
import styles from './Backdrop.module.css'

const backDrop=props=>{
    return props.show ?<div  onClick={props.clicked} className={styles.Backdrop}></div>:null
}


export default backDrop