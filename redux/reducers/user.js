import { USER_POST_STATE_CHANGED, USER_STATE_CHANGED } from "../constants";

const initialState = {
  currentUser: null,
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

    default:
      return state;
  }
};
