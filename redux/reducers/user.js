import { USER_FOLLOWING_STATE_CHANGE, USER_POST_STATE_CHANGED, USER_STATE_CHANGED } from "../constants";

const initialState = {
  currentUser: null,
  following : [],
  // my personal posts
  posts: [],
};

export const user = (state = initialState, actions) => {
  switch (actions.type) {
    case USER_STATE_CHANGED:
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
      return {
        ...state,
        following: actions.following,
      };

    default:
      return state;
  }
};
