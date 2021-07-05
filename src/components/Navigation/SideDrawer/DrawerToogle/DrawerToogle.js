import React from 'react'
import styles from './DrawerToogle.module.css'

const drawerToggle=props=>(
 <div onClick={props.clicked} className={styles.DrawerToggle}>
     <div></div>
     <div></div>
     <div></div>
 </div>
)

export default drawerToggle