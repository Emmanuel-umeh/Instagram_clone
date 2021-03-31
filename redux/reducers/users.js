// reducer for all the USERSs on the platform

import { USERS_FOLLOWING_STATE_CHANGE, USERS_POSTS_STATE_CHANGED, USERS_DATA_STATE_CHANGED } from "../constants";

const initialState = {
  users: [],
  usersLoaded : 0,

};

export const user = (state = initialState, actions) => {
  switch (actions.type) {
    case USERS_DATA_STATE_CHANGED:
      return {
        ...state,
        users: [...state.users, actions.user],
      };
    case USERS_POSTS_STATE_CHANGED:
      return {
        ...state,
        usersLoaded : state.usersLoaded + 1,
        users : state.users.map(user =>{
            user.uid === actions.uid ? 
            {}
        })
      };

    default:
      return state;
  }
};
