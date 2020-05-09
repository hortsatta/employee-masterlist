/* eslint-disable react/no-array-index-key */
import React, { Suspense } from 'react';
import { Switch } from 'react-router-dom';
import { Intent } from '@blueprintjs/core';

import { menuLinks } from 'config/system.config';
import { LoadingBar } from 'common/components';
import { SignInDialog } from 'features/auth/containers';
import RootRoutes from '../../root-routes';
import {
  Header,
  NavGroup,
  NavItem,
  NotificationPopup,
  MainSection,
  SideNavbar
} from '../../components';

// const tempFunc = async () => {
//   await signUpUser({
//     email: 'hortsatta@gmail.com',
//     password: 'qwerty990',
//     employeeId: 0,
//     userRoleId: 2
//   });
//   alert('Done');
// };

const RootPage = () => {
  // Create elements with menu links from config file
  const navItems = menuLinks.map(({ icon, text, to, children }, i) => {
    // Create map key
    const key = `navitem-${i}`;
    // If item has text of spacer, return span element (for vertical spacing)
    if (text.toLowerCase() === 'spacer') {
      return (<span key={key} className='spacer' />);
    }
    // Else return link or group link
    return !children
      ? (<NavItem key={key} icon={icon} text={text} to={to} />)
      : (
        <NavGroup key={key} icon={icon} text={text} url={to}>
          {
            Object.values(children).map((child, childKey) => (
              <NavItem key={`sub-navitem-${childKey}`} icon={child.icon} text={child.text} to={child.to ? `${to}${child.to}` : to} />
            ))
          }
        </NavGroup>
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

export default RootPage;
