import React from 'react';
import PropTypes from 'prop-types';


const NotFound = (props) => {
  const { location: { pathname } } = props;
  return (
    <div style={{ textAlign: 'center' }}>
      <h4>
        {pathname}
        is not a valid Path
      </h4>
    </div>
  );
};
NotFound.propTypes = {
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired,
  }),
};
NotFound.defaultProps = {
  location: {
    pathname: '',
  },
};
export default NotFound;
