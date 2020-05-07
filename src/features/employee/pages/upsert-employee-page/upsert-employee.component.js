import React, { useState, useEffect } from 'react';
import { Button, Callout, H4, Intent, FormGroup, ButtonGroup, Divider } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';

import './upsert-employee.styles.scss';
import { usePrevious } from 'common/custom-hooks';
import { WithDelay } from 'common/containers';
import { PersonalInfoForm, EmployeeInfoForm } from '../../components';

const UpsertEmployeePage = () => {
  const [personalInfoFields, setPersonalInfoFields] = useState({
    firstName: '',
    lastName: '',
    middleInitial: '',
    gender: '',
    birthDate: null,
    currentAddress: '',
    homeAddress: '',
    phones: [''],
    emails: ['']
  });

  const [employeeInfoFields, setEmployeeInfoFields] = useState({
    department: null,
    jobTitle: null,
    hireDate: null,
    salary: null
  });

  const { firstName, lastName, middleInitial, gender, phones, emails } = personalInfoFields;
  const { department, jobTitle, hireDate, salary } = employeeInfoFields;
  // Used to store previous department value for checking select component
  const prevDepartment = usePrevious(department);

  // If selected department has changed in select component then set jobTitle to null
  useEffect(() => {
    if (!prevDepartment) return;
    if (prevDepartment.id === department.id) return;
    setEmployeeInfoFields((prev) => ({ ...prev, jobTitle: null }));
  }, [prevDepartment, department, jobTitle]);

  // Add new field to Input Groups component
  const addInputGroupsEl = (fieldName) => {
    setPersonalInfoFields((prev) => ({ ...prev, [fieldName]: [...prev[fieldName], ['']] }));
  };

  // Remove a specific field from Input Groups component
  const removeInputGroupsEl = (i, fieldName) => {
    setPersonalInfoFields((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, idx) => idx !== i)
    }));
  };

  const handlePersonalInfoChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfoFields((prev) => ({
      ...prev, [name]: value
    }));
  };

  const handleEmployeeInfoChange = (e) => {
    const { name, value } = e.target;
    setEmployeeInfoFields((prev) => ({
      ...prev, [name]: value
    }));
  };

  // Handle value change in Input Groups fields
  const handleInputGroupsChange = (e, i, fieldName) => {
    setPersonalInfoFields((prev) => {
      const list = [...prev[fieldName]];
      list[i] = e.target.value;
      return { ...prev, [fieldName]: [...list] };
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('personalInfoFields', personalInfoFields);
  };

  return (
    <form className='upsert-employee' onSubmit={handleSubmit}>
      <Callout>
        <H4 className='title'>Personal Info</H4>
        <PersonalInfoForm
          fields={personalInfoFields}
          onChange={handlePersonalInfoChange}
          onInputGroupsChange={handleInputGroupsChange}
          onAddInputGroupsEl={addInputGroupsEl}
          onRemoveInputGroupsEl={removeInputGroupsEl}
        />
      </Callout>
      <Callout>
        <H4 className='title'>Employee Info</H4>
        <EmployeeInfoForm
          fields={employeeInfoFields}
          onChange={handleEmployeeInfoChange}
        />
      </Callout>
      <Callout className='controls'>
        <FormGroup>
          <Button
            minimal
            type='button'
            text='Reset Fields'
            icon={IconNames.RESET}
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
            />
          </ButtonGroup>
        </FormGroup>
      </Callout>
    </form>
  );
};

export default WithDelay(UpsertEmployeePage);
