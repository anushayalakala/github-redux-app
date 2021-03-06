import React from 'react';
import '../Styles/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import {
  BrowserRouter as Router, Route, Switch, Redirect,
} from 'react-router-dom';
import NotFound from './NotFound';
import Userprofile from '../User/Userprofile';
import Repositories from '../Repositories/Repositories';
import Gists from '../Gists/Gists';
import GistFile from '../Gists/GistFiles';
import RepoInfo from '../Repositories/RepoInfo';
import RoutedNavLinks from './NavLinks';

class App extends React.Component { // eslint-disable-line react/prefer-stateless-function
  render() {
    return (
      <MuiThemeProvider>
        <div className="App">
          <Router>
            <div>
              <RoutedNavLinks />
              <Switch>
                <Route path="/user" component={Userprofile} />
                <Route path="/repos/:reponame" component={RepoInfo} />
                <Route path="/repos" component={Repositories} />
                <Route path="/gists/:fileId" component={GistFile} />
                <Route path="/gists" component={Gists} />
                <Redirect exact from="/" to="/user" />
                <Route component={NotFound} />
              </Switch>
            </div>
          </Router>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default App;
