import React from 'react'
import styles from './Toolbar.module.css'
import  Logo from '../../Logo/Logo'
import NavigationItems from '../Navigationitems/Navigationitems'
import Drawertoogle from '../SideDrawer/DrawerToogle/DrawerToogle'
const toolbar=props=>{

return <header className={styles.Toolbar}>
     <Drawertoogle clicked={props.drawerToggleClicked}/>
     <div className={styles.Logo}>
     <Logo/>
     </div>
     <nav className={styles.DesktopOnly}>

     <NavigationItems isAuth={props.isAuth} />

     </nav>
 </header>
}



export default toolbar;