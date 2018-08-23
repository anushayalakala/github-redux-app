import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import Userprofile from './User/Userprofile';
import Repositories from './Repositories/Repositories';
import Gists from './Gists/Gists';
import GistFile from './Gists/GistFiles';
import RepoInfo from './Repositories/RepoInfo';
import store from './Store/Index';

ReactDOM.render((
  <Provider store={store}>
    <Router>
      <div>
        <App />
        <Switch>
          <Route path="/user" component={Userprofile} />
          <Route path="/repos/:reponame" component={RepoInfo} />
          <Route path="/repos" component={Repositories} />
          <Route path="/gists/:fileId" component={GistFile} />
          <Route path="/gists" component={Gists} />
        </Switch>
      </div>
    </Router>
  </Provider>
), document.getElementById('root'));

registerServiceWorker();
