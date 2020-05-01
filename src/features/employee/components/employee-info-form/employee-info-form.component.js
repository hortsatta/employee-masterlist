import React from 'react';
import { FormGroup } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import { MomentDateInput } from 'common/components';
import DepartmentSelect from '../department-select/department-select.component';
import JobTitleSelect from '../job-title-select/job-title-select.component';

const EmployeeInfoForm = ({ fields, onChange }) => {
  const { department, jobTitle, hireDate } = fields;
  return (
    <form className='employee-info'>
      <FormGroup>
        <DepartmentSelect
          className='department-select'
          department={department}
          onItemSelect={(e) => onChange({ target: { value: e, name: 'department' } })}
        />
        <JobTitleSelect
          jobTitle={jobTitle}
          department={department}
          onItemSelect={(e) => onChange({ target: { value: e, name: 'jobTitle' } })}
        />
        <MomentDateInput
          placeholder='Hire Date'
          onChange={(e) => onChange({ target: { value: e, name: 'hireDate' } })}
          locale='en'
          value={hireDate}
          fill
        />
      </FormGroup>
    </form>
  );
};

EmployeeInfoForm.propTypes = {
  fields: PropTypes.shape({
    department: PropTypes.shape(),
    jobTitle: PropTypes.shape(),
    hireDate: PropTypes.instanceOf(Date)
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default EmployeeInfoForm;
