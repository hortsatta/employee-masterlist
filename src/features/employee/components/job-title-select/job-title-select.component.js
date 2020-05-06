import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';
import Fuse from 'fuse.js';

import { convertMapToObj } from 'common/utils';
import { EmptyResult } from 'common/components';
import { selectAllJobTitles } from 'features/job-title/store';

const searchFilter = (keyword, jobTitles) => {
  if (!keyword) return jobTitles;

  const options = {
    includeScore: true,
    keys: [{ name: 'name', weight: 0.9 }]
  };

  // Create a new instance of Fuse, do search,
  // and return items only
  const fuse = new Fuse(jobTitles, options);
  const results = fuse.search(keyword);
  return results.map((result) => result.item);
};

const getJobTitleByDepartment = (department, jobTitles) => {
  if (!department || !jobTitles) return [];
  const { id } = department;
  return jobTitles[id.toLowerCase()];
};

const JobTitleSelect = ({ jobTitle, department, departmentJobTitles, ...otherProps }) => {
  const [keyword, setKeyword] = useState('');

  const handleQueryChange = (e) => (setKeyword(e));

  const jobTitleRender = (item, { handleClick }) => (
    <MenuItem
      className={jobTitle && (jobTitle.id === item.id && 'active')}
      key={`item-${item.id.toLowerCase()}`}
      onClick={handleClick}
      text={item.name}
    />
  );

  return (
    <Select
      fill
      items={searchFilter(
        keyword,
        getJobTitleByDepartment(department, departmentJobTitles)
      )}
      itemRenderer={jobTitleRender}
      query={keyword}
      onQueryChange={handleQueryChange}
      disabled={!department}
      noResults={<EmptyResult />}
      {...otherProps}
    >
      <Button
        fill
        icon={IconNames.DIAGRAM_TREE}
        rightIcon={IconNames.CARET_DOWN}
        text={jobTitle ? jobTitle.name : 'Job Title'}
      />
    </Select>
  );
};

JobTitleSelect.propTypes = {
  jobTitle: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  department: PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  }),
  departmentJobTitles: PropTypes.shape()
};

const mapStateToProps = createStructuredSelector({
  jobTitles: selectAllJobTitles
});

const mergeProps = ({ jobTitles }, _, ownProps) => ({
  departmentJobTitles: jobTitles ? convertMapToObj(jobTitles, 'departmentId') : {},
  ...ownProps
});

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(JobTitleSelect);
