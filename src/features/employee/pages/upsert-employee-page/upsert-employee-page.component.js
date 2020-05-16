import React, { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Callout, H4, H5, Intent, FormGroup, ButtonGroup, Divider, Popover } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import './upsert-employee-page.styles.scss';
import { usePrevious } from 'common/custom-hooks';
import { WithDelay, WithProcessing } from 'common/containers';
import { setNotificationError, setNotificationSuccess } from 'features/core/store';
import { createEmployeeDocument } from '../../employee.service';
import { EmployeeInfoForm, PersonalInfoForm } from '../../components';
import { selectEmployee, fetchEmployeeStart } from '../../store';
import { useCallback } from 'react';

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

const UpsertEmployeePage = ({
  match,
  employee,
  fetchEmployeeStartDispatch,
  setNotificationSuccessDispatch,
  setNotificationErrorDispatch,
  isProcessing,
  doProcess,
  isUpdate = false
}) => {
  const { id: employeeId } = match.params;
  const [isLoading, setIsLoading] = useState(false);
  const [showPopover, setShowPopover] = useState(false);
  const [resetAnimation, setResetAnimation] = useState('');

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
    onReset: () => {
      setResetAnimation('');
      const resetTimeout = setTimeout(() => {
        setResetAnimation('headShake');
        clearTimeout(resetTimeout);
      }, 0);
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
        await createEmployeeDocument(values);
        setIsLoading(false);
        setNotificationSuccessDispatch(`Employee ${values.firstName} successfully enrolled.`);
      } catch (errorMessage) {
        setIsLoading(false);
        setNotificationErrorDispatch(errorMessage);
      }
    }
  });

  const { values: { department }, setFieldValue } = formik;
  // Used to store previous department value for checking select component
  const prevDepartment = usePrevious(department);

  const updateEmployeeFields = useCallback((currentEmployee) => {
    setFieldValue('firstName', currentEmployee.personalInfo.firstName);
  }, [setFieldValue]);

  // For updating employee
  useEffect(() => {
    if (!isUpdate || !employeeId) { return; }

    if (!employee) {
      fetchEmployeeStartDispatch(employeeId);
      return;
    }

    updateEmployeeFields(employee);
  }, [isUpdate, employeeId, employee, updateEmployeeFields, fetchEmployeeStartDispatch]);

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
            onClick={formik.resetForm}
          />
          <ButtonGroup minimal>
            <Button type='button' text='Back' />
            <Divider />
            <Popover
              hasBackdrop
              isOpen={showPopover}
              onInteraction={(state) => !state && setShowPopover(state)}
            >
              <Button
                large
                type='submit'
                text='Add Employee'
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

UpsertEmployeePage.propTypes = {
  match: PropTypes.shape({ params: PropTypes.object }),
  employee: PropTypes.shape(),
  fetchEmployeeStartDispatch: PropTypes.func.isRequired,
  setNotificationSuccessDispatch: PropTypes.func.isRequired,
  setNotificationErrorDispatch: PropTypes.func.isRequired,
  isProcessing: PropTypes.bool,
  doProcess: PropTypes.func.isRequired,
  isUpdate: PropTypes.bool
};

const mapStateToProps = (state, { match }) => ({
  employee: selectEmployee(match.params.id)(state)
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmployeeStartDispatch: (id) => dispatch(fetchEmployeeStart(id)),
  setNotificationSuccessDispatch: (message) => dispatch(setNotificationSuccess(message)),
  setNotificationErrorDispatch: (errorMessage) => dispatch(setNotificationError(errorMessage))
});

export default compose(
  withRouter,
  connect(
    mapStateToProps,
    mapDispatchToProps
  ),
  WithDelay,
  WithProcessing
)(UpsertEmployeePage);
