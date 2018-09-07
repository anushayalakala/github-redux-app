import React from 'react';
import { Tabs, Tab } from 'material-ui/Tabs';
import { Link, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';

class NavLinks extends React.Component {
  getTabindex() {
    const { location: { pathname } } = this.props;
    let tabIndex = '0';
    switch (true) {
      case /user\/*/.test(pathname): {
        tabIndex = '0';
        break;
      }
      case /repos\/*/.test(pathname): {
        tabIndex = '1';
        break;
      }
      case /gists\/*/.test(pathname): {
        tabIndex = '2';
        break;
      }
      default:
        tabIndex = '0';
    }
    return tabIndex;
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
    return (
      <Tabs value={this.getTabindex()}>
        <Tab label="Userprofile" value="0" containerElement={<Link to="/user" />} style={styles.headline} />
        <Tab label="Repositories" value="1" containerElement={<Link to="/repos" />} style={styles.headline} />
        <Tab label="Gists" value="2" containerElement={<Link to="/gists" />} style={styles.headline} />
      </Tabs>
    );
  }
}
NavLinks.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};
NavLinks.defaultProps = {
  location: {
    pathname: '',
  },
};
const RoutedNavLinks = withRouter(NavLinks);
export default RoutedNavLinks;
