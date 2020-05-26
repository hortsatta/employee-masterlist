import React, { useEffect, useCallback, useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, Callout, H4, H5, Intent, FormGroup, ButtonGroup, Divider, Popover } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import moment from 'moment';
import PropTypes from 'prop-types';

import './upsert-employee-form.styles.scss';
import { pageKeys } from 'config/system.config';
import { navigateToEmployeeList } from 'common/services';
import { usePrevious } from 'common/custom-hooks';
import { generateJimp } from 'common/utils';
import { setNotificationError, setNotificationSuccess } from 'features/core/store';
import { selectAllDepartmentsObj } from 'features/department/store';
import { selectAllJobTitlesObj } from 'features/job-title/store';
import { createEmployeeDocument, updateEmployeeDocument } from '../../services';
import { fetchInitialPageEmployeesStart } from '../../store';
import EmployeeInfoForm from '../employee-info-form/employee-info-form.component';
import PersonalInfoForm from '../personal-info-form/personal-info-form.component';

const PopoverConfirm = ({ handleCancel, handleSubmit }) => (
  <div className='popover popover-confirm'>
    <H5>Confirm employee creation</H5>
    <div className='popover-content'>
      <p>
        Employee doesn&apos;t have a picture.
        <br />
        Continue anyway?
      </p>
    </div>
    <div className='controls'>
      <Button type='button' text='Cancel' onClick={handleCancel} />
      <Button
        type='button'
        text='Yes'
        intent={Intent.SUCCESS}
        onClick={handleSubmit}
      />
    </div>
  </div>
);

const UpsertEmployeeForm = ({
  isProcessing,
  doProcess,
  employee,
  departments,
  jobTitles,
  isUpdate = false,
  setNotificationSuccessDispatch,
  setNotificationErrorDispatch,
  fetchInitialPageEmployeesStartDispatch,
}) => {
  const [isLoading, setIsLoading] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [resetAnimation, setResetAnimation] = useState('');

  const executeFinalStep = () => {
    fetchInitialPageEmployeesStartDispatch(true);
    setTimeout(() => navigateToEmployeeList(), 500);
  };

  const formik = useFormik({
    // Form fields validation using Yup
    validationSchema: Yup.object().shape({
      firstName: Yup.string().min(2).required(),
      lastName: Yup.string().min(2).required(),
      middleInitial: Yup.string().max(1).required(),
      gender: Yup.string().required(),
      birthDate: Yup.date().required(),
      currentAddress: Yup.string().min(2).required(),
      homeAddress: Yup.string().required(),
      phones: Yup.array().of(Yup.string().required()).required(),
      emails: Yup.array().of(Yup.string().email().required()).required(),
      department: Yup.object().required(),
      jobTitle: Yup.object().required(),
      hireDate: Yup.date().required(),
      salary: Yup.number().required(),
      picture: Yup.string().nullable(),
      imageURL: Yup.string().url()
    }),
    initialValues: {
      // Personal info form
      firstName: '',
      lastName: '',
      middleInitial: '',
      gender: '',
      birthDate: null,
      currentAddress: '',
      homeAddress: '',
      phones: [''],
      emails: [''],
      // Employee info form
      department: null,
      jobTitle: null,
      hireDate: null,
      salary: null,
      picture: null,
      imageURL: ''
    },
    // Submit function, only fires when all form values are valid
    onSubmit: async (values) => {
      if (!values.picture && !showPopover) {
        setShowPopover(true);
        return;
      }

      doProcess();
      setShowPopover(false);
      setIsLoading(true);

      try {
        isUpdate
          ? await updateEmployeeDocument({ id: employee.id, ...values }, employee)
          : await createEmployeeDocument(values);
        setIsLoading(false);
        setNotificationSuccessDispatch(`Employee ${values.firstName} successfully enrolled.`);
        executeFinalStep();
      } catch (errorMessage) {
        setIsLoading(false);
        setNotificationErrorDispatch(errorMessage);
      }
    }
  });

  const { values: { department }, setValues, setFieldValue } = formik;
  // Used to store previous department value for checking select component
  const prevDepartment = usePrevious(department);

  const updateEmployeeFields = useCallback(async () => {
    if (!employee) { return; }

    setIsLoading(true);

    const {
      personalInfo,
      department: currentDepartment,
      jobTitle,
      hireDate,
      salary
    } = employee;

    const {
      firstName,
      lastName,
      middleInitial,
      birthDate,
      gender,
      currentAddress,
      homeAddress,
      phones,
      emails,
      picture
    } = personalInfo;

    const employeePicture = picture ? {
      ...(await generateJimp(picture)),
      isUntouched: true
    } : null;

    setValues({
      firstName,
      lastName,
      middleInitial,
      birthDate: moment(birthDate.date, 'MMM DD, YYYY').toDate(),
      gender,
      currentAddress,
      homeAddress,
      phones,
      emails,
      department: departments[currentDepartment.departmentId.toLowerCase()],
      jobTitle: jobTitles[jobTitle.titleId.toLowerCase()],
      hireDate: moment(hireDate.date, 'MMM DD, YYYY').toDate(),
      salary: salary.salary,
      picture: employeePicture,
      imageURL: picture || ''
    });

    setIsLoading(false);
  }, [departments, jobTitles, employee, setValues]);

  useEffect(() => {
    (async () => {
      if (!isUpdate) { return; }
      await updateEmployeeFields();
    })();
  }, [isUpdate, updateEmployeeFields]);

  // If selected department has changed in select component then set jobTitle to null
  useEffect(() => {
    if (!prevDepartment || !department) return;
    if (prevDepartment.id === department.id) return;
    setFieldValue('jobTitle', null, false);
  }, [prevDepartment, department, setFieldValue]);

  // Add new field to Input Groups component
  const addInputGroupsEl = (fieldName) => {
    setFieldValue(fieldName, [...formik.values[fieldName], '']);
  };

  // Remove a specific field from Input Groups component
  const removeInputGroupsEl = (i, fieldName) => {
    setFieldValue(fieldName, formik.values[fieldName].filter((_, idx) => idx !== i));
  };

  // Use if formik handleChange function fails
  const handleCustomChange = (e) => {
    const { name, value } = e.target;
    setFieldValue(name, value, true);
  };

  // Handle value change in Input Groups fields
  const handleInputGroupsChange = (e, i, fieldName) => {
    const list = formik.values[fieldName];
    list[i] = e.target.value;
    setFieldValue(fieldName, [...list]);
  };

  const handleReset = async () => {
    isUpdate ? await updateEmployeeFields() : formik.resetForm();
    // Add shake animation when resetting fields
    setResetAnimation('');
    const resetTimeout = setTimeout(() => {
      setResetAnimation('headShake');
      clearTimeout(resetTimeout);
    }, 0);
  };

  return (
    <form className={`upsert-employee ${resetAnimation}`} onSubmit={formik.handleSubmit}>
      <Callout>
        <H4 className='title'>Personal Info</H4>
        <PersonalInfoForm
          fields={formik.values}
          errors={formik.errors}
          touched={formik.touched}
          handleBlur={formik.handleBlur}
          handleChange={formik.handleChange}
          handleCustomChange={handleCustomChange}
          onInputGroupsChange={handleInputGroupsChange}
          onAddInputGroupsEl={addInputGroupsEl}
          onRemoveInputGroupsEl={removeInputGroupsEl}
          disabled={isProcessing || isLoading}
        />
      </Callout>
      <Callout>
        <H4 className='title'>Employee Info</H4>
        <EmployeeInfoForm
          isUpdate={isUpdate}
          fields={formik.values}
          salaryHistory={employee?.salary.history || []}
          departmentHistory={employee?.department.history || []}
          jobTitleHistory={employee?.jobTitle.history || []}
          errors={formik.errors}
          touched={formik.touched}
          handleBlur={formik.handleBlur}
          handleCustomChange={handleCustomChange}
          disabled={isProcessing || isLoading}
        />
      </Callout>
      <Callout className='controls'>
        <FormGroup>
          <Button
            minimal
            type='button'
            text='Reset Fields'
            icon={IconNames.RESET}
            onClick={handleReset}
          />
          <ButtonGroup minimal>
            <Button type='button' text='Back' onClick={() => navigateToEmployeeList()} />
            {/* <Button type='button' text='Back' onClick={() => history.push('/employees')} /> */}
            <Divider />
            <Popover
              hasBackdrop
              isOpen={showPopover}
              onInteraction={(state) => !state && setShowPopover(state)}
            >
              <Button
                large
                type='submit'
                text={isUpdate ? 'Update Employee' : 'Add Employee'}
                intent={Intent.SUCCESS}
                icon={IconNames.ADD}
                loading={isProcessing || isLoading}
              />
              <PopoverConfirm
                handleCancel={() => setShowPopover(false)}
                handleSubmit={() => formik.handleSubmit()}
              />
            </Popover>
          </ButtonGroup>
        </FormGroup>
      </Callout>
    </form>
  );
};

UpsertEmployeeForm.propTypes = {
  isProcessing: PropTypes.bool,
  doProcess: PropTypes.func.isRequired,
  departments: PropTypes.shape(),
  jobTitles: PropTypes.shape(),
  employee: PropTypes.shape(),
  isUpdate: PropTypes.bool,
  setNotificationSuccessDispatch: PropTypes.func.isRequired,
  setNotificationErrorDispatch: PropTypes.func.isRequired,
  fetchInitialPageEmployeesStartDispatch: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  departments: selectAllDepartmentsObj,
  jobTitles: selectAllJobTitlesObj
});

const mapDispatchToProps = (dispatch) => ({
  setNotificationSuccessDispatch: (message) => dispatch(setNotificationSuccess(message)),
  setNotificationErrorDispatch: (errorMessage) => dispatch(setNotificationError(errorMessage)),
  fetchInitialPageEmployeesStartDispatch: (isActive) => (
    dispatch(fetchInitialPageEmployeesStart(pageKeys.employees.fullName, isActive, 'asc'))),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UpsertEmployeeForm);
