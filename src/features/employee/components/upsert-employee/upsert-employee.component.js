import React, { useState } from 'react';
import { Callout, H4 } from '@blueprintjs/core';

import './upsert-employee.styles.scss';
import PersonalInfoForm from '../personal-info-form/personal-info-form.component';

const UpsertEmployee = () => {
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
  // const { firstName, lastName, middleInitial, gender, phones, emails } = personalInfoFields;

  const addInputGroupsEl = (fieldName) => {
    setPersonalInfoFields((prev) => ({ ...prev, [fieldName]: [...prev[fieldName], ['']] }));
  };

  const removeInputGroupsEl = (i, fieldName) => {
    setPersonalInfoFields((prev) => ({
      ...prev,
      [fieldName]: prev[fieldName].filter((_, idx) => idx !== i)
    }));
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setPersonalInfoFields((prev) => ({
      ...prev, [name]: value
    }));
  };

  const handleInputGroupsChange = (e, i, fieldName) => {
    setPersonalInfoFields((prev) => {
      const list = [...prev[fieldName]];
      list[i] = e.target.value;
      return { ...prev, [fieldName]: [...list] };
    });
  };

  return (
    <div className='upsert-employee'>
      <Callout>
        <H4 className='title'>Personal Info</H4>
        <PersonalInfoForm
          fields={personalInfoFields}
          onChange={handleChange}
          onInputGroupsChange={handleInputGroupsChange}
          onAddInputGroupsEl={addInputGroupsEl}
          onRemoveInputGroupsEl={removeInputGroupsEl}
        />
      </Callout>
      <Callout>
        <H4 className='title'>Employee Info</H4>
      </Callout>
    </div>
  );
};

export default UpsertEmployee;
