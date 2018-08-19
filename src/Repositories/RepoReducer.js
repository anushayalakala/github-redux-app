import { GET_USER_REPOS,USER_REPOS_LOADING,USER_REPOS_FAILURE,GET_REPO_COMMITS } from '../Constants';

const initialstate = {
  repositories: [],
  isLoading : false,
  error : "",
  commits: []
}
const repoReducer = (state = initialstate, action) => {
  console.log("Repositories reducer running " + action.type);
  switch (action.type) {
    case GET_USER_REPOS: {
      return Object.assign({}, state, { repositories: action.repodata });
      break;
    }
    case GET_REPO_COMMITS: {
      return Object.assign({}, state, { commits: action.commits });
      break;
    }
    case USER_REPOS_LOADING: {
      return Object.assign({},state,{ isLoading : action.isLoading});
    }
    case USER_REPOS_FAILURE: {
      return Object.assign({},state,{ error : action.error });
    }
    default: return state;
  }
}
export default repoReducer;