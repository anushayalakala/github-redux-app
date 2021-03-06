import {
  GET_USER_REPOS, USER_REPOS_LOADING, USER_REPOS_FAILURE, GET_REPO_COMMITS, GET_REPO_COMMITS_FAILURE,
} from '../Constants';

const initialstate = {
  repositories: [],
  isLoading: false,
  error: '',
  commits: [],
  commitserror: '',
};
const repoReducer = (state = initialstate, action) => {
  switch (action.type) {
    case GET_USER_REPOS: {
      return Object.assign({}, state, { repositories: action.repodata });
    }
    case GET_REPO_COMMITS: {
      return Object.assign({}, state, { commits: action.commits });
    }
    case USER_REPOS_LOADING: {
      return Object.assign({}, state, { isLoading: action.isLoading });
    }
    case USER_REPOS_FAILURE: {
      return Object.assign({}, state, { error: action.error });
    }
    case GET_REPO_COMMITS_FAILURE: {
      return Object.assign({}, state, { commitserror: action.error });
    }
    default: return state;
  }
};

export default repoReducer;
