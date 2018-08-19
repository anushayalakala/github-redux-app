import {combineReducers} from 'redux';
import userReducer from './User/UserReducer';
import repoReducer from './Repositories/RepoReducer';
import gistReducer from './Gists/GistReducer';
import navLinkReducer from './Components/NavLinksReducer';

const rootReducer = combineReducers({user:userReducer,repo:repoReducer,gist:gistReducer,navLink : navLinkReducer});
export default rootReducer;