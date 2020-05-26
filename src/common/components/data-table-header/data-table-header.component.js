import React from 'react';
import { InputGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './data-table-header.styles.scss';

const DataTableHeader = ({ onSearchChange, rightElement }) => {

  const handleChange = (e) => {
    const { value } = e.target;
    onSearchChange && onSearchChange(value);
  };

  return (
    <div className='data-table-header'>
      <InputGroup
        fill
        placeholder='Find an employee...'
        leftIcon={IconNames.SEARCH}
        rightElement={rightElement}
        onChange={handleChange}
      />
    </div>
  );
};

DataTableHeader.propTypes = {
  onSearchChange: PropTypes.func,
  rightElement: PropTypes.node
};

export default DataTableHeader;
