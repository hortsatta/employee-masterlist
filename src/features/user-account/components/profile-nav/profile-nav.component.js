import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { H4, Spinner } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import './profile-nav.styles.scss';
import employeePlaceholder from 'assets/employee-placeholder.png';
import employeePlaceholder2 from 'assets/employee-placeholder-2.png';
import {
  toggleSignInDialog,
  selectIsCurrentEmployeeLoading,
  selectCurrentUser,
  selectCurrentEmployee,
  fetchCurrentEmployeeStart,
  signOutStart,
  selectIsLoading
} from 'features/auth/store';
import { selectIsLoading as selectIsUserAccountLoading, selectAllUserRolesObj } from 'features/user-account/store';
import { selectAllJobTitlesObj } from 'features/job-title/store';

const genderPictureSrc = {
  female: employeePlaceholder,
  male: employeePlaceholder2
};

const EmployeeProfile = ({ user, employee, userRoles, jobTitles, signOut }) => {
  const { userRole } = user;
  const { personalInfo: { fullName, gender }, jobTitle: { titleId } } = employee;
  const jobTitle = jobTitles[titleId.toLowerCase()]?.name || '—';
  const role = userRoles[userRole]?.name || '—';
  return (
    <>
      <div className='profile-picture'>
        <img src={genderPictureSrc[gender.toLowerCase()]} alt='employee-profile' />
      </div>
      <div className='profile-content'>
        <H4 className='bp3-heading'>{fullName}</H4>
        <span className='bp3-text-small'>{jobTitle}</span>
        <div>
          <span className='bp3-text-small'>{role}</span>
          <span className='bp3-text-small logout-link'>
            <small className='custom-link' type='button' onClick={() => signOut()}>—Sign out</small>
          </span>
        </div>
      </div>
    </>
  );
};

const ProfilePlaceholder = ({toggleSignInDialogDispatch, isExpanded, onClick }) => (
  <>
    <div className='profile-picture'>
      <img src={employeePlaceholder} alt='employee-profile' />
    </div>
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
  </>
);

const ProfileNav = ({
  isExpanded,
  onClick,
  isAuthLoading,
  isCurrentEmployeeLoading,
  isUserAccountLoading,
  currentUser,
  currentEmployee,
  userRoles,
  jobTitles,
  toggleSignInDialogDispatch,
  fetchCurrentEmployeeStartDispatch,
  signOut
}) => {
  useEffect(() => {
    if (currentUser && !currentEmployee) {
      if (!currentUser.employeeId) { return; }
      fetchCurrentEmployeeStartDispatch(currentUser.employeeId);
    }
  }, [currentUser, currentEmployee, fetchCurrentEmployeeStartDispatch]);

  const profileRenderer = () => (
    currentEmployee
      ? (
        <EmployeeProfile
          user={currentUser}
          employee={currentEmployee}
          userRoles={userRoles}
          jobTitles={jobTitles}
          signOut={signOut}
        />
      ) : (
        <ProfilePlaceholder
          toggleSignInDialogDispatch={toggleSignInDialogDispatch}
          isExpanded={isExpanded}
          onClick={onClick}
        />
      )
  );

  return (
    <div
      className={`profile-nav ${isExpanded ? 'expand' : ''} ${!currentEmployee ? 'placeholder' : ''}`}
      onClick={isExpanded ? null : onClick}
      onKeyUp={isExpanded ? null : onClick}
      role='button'
      tabIndex='-1'
    >
      {
        isAuthLoading || isCurrentEmployeeLoading || isUserAccountLoading
          ? (
            <div className='profile-spinner'>
              <Spinner />
            </div>
          )
          : profileRenderer()
      }
    </div>
  );
};

ProfileNav.propTypes = {
  isExpanded: PropTypes.bool.isRequired,
  onClick: PropTypes.func,
  isAuthLoading:  PropTypes.bool,
  isCurrentEmployeeLoading: PropTypes.bool,
  isUserAccountLoading: PropTypes.bool,
  isJobTitleLoading: PropTypes.bool,
  currentUser: PropTypes.shape(),
  currentEmployee: PropTypes.shape(),
  userRoles: PropTypes.shape(),
  jobTitles: PropTypes.shape(),
  toggleSignInDialogDispatch: PropTypes.func.isRequired,
  fetchCurrentEmployeeStartDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isAuthLoading: selectIsLoading,
  isCurrentEmployeeLoading: selectIsCurrentEmployeeLoading,
  isUserAccountLoading: selectIsUserAccountLoading,
  currentUser: selectCurrentUser,
  currentEmployee: selectCurrentEmployee,
  userRoles: selectAllUserRolesObj,
  jobTitles: selectAllJobTitlesObj
});

const mapDispatchToProps = (dispatch) => ({
  toggleSignInDialogDispatch: () => dispatch(toggleSignInDialog()),
  fetchCurrentEmployeeStartDispatch: (id) => dispatch(fetchCurrentEmployeeStart(id)),
  signOut: () => dispatch(signOutStart())
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ProfileNav);
