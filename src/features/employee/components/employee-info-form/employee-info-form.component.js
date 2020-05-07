import React from 'react';
import { FormGroup, ControlGroup, NumericInput } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './employee-info-form.styles.scss';
import { MomentDateInput, IconButton } from 'common/components';
import DepartmentSelect from '../department-select/department-select.component';
import JobTitleSelect from '../job-title-select/job-title-select.component';

const HistoryButton = (props) => (
  <IconButton content='View History' icon={IconNames.HISTORY} {...props} />
);

const EmployeeInfoForm = ({ fields, onChange }) => {
  const { department, jobTitle, hireDate, salary } = fields;
  return (
    <div className='employee-info'>
      <FormGroup>
        <div className='row-2'>
          <MomentDateInput
            placeholder='Hire Date'
            onChange={(e) => onChange({ target: { value: e, name: 'hireDate' } })}
            locale='en'
            value={hireDate}
            fill
          />
          <ControlGroup fill>
            <DepartmentSelect
              className='department-select'
              department={department}
              onItemSelect={(e) => onChange({ target: { value: e, name: 'department' } })}
            />
            <HistoryButton />
          </ControlGroup>
        </div>
        <div className='row-2'>
          <ControlGroup fill>
            <NumericInput
              placeholder='Salary'
              fill
              allowNumericCharactersOnly
              leftIcon={IconNames.DOLLAR}
              min={0}
              onValueChange={(e) => (!e && onChange({ target: { value: e, name: 'salary' } }))}
              {...(salary ? { value: salary } : {})}
            />
            <HistoryButton />
          </ControlGroup>
          <ControlGroup fill>
            <JobTitleSelect
              jobTitle={jobTitle}
              department={department}
              onItemSelect={(e) => onChange({ target: { value: e, name: 'jobTitle' } })}
            />
            <HistoryButton />
          </ControlGroup>
        </div>
      </FormGroup>
    </div>
  );
};

EmployeeInfoForm.propTypes = {
  fields: PropTypes.shape({
    department: PropTypes.shape(),
    jobTitle: PropTypes.shape(),
    hireDate: PropTypes.instanceOf(Date),
    salary: PropTypes.number
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default EmployeeInfoForm;
