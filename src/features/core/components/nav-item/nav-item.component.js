import React from 'react';
import { Link, withRouter } from 'react-router-dom';
import { Button, Alignment } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import styles from 'common/styles/styles.scss';

const NavItem = ({ className, icon, to, parentUrl, location, staticContext, ...otherProps }) => {
  const isUrlMatch = () => {
    const { pathname } = location;
    // If component is parent link, check if parent url is present in current url
    // by splitting parentUrl and pathnames into arrays and checking each if it matches
    if (parentUrl) {
      const parentUrls = parentUrl.split('/').filter((url) => !!url);
      const pathnames = pathname.split('/').filter((path) => !!path);
      const stringMatches = parentUrls.filter((url) => pathnames.includes(url));
      return parentUrls.length <= stringMatches.length;
    }
    // Else match it exactly
    return to ? (to === pathname) : false;
  };

  const NavButton = () => (
    <Button
      className={`nav-item ${className}`}
      style={{ width: styles.expandsideNavWidth }}
      large
      minimal
      fill
      active={isUrlMatch()}
      alignText={Alignment.LEFT}
      icon={icon}
      {...otherProps}
    />
  );

  return (
    to
      ? <Link to={to}><NavButton /></Link>
      : <NavButton />
  );
};

NavItem.propTypes = {
  className: PropTypes.string,
  icon: PropTypes.string,
  to: PropTypes.string,
  parentUrl: PropTypes.string,
  location: PropTypes.shape({
    pathname: PropTypes.string.isRequired
  }).isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  staticContext: PropTypes.any
};

export default withRouter(NavItem);
