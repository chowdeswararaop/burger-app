import react from 'react'
import './order.css'

const order =props=>{
 const ingredients=[]

 for(let ingredientName in props.data.ingredients){
     ingredients.push({name:ingredientName,qnt:props.data.ingredients[ingredientName]})
 }
    
const ingredientOutput=ingredients.map(ig=>{
    return <span 
              key={ig.name}
              style={{
                  textTransform:'capitalize',
                  display:'inline-block',
                  margin:'0 8px',
                  border:'1px solid #ccc',
                  padding:'5px'
            }}
              >{ig.name}:{ig.qnt}  </span>
})

return <div className='order'>
     <p>Ingredients: {ingredientOutput}</p>
     <p>price:<strong>USD {props.data.price}</strong></p>
    </div>
}


export default order