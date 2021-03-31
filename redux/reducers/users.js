// reducer for all the USERSs on the platform

import { USERS_FOLLOWING_STATE_CHANGE, USERS_POST_STATE_CHANGED, USERS_STATE_CHANGED } from "../constants";

const initialState = {
  users: [],
  usersLoaded : 0,

};

export const user = (state = initialState, actions) => {
  switch (actions.type) {
    case USERS_STATE_CHANGED:
      return {
        ...state,
        currentUser: actions.currentUser,
      };
    case USERS_POST_STATE_CHANGED:
      return {
        ...state,
        posts: actions.posts,
      };
    case USERS_FOLLOWING_STATE_CHANGE:

    console.log( actions.following)
      return {
        ...state,
        following: actions.following,
      };

    default:
      return state;
  }
};
