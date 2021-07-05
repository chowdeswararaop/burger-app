import axios from 'axios'
import * as actionTypes from './actionTypes'



export const  authstart=()=>{
    return{
        type:actionTypes.AUTH_START
    }
}

export const  authsuccess=(token,userId,refToken)=>{
    return{
        type:actionTypes.AUTH_SUCCESS,
        idToken:token,
        userId:userId,
        refToken:refToken
    }
}


export const  authfail=(error)=>{
    return{
        type:actionTypes.AUTH_FAIL,
        error:error
    }
}


export const logout=()=>{
    localStorage.removeItem('token')
    localStorage.removeItem('expirationDate')
    localStorage.removeItem('userId')
    return {
        type:actionTypes.AUTH_LOGOUT
    }
}

export const checkAuthTimeOut=(expirationTime)=>{
    return dispatch=>{
        setTimeout(()=>{
            dispatch(logout())
        },expirationTime * 50)
    }
}

export const auth=(email,password,issignUp)=>{
    return dispatch=>{
        //...authenticate the user 
        dispatch(authstart());
        const authData={
            email:email,
            password:password,
            returnSecureToken:true
        }
        let   URL='https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyCX2ia8wes2oscBAr7QPBXFkFKujbRsnzs'
        if(!issignUp){
            URL='https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyCX2ia8wes2oscBAr7QPBXFkFKujbRsnzs'
          
        }
        axios.post(URL,authData)   
         .then(response=>{
             const expirationDate=new Date(new Date().getTime())+response.data.expiresIn*1000
             localStorage.setItem('token',response.data.idToken)
             localStorage.setItem('expirationDate',expirationDate)
             localStorage.setItem('userId',response.data.localId)
                 dispatch(authsuccess(response.data.idToken,response.data.localId,response.data.refreshToken))
                 dispatch(checkAuthTimeOut(response.data.expiresIn))
                 console.log(response.data.idToken,response.data.localId)
             }).catch(err=>{
                 dispatch(authfail(err.response.data.error))
                 console.log(err.response.data.error)
             })
    }
}


export const setAuthRedirectPath=path=>{
    return {
        type:actionTypes.SET_AUTH_REDIRECT_PATH,
        path:path
    }
}




export const authCheckState=()=>{
    return dispatch=>{
        const token=localStorage.getItem('token')
    
        if(!token){
            dispatch(logout())
          
        }else{
            // const expirationDate= new Date(localStorage.getItem('expirationDate'))
            // const date= new Date()
            // if(expirationDate <= date ){
            //  dispatch(logout())
            //   }else{
            //     const userId=localStorage.getItem('userId')
            //     const expTime=(expirationDate.getTime() - new Date().getTime()) /1000
            //     // dispatch(checkAuthTimeOut(expTime))
            
            //     }
            const userId=localStorage.getItem('userId')
                dispatch(authsuccess(token,userId));
            
        }
    }
}
