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

const EmployeeInfoForm = ({
  isUpdate,
  fields,
  errors,
  touched,
  handleCustomChange,
  handleBlur,
  disabled
}) => {
  const { department, jobTitle, hireDate, salary } = fields;
  return (
    <div className='employee-info'>
      <FormGroup>
        <div className='row-2'>
          <MomentDateInput
            className={`${errors?.hireDate && touched?.hireDate ? 'error' : ''}`}
            name='hireDate'
            placeholder='Hire Date'
            onChange={(e) => handleCustomChange({ target: { value: e, name: 'hireDate' } })}
            locale='en'
            value={hireDate}
            onBlur={handleBlur}
            fill
            disabled={disabled}
          />
          <ControlGroup fill>
            <DepartmentSelect
              className={`input-field ${errors?.department && touched?.department ? 'error' : ''}`}
              name='department'
              department={department}
              onItemSelect={(e) => handleCustomChange({ target: { value: e, name: 'department' } })}
              disabled={disabled}
            />
            {isUpdate && <HistoryButton disabled={disabled} />} 
          </ControlGroup>
        </div>
        <div className='row-2'>
          <ControlGroup fill>
            <NumericInput
              className={`input-field ${errors?.salary && touched?.salary ? 'error' : ''}`}
              name='salary'
              placeholder='Salary'
              fill
              allowNumericCharactersOnly
              leftIcon={IconNames.DOLLAR}
              min={0}
              onValueChange={(e) => (e && handleCustomChange({ target: { value: e, name: 'salary' } }))}
              onBlur={handleBlur}
              disabled={disabled}
              {...(salary ? { value: salary } : {})}
            />
            {isUpdate && <HistoryButton disabled={disabled} />} 
          </ControlGroup>
          <ControlGroup fill>
            <JobTitleSelect
              className={`input-field ${errors?.jobTitle && touched?.jobTitle ? 'error' : ''}`}
              name='jobTitle'
              jobTitle={jobTitle}
              department={department}
              onItemSelect={(e) => handleCustomChange({ target: { value: e, name: 'jobTitle' } })}
              disabled={disabled}
            />
            {isUpdate && <HistoryButton disabled={disabled} />} 
          </ControlGroup>
        </div>
      </FormGroup>
    </div>
  );
};

EmployeeInfoForm.propTypes = {
  isUpdate: PropTypes.bool.isRequired,
  fields: PropTypes.shape({
    department: PropTypes.shape(),
    jobTitle: PropTypes.shape(),
    hireDate: PropTypes.instanceOf(Date),
    salary: PropTypes.number
  }).isRequired,
  errors: PropTypes.shape(),
  touched: PropTypes.shape(),
  handleCustomChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default EmployeeInfoForm;
