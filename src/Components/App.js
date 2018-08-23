import React from 'react';
import '../Styles/App.css';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import NavLinks from './NavLinks';

const App = () => (
  <MuiThemeProvider>
    <div className="App">
      <NavLinks />
    </div>
  </MuiThemeProvider>
);

export default App;
