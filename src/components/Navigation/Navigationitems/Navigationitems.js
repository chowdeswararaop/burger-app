import React from 'react'
import NavigationItem from '../Navigationitems/NavigationItem/NavigationItem'
import styles from './NavigationItems.module.css'
const navigationItems=(props)=>(
    <ul className={styles.NavigationItems}>
        <NavigationItem link='/'>Burger Builder</NavigationItem>
        {props.isAuth ?
        <NavigationItem link='/orders' >orders</NavigationItem>:null}
        {!props.isAuth ?
        <NavigationItem link='/auth' >signin</NavigationItem>:
        <NavigationItem link='/logout'>Logout</NavigationItem>}
  
    </ul>

)


export default navigationItems