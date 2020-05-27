import React from 'react';
import PropTypes from 'prop-types';

import './employee-info-view.styles.scss';
import { TextField } from 'common/components';

const EmployeeInfoView = ({
  isLoading,
  departments,
  jobTitles,
  employee = {}
}) => {
  const { salary, hireDate, department, jobTitle } = employee;

  const getDepartment = () => departments[department?.departmentId.toLowerCase()]?.alias;
  const getJobTitle = () => jobTitles[jobTitle?.titleId.toLowerCase()]?.name;

  return (
    <div className='employee-info-view'>
      <TextField loading={isLoading} label='Department'>{getDepartment()}</TextField>
      <TextField loading={isLoading} label='Job Title'>{getJobTitle()}</TextField>
      <TextField loading={isLoading} className='row-2' label='Salary'>
        {salary?.salary}
      </TextField>
      <TextField loading={isLoading} className='row-2' label='Date Hired'>
        {hireDate?.date}
      </TextField>
    </div>
  );
};

EmployeeInfoView.propTypes = {
  isLoading: PropTypes.bool,
  employee: PropTypes.shape(),
  departments: PropTypes.shape(),
  jobTitles: PropTypes.shape()
};

export default EmployeeInfoView;
