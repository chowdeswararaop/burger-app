import React from 'react'
import  styles from './Burger.module.css'
import Burgeringridents from '../Burger/Burgeringridents/Burgeringridents'
const burger=props=>{
   let transformedIngridens=Object.keys(props.ingredients)
         .map(igkey=>{
             return [...Array(props.ingredients[igkey])].map((_,i)=>{
                   return   <Burgeringridents key={igkey +i} type={igkey} />
             })
         })
         .reduce((arr,el)=>{
             return arr.concat(el)
         },[])

         if(transformedIngridens.length===0){
           transformedIngridens=  <p>Add sometthing</p>
         }


    return (
       
        <div className={styles.Burger}>
            <Burgeringridents type='bread-top' />
            { transformedIngridens }
            <Burgeringridents type='bread-bottom' />

        </div>

    );
}


export default burger