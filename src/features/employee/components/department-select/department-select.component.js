import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';

import { EmptyResult } from 'common/components';
import { selectAllDepartments } from 'features/department/store';

const searchFilter = (keyword, departments) => {
  if (!keyword) return departments;

  const options = {
    includeScore: true,
    keys: [
      {
        name: 'name',
        weight: 0.7
      },
      {
        name: 'alias',
        weight: 0.3
      }
    ]
  };

  // Create a new instance of Fuse, do search,
  // and return items only
  const fuse = new Fuse(departments, options);
  const results = fuse.search(keyword);
  return results.map((result) => result.item);
};

const DepartmentSelect = ({ department, departments, ...otherProps }) => {
  const [keyword, setKeyword] = useState('');

  const handleQueryChange = (e) => (setKeyword(e));

  const departmentRender = (item, { handleClick }) => (
    <MenuItem
      className={department && (department.id === item.id && 'active')}
      key={`item-${item.id.toLowerCase()}`}
      onClick={handleClick}
      text={item.name}
    />
  );

  return (
    <Select
      fill
      items={departments ? searchFilter(keyword, departments) : []}
      itemRenderer={departmentRender}
      query={keyword}
      onQueryChange={handleQueryChange}
      noResults={<EmptyResult />}
      {...otherProps}
    >
      <Button
        fill
        icon={IconNames.LAYOUT_HIERARCHY}
        rightIcon={IconNames.CARET_DOWN}
        text={department ? department.name : 'Department'}
      />
    </Select>
  );
};

DepartmentSelect.propTypes = {
  department: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  departments: PropTypes.arrayOf(PropTypes.object)
};

const mapStateToProps = createStructuredSelector({
  departments: selectAllDepartments
});

export default connect(mapStateToProps)(DepartmentSelect);
