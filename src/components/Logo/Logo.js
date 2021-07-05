import React from 'react'

import burgrLogo from   '../../assats/images/burger-logo.png'
import styles from './Logo.module.css'
const log=props=>(
 <div className={styles.Logo} style={{height:props.height}}>
    <img src={burgrLogo} alt='myburger' />
</div>
)

export default  log;