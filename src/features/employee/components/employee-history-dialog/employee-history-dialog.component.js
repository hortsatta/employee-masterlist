import React from 'react';
import { createStructuredSelector } from 'reselect';
import { Button, Classes } from '@blueprintjs/core';

import './employee-history-dialog.styles.scss';
import { WithDialog } from 'common/containers';
import { selectDarkMode } from 'features/core/store';
import { selectAllDepartmentsObj } from 'features/department/store';
import { selectAllJobTitlesObj } from 'features/job-title/store';
import { connect } from 'react-redux';

const EmployeeSalaryHistory = ({ list }) => (
  <div className='employee-history employee-salary-history'>
    <p>Showing employee salary history by date in descending order.</p>
    <div className='history-content'>
      {
        list.map(({ dateFrom, dateTo, salary }, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`salary-${i}`}>
            <span>
              {dateFrom}
              <small>to</small>
              {dateTo || '—'}
            </span>
            <span>{`₱ ${salary}`}</span>
          </div>
        ))
      }
    </div>
  </div>
);

const EmployeeDepartmentHistory = ({ list, departments }) => (
  <div className='employee-history employee-department-history'>
    <p>Showing departments in which the employee was or is currently assigned to.</p>
    <div className='history-content'>
      {
        list.map(({ departmentId, dateFrom, dateTo }, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`salary-${i}`}>
            <span>
              {dateFrom}
              <small>to</small>
              {dateTo || '—'}
            </span>
            <span>{departments[departmentId.toLowerCase()].alias}</span>
          </div>
        ))
      }
    </div>
  </div>
);

const EmployeeJobTitleHistory = ({ list, jobTitles }) => (
  <div className='employee-history employee-jobtitle-history'>
    <p>Showing the employee&apos;s position within the company from the date he/she was hired.</p>
    <div className='history-content'>
      {
        list.map(({ titleId, dateFrom, dateTo }, i) => (
          // eslint-disable-next-line react/no-array-index-key
          <div key={`salary-${i}`}>
            <span>
              {dateFrom}
              <small>to</small>
              {dateTo || '—'}
            </span>
            <span>{jobTitles[titleId.toLowerCase()].name}</span>
          </div>
        ))
      }
    </div>
  </div>
);

const EmployeeHistoryDialog = ({ name, handleClose, ...otherProps }) => (
  <>
    <div className={Classes.DIALOG_BODY}>
      {{
        salary: <EmployeeSalaryHistory {...otherProps} />,
        department: <EmployeeDepartmentHistory {...otherProps} />,
        jobTitle: <EmployeeJobTitleHistory {...otherProps} />
      }[name]}
    </div>
    <div className={Classes.DIALOG_FOOTER}>
      <div className={Classes.DIALOG_FOOTER_ACTIONS}>
        <Button
          className={Classes.DIALOG_CLOSE_BUTTON}
          onClick={handleClose}
          text='Close'
        />
      </div>
    </div>
  </>
);

const mapStateToProps = createStructuredSelector({
  darkMode: selectDarkMode,
  departments: selectAllDepartmentsObj,
  jobTitles: selectAllJobTitlesObj
});

const mergeProps = (stateProps, _, ownProps) => ({
  className: `${stateProps.darkMode ? 'bp3-dark' : ''} ${ownProps.className || ''}`,
  ...stateProps,
  ...ownProps
});

export default connect(
  mapStateToProps,
  null,
  mergeProps
)(WithDialog(EmployeeHistoryDialog));
