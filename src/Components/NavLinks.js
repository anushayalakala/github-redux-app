import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router-dom';
import store from '../Store/Index';
import { connect } from 'react-redux';

class NavLinks extends React.Component {

  setTabIndex(e){
    const tabIndex = e.props.value;
    sessionStorage.setItem('tabIndex', tabIndex);
    store.dispatch({
        type : "ACTIVE_TAB",
        tabIndex
     });
  }
  render() {
    console.log("store checking " + store.getState());
    const styles =
      {
        headline: {
          fontSize: 15,
          paddingTop: 16,
          marginBottom: 12,
          fontWeight: 200,
        }
      };
    return (
      <Tabs value={this.props.tabIndex}>
        <Tab label="Userprofile" onActive={this.setTabIndex} value="0" containerElement={<Link to='/user' />} style={styles.headline}></Tab>
        <Tab label="Repositories" onActive={this.setTabIndex} value="1" containerElement={<Link to='/repos' />} style={styles.headline}></Tab>
        <Tab label="Gists" onActive={this.setTabIndex} value="2" containerElement={<Link to='/gists' />} style={styles.headline}></Tab>
      </Tabs>
    );
  }
}
const mapStateToProps = state =>({
  tabIndex : state.navLink.tabIndex
});
export default connect(mapStateToProps)(NavLinks);