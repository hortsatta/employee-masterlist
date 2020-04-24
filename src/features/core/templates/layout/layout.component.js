/* eslint-disable react/no-array-index-key */
import React from 'react';
import { Switch, Route } from 'react-router-dom';

import { menuLinks } from 'config/system.config';
import { SignInDialog } from 'features/auth/containers';
import routes from '../../root.routes';
import { SideNavbar, NavGroup, NavItem, MainSection } from '../../components';

const Layout = () => {
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
      <MainSection>
        <Switch>
          {
            Object.values(routes).map((route, i) => (
              <Route key={`route-${i}`} {...route} />
            ))
          }
        </Switch>
      </MainSection>
      <SignInDialog />
    </div>
  );
};

export default Layout;
