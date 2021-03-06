import {
  GET_USER_REPOS, USER_REPOS_LOADING, USER_REPOS_FAILURE, GET_REPO_COMMITS, GET_REPO_COMMITS_FAILURE,
} from '../Constants';

export const getReponames = () => {
  const userName = localStorage.getItem('USER_NAME');
  return (dispatch) => {
    dispatch(userRepositoriesLoading(true));
    if (userName) {
      fetch(`https://api.github.com/users/${userName}/repos`)
        .then((response) => {
          if (response.ok) {
            return response.json();
          }
          throw new Error(response.statusText);
        })
        .then((data) => {
          dispatch(getRepositories(data));
          dispatch(userRepositoriesLoading(false));
        })
        .catch((error) => {
          dispatch(userRepositoriesError(error));
          dispatch(userRepositoriesLoading(false));
        });
    }
  };
};

export const getRepositories = repodata => ({
  type: GET_USER_REPOS,
  repodata,
});
export const userRepositoriesLoading = isLoading => ({
  type: USER_REPOS_LOADING,
  isLoading,
});
export const userRepositoriesError = error => ({
  type: USER_REPOS_FAILURE,
  error,
});

export const getRepositoryCommits = repoName => (dispatch) => {
  const userName = localStorage.getItem('USER_NAME');
  fetch(`https://api.github.com/repos/${userName}/${repoName}/commits`)
    .then((response) => {
      if (response.ok) {
        return response.json();
      }
      throw new Error(response.statusText);
    })
    .then((data) => {
      dispatch(repoCommits(data));
    })
    .catch((error) => {
      dispatch(repoCommitsFailure(error));
    });
};
export const repoCommits = commits => ({
  type: GET_REPO_COMMITS,
  commits,
});
export const repoCommitsFailure = error => ({
  type: GET_REPO_COMMITS_FAILURE,
  error,
});
