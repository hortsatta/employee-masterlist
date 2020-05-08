import React, { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import { compose } from 'redux';
import { Button, Callout, H4, Intent, FormGroup, ButtonGroup, Divider } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { useFormik } from 'formik';
import * as Yup from 'yup';

import './upsert-employee.styles.scss';
import { usePrevious } from 'common/custom-hooks';
import { WithDelay, WithProcessing } from 'common/containers';
import { setNotificationError, setNotificationSuccess } from 'features/core/store';
import { createEmployeeDocument } from '../../employee.service';
import { EmployeeInfoForm, PersonalInfoForm } from '../../components';

const UpsertEmployeePage = ({ dispatch, isProcessing, doProcess }) => {
  const [isLoading, setIsLoading] = useState(false);
  const [reset, setReset] = useState(false);

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
      salary: Yup.number().required()
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
      salary: null
    },
    onReset: () => {
      setReset(false);
      const resetTimeout = setTimeout(() => {
        setReset(true);
        clearTimeout(resetTimeout);
      }, 0);
    },
    // Submit function, only fires when all form values are valid
    onSubmit: async (values) => {
      doProcess();
      setIsLoading(true);

      try {
        await createEmployeeDocument(values);
        setIsLoading(false);
        dispatch(setNotificationSuccess(`Employee ${values.firstName} successfully enrolled.`));
      } catch (errorMessage) {
        setIsLoading(false);
        dispatch(setNotificationError(errorMessage));
      }
    }
  });

  const { values: { department }, setFieldValue } = formik;
  // Used to store previous department value for checking select component
  const prevDepartment = usePrevious(department);

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
    <form className={`upsert-employee ${reset ? 'headShake' : ''}`} onSubmit={formik.handleSubmit}>
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
            <Button
              text='Cancel'
              type='button'
            />
            <Divider />
            <Button
              large
              type='submit'
              text='Add Employee'
              intent={Intent.SUCCESS}
              icon={IconNames.ADD}
              loading={isProcessing || isLoading}
            />
          </ButtonGroup>
        </FormGroup>
      </Callout>
    </form>
  );
};

export default compose(
  connect(),
  WithDelay,
  WithProcessing
)(UpsertEmployeePage);
