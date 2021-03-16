const initialState = {
    currentUser  : null,
    posts : []
}


export const user = (state=initialState, actions) => {
    return{
        ...state,
        currentUser : actions.currentUser
    
    }
 
 
} 