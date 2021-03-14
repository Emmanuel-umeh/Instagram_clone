const initialState = {
    currentUser  : null
}


export const user = (state=initialState, actions) ={
    return(
        ...state,
        currentUser : actions.currentUser
    )
}