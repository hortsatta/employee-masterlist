import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Drawer, Position, Spinner } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import styles from 'common/styles/styles.scss';
import './side-navbar.styles.scss';
import { selectIsLoading } from 'features/auth/store';
import { ProfileNav } from 'features/user-account/components';
import { selectExpandSideNav, toggleSideNav } from '../../store';
import NavItem from '../nav-item/nav-item.component';

const SideNavbar = ({ expandSideNav, isLoading, toggleSideNavDispatch, children }) => (
  <div className='side-navbar-wrapper'>
    <Drawer
      className={`bp3-dark side-navbar ${expandSideNav ? 'expand' : ''}`}
      isOpen
      hasBackdrop={false}
      canEscapeKeyClose={false}
      canOutsideClickClose={false}
      enforceFocus={false}
      usePortal={false}
      lazy={false}
      size={expandSideNav ? styles.expandsideNavWidth : styles.sideNavWidth}
      position={Position.LEFT}
    >
      <ProfileNav isExpanded={expandSideNav} onClick={toggleSideNavDispatch} />
      <div className='main-menu'>
        <NavItem
          icon={IconNames.MENU}
          text='Menu'
          onClick={toggleSideNavDispatch}
        />
        {
          !isLoading
            ? children
            : (
              <div className='menu-spinner'>
                <Spinner />
              </div>
            )
        }
      </div>
    </Drawer>
  </div>
);

SideNavbar.propTypes = {
  expandSideNav: PropTypes.bool.isRequired,
  toggleSideNavDispatch: PropTypes.func.isRequired,
  isLoading: PropTypes.bool,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

const mapStateToProps = createStructuredSelector({
  expandSideNav: selectExpandSideNav,
  isLoading: selectIsLoading
});

const mapDispatchToProps = (dispatch) => ({
  toggleSideNavDispatch: () => dispatch(toggleSideNav())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SideNavbar);
