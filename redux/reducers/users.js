// reducer for all the users on the platform

import { USER_FOLLOWING_STATE_CHANGE, USER_POST_STATE_CHANGED, USERS_STATE_CHANGED } from "../constants";

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
    case USER_POST_STATE_CHANGED:
      return {
        ...state,
        posts: actions.posts,
      };
    case USER_FOLLOWING_STATE_CHANGE:

    console.log( actions.following)
      return {
        ...state,
        following: actions.following,
      };

    default:
      return state;
  }
};
