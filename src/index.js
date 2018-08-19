import React from 'react';
import ReactDOM from 'react-dom';
import './Styles/index.css';
import App from './Components/App';
import registerServiceWorker from './registerServiceWorker';
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom';
import Userprofile from './User/Userprofile';
import Repositories from './Repositories/Repositories';
import Gists from './Gists/Gists';
import GistFile from './Gists/GistFiles';
import RepoInfo from './Repositories/RepoInfo';
import { Provider } from 'react-redux';
import store from './Store/Index';

ReactDOM.render((<Provider store ={store}><Router>
    <div>
        <App/>
        <Switch>
            <Route path="/user" component={Userprofile} />
            <Redirect exact from="/" to="/user" />
            <Route path="/repos/:reponame" component={RepoInfo} />
            <Route path="/repos" component={Repositories} />
            <Route path="/gists/:fileId" component={GistFile} />
            <Route path="/gists" component={Gists} />
        </Switch>
    </div>
</Router></Provider>)
    , document.getElementById('root'));

registerServiceWorker();
