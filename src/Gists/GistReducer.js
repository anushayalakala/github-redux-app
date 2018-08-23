import {
  GET_USER_GISTS, USER_GISTS_LOADING, GISTS_FAILURE, GET_GIST_FILES,
} from '../Constants';

const initialstate = {
  gistsdata: [],
  filedata: [],
  error: '',
  isLoading: false,
};
const gistReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_USER_GISTS: {
      return Object.assign({}, state, { gistsdata: action.gistsdata });
    }
    case USER_GISTS_LOADING: {
      return Object.assign({}, state, { isLoading: action.isLoading });
    }
    case GISTS_FAILURE: {
      return Object.assign({}, state, { error: action.error });
    }
    case GET_GIST_FILES: {
      return Object.assign({}, state, { filedata: action.gistFiles });
    }
    default: return state;
  }
};
export default gistReducer;
