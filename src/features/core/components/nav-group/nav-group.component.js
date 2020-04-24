import React, { useState } from 'react';
import { ButtonGroup } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import './nav-group.styles.scss';
import NavItem from '../nav-item/nav-item.component';

const NavGroup = ({ icon, text, url, children }) => {
  // Control item visibility inside component
  const [hidden, setHidden] = useState(true);

  return (
    <div className={`nav-group ${hidden ? 'hidden' : ''}`}>
      <NavItem
        className={!hidden ? 'open' : ''}
        icon={icon}
        text={text}
        parentUrl={url && url !== '/' ? url : null}
        onClick={() => setHidden((prevState) => !prevState)}
      />
      <ButtonGroup
        className={`nav-group-collapse ${hidden ? 'hidden' : ''}`}
        large
        vertical
      >
        {children}
      </ButtonGroup>
    </div>
  );
};

NavGroup.propTypes = {
  icon: PropTypes.string,
  text: PropTypes.string,
  url: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
};

export default NavGroup;
