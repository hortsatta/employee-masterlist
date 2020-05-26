/* eslint-disable react/no-array-index-key */
import React, { useEffect, Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Intent } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import { menuLinks } from 'config/system.config';
import { CanActivate } from 'common/guards';
import { LoadingBar } from 'common/components';
import { SignInDialog } from 'features/auth/containers';
import { checkSignInSession, selectCurrentUser } from 'features/auth/store';
import { fetchAllUserRolesStart } from 'features/user-account/store';
import { fetchAllDepartmentsStart, selectAllDepartments } from 'features/department/store';
import { fetchJobTitlesByDepartmentIdsStart } from 'features/job-title/store';
import RootRoutes from '../../root-routes';
import {
  Header,
  NavGroup,
  NavItem,
  NotificationPopup,
  MainSection,
  SideNavbar
} from '../../components';

const navItemRenderer = ({ currentUser, key, to, rules, children, ...otherProps }) => (
  !children
    ? (<NavItem key={key} to={to} {...otherProps} />)
    : (
      <NavGroup key={key} url={to} {...otherProps}>
        {
          Object.values(children).map((
            {
              to: childTo,
              rules: childRules,
              ...otherChildProps
            },
            childKey
          ) => (
            rules && rules.length
              ? (
                <CanActivate
                  key={`sub-navitem-${childKey}`}
                  userRole={currentUser?.userRole}
                  actions={rules}
                  yes={() => (<NavItem key={`sub-navitem-${childKey}`} to={childTo ? `${to}${childTo}` : to} {...otherChildProps} />)}
                />
              ) : <NavItem key={`sub-navitem-${childKey}`} to={childTo ? `${to}${childTo}` : to} {...otherChildProps} />
          ))
        }
      </NavGroup>
    )
);

const RootPage = ({
  currentUser,
  departments,
  checkSignInSessionDispatch,
  fetchAllUserRolesStartDispatch,
  fetchAllDepartmentsStartDispatch,
  fetchJobTitlesByDepartmentIdsStartDispatch
}) => {
  useEffect(() => {
    checkSignInSessionDispatch();
  }, [checkSignInSessionDispatch]);

  useEffect(() => {
    fetchAllUserRolesStartDispatch();
  }, [fetchAllUserRolesStartDispatch]);

  useEffect(() => {
    fetchAllDepartmentsStartDispatch();
  }, [fetchAllDepartmentsStartDispatch]);

  useEffect(() => {
    if (!departments) return;
    const ids = departments.map((department) => department.id);
    fetchJobTitlesByDepartmentIdsStartDispatch(ids);
  }, [departments, fetchJobTitlesByDepartmentIdsStartDispatch]);

  // Create elements with menu links from config file
  const navItems = menuLinks.map(({ icon, text, to, rules, children }, i) => {
    // Create map key
    const key = `navitem-${i}`;
    // If item has text of spacer, return span element (for vertical spacing)
    if (text.toLowerCase() === 'spacer') {
      return (<span key={key} className='spacer' />);
    }
    // Else return link or group link
    return (
      rules && rules.length
        ? (
          <CanActivate
            key={key}
            userRole={currentUser?.userRole}
            actions={rules}
            yes={() => navItemRenderer({ currentUser, key, text, to, icon, rules, children })}
          />
        ) : navItemRenderer({ currentUser, key, text, to, icon, rules, children })
    );
  });

  return (
    <div className='root-content'>
      <SideNavbar>
        {navItems}
      </SideNavbar>
      <Header />
      <MainSection>
        <Switch>
          <Suspense fallback={<LoadingBar intent={Intent.NONE} />}>
            <RootRoutes />
          </Suspense>
        </Switch>
      </MainSection>
      <NotificationPopup />
      <SignInDialog />
    </div>
  );
};

RootPage.propTypes = {
  currentUser: PropTypes.shape(),
  departments: PropTypes.arrayOf(PropTypes.object),
  checkSignInSessionDispatch: PropTypes.func.isRequired,
  fetchAllUserRolesStartDispatch: PropTypes.func.isRequired,
  fetchAllDepartmentsStartDispatch: PropTypes.func.isRequired,
  fetchJobTitlesByDepartmentIdsStartDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  departments: selectAllDepartments
});

const mapDispatchToProps = (dispatch) => ({
  checkSignInSessionDispatch: () => dispatch(checkSignInSession()),
  fetchAllUserRolesStartDispatch: () => dispatch(fetchAllUserRolesStart(true)),
  fetchAllDepartmentsStartDispatch: () => dispatch(fetchAllDepartmentsStart()),
  fetchJobTitlesByDepartmentIdsStartDispatch: (ids) => (
    dispatch(fetchJobTitlesByDepartmentIdsStart(ids)))
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RootPage);
