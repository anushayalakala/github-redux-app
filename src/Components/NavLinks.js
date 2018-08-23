import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import store from '../Store/Index';

class NavLinks extends React.Component {
  setTabIndex(e) { // eslint-disable-line class-methods-use-this
    const tabIndex = e.props.value;
    sessionStorage.setItem('tabIndex', tabIndex);
    store.dispatch({
      type: 'ACTIVE_TAB',
      tabIndex,
    });
  }

  render() {
    const styles = {
      headline: {
        fontSize: 15,
        paddingTop: 16,
        marginBottom: 12,
        fontWeight: 200,
      },
    };
    const { tabIndex } = this.props;
    return (
      <Tabs value={tabIndex}>
        <Tab label="Userprofile" onActive={this.setTabIndex} value="0" containerElement={<Link to="/user" />} style={styles.headline} />
        <Tab label="Repositories" onActive={this.setTabIndex} value="1" containerElement={<Link to="/repos" />} style={styles.headline} />
        <Tab label="Gists" onActive={this.setTabIndex} value="2" containerElement={<Link to="/gists" />} style={styles.headline} />
      </Tabs>
    );
  }
}
const mapStateToProps = state => ({
  tabIndex: state.navLink.tabIndex,
});
NavLinks.propTypes = {
  tabIndex: PropTypes.string.isRequired,
};
export default connect(mapStateToProps)(NavLinks);
