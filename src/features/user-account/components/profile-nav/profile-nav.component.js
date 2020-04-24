import React from 'react';
import { connect } from 'react-redux';
import { H4, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './profile-nav.styles.scss';
import { toggleSignInDialog } from 'features/auth/store';

const ProfileNav = ({ isExpanded, onClick, toggleSignInDialogDispatch }) => (
  <div
    className={`profile-nav ${isExpanded ? 'expand' : ''}`}
    onClick={isExpanded ? null : onClick}
    onKeyUp={isExpanded ? null : onClick}
    role='button'
    tabIndex='-1'
  >
    <Icon icon={IconNames.USER} iconSize={Icon.SIZE_LARGE} />
    <div className='profile-content'>
      <H4 className='bp3-heading'>You are not signed in</H4>
      <span className='bp3-text-small'>
        <small
          className='custom-link'
          onClick={toggleSignInDialogDispatch}
          onKeyUp={isExpanded ? null : onClick}
          role='button'
          tabIndex='0'
        >
          Sign in
        </small>
        to gain full access
      </span>
    </div>
  </div>
);

ProfileNav.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  toggleSignInDialogDispatch: PropTypes.func.isRequired,
  onClick: PropTypes.func
};

const mapDispatchToState = (dispatch) => ({
  toggleSignInDialogDispatch: () => dispatch(toggleSignInDialog())
});

export default connect(
  null,
  mapDispatchToState
)(ProfileNav);
