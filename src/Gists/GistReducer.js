import {
  GET_USER_GISTS, USER_GISTS_LOADING, GISTS_FAILURE, GET_GIST_FILES, GIST_FILES_FAILURE,
} from '../Constants';

const initialstate = {
  gistsdata: [],
  filedata: [],
  error: '',
  gistfileerror: '',
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
    case GIST_FILES_FAILURE: {
      return Object.assign({}, state, { gistfileerror: action.error });
    }
    default: return state;
  }
};
export default gistReducer;
