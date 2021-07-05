import * as actionTypes from './actionTypes'
import axios from 'axios'

export const addIngredents=(name)=>{
    return{
        type:actionTypes.ADD_INGREDIENT,
        ingredientName:name
    }
}


export const removeIngredents=(name)=>{
    return{
        type:actionTypes.REMOVE_INGREDIENT,
        ingredientName:name
    }
}

export const setIngredients=(ingredients)=>{
    return {
        type:actionTypes.SET_INGREDIENTS,
        ingredients:ingredients
    }
}

export const fetchIngredients=()=>{
    return {
        type:actionTypes.FETCH_INGREDIENTS_FAILED
    }
}


export const  initIngredients=()=>{
     return dispatch=>{
        axios.get('https://react-my-burger-af2ba-default-rtdb.firebaseio.com/ing.json')
        .then(response=>{
            console.log(response.data)
             dispatch(setIngredients(response.data))
        }).catch(error=>{
             dispatch(fetchIngredients())
        })
     }
}