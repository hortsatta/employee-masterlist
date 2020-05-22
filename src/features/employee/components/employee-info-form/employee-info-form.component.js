import React, { useState } from 'react';
import { FormGroup, ControlGroup, NumericInput } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './employee-info-form.styles.scss';
import { MomentDateInput, IconButton } from 'common/components';
import DepartmentSelect from '../department-select/department-select.component';
import JobTitleSelect from '../job-title-select/job-title-select.component';
import EmployeeHistoryDialog from '../employee-history-dialog/employee-history-dialog.component';

const HistoryButton = (props) => (
  <IconButton content='View history' icon={IconNames.HISTORY} {...props} />
);

const EmployeeInfoForm = ({
  isUpdate,
  fields,
  salaryHistory,
  departmentHistory,
  jobTitleHistory,
  errors,
  touched,
  handleCustomChange,
  handleBlur,
  disabled
}) => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [currentHistory, setCurrentHistory] = useState('salary');
  const { department, jobTitle, hireDate, salary } = fields;

  const historyList = {
    salary: {
      name: 'salary',
      title: 'Employee Salary History',
      list: salaryHistory
    },
    department: {
      name: 'department',
      title: 'Employee Department History',
      list: departmentHistory
    },
    jobTitle: {
      name: 'jobTitle',
      title: 'Employee Job Title History',
      list: jobTitleHistory
    }
  };

  const handleDialogClose = () => setIsDialogOpen(false);

  const showHistoryDialog = (history) => {
    setCurrentHistory(history);
    setIsDialogOpen(true);
  };

  return (
    <div className='employee-info'>
      <FormGroup>
        <div className='row-2'>
          <MomentDateInput
            className={`input-field ${errors?.hireDate && touched?.hireDate ? 'error' : ''}`}
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
              onItemSelect={(e) => { handleCustomChange({ target: { value: e, name: 'department' } }); }}
              disabled={disabled}
            />
            {isUpdate && <HistoryButton disabled={disabled} onClick={() => showHistoryDialog('department')} />}
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
            {isUpdate && <HistoryButton disabled={disabled} onClick={() => showHistoryDialog('salary')} />}
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
            {isUpdate && <HistoryButton disabled={disabled} onClick={() => showHistoryDialog('jobTitle')} />}
          </ControlGroup>
        </div>
      </FormGroup>
      <EmployeeHistoryDialog
        icon={IconNames.HISTORY}
        isOpen={isDialogOpen}
        onClose={handleDialogClose}
        handleClose={handleDialogClose}
        {...historyList[currentHistory]}
      />
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
  salaryHistory: PropTypes.arrayOf(PropTypes.object),
  errors: PropTypes.shape(),
  touched: PropTypes.shape(),
  handleCustomChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default EmployeeInfoForm;
