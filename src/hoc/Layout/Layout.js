import React,{Component, useState} from 'react'
import Aux from '../Auxi/Auxilar'
import styles from './Layout.module.css'
import Toolbar from '../../components/Navigation/Toolbar/Toolbar'
import SideDrawer from '../../components/Navigation/SideDrawer/SideDrawer'
import { connect } from 'react-redux'

const Layout=props=>{
    const [sideDrawerVisible,setsideDrawerVisible]=useState(false)
   
const sideDrawerCloseHandler=()=>{
    setsideDrawerVisible(false)
}

const sideDrawerToggleHandler=()=>{
    setsideDrawerVisible(!sideDrawerVisible)
}

return <Aux>
    <Toolbar
    isAuth={props.isAuthenticated}
     drawerToggleClicked={sideDrawerToggleHandler} />
    <SideDrawer 
    isAuth={props.isAuthenticated}
     open={sideDrawerVisible}
     closed={sideDrawerCloseHandler} />
   <main className={styles.Content } >
       {props.children}
    </main>
    </Aux>}

const mapStateToProps=state=>{

return{
    isAuthenticated:state.auth.token !==null
}

}

export default connect(mapStateToProps)(Layout)