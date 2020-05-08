import React from 'react';
import { FormGroup, ControlGroup, InputGroup, Divider } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './personal-info-form.styles.scss';
import { MomentDateInput, InputGroups } from 'common/components';
import GenderSelect from '../gender-select/gender-select.component';

const PersonalInfoForm = ({
  fields,
  errors,
  touched,
  handleChange,
  handleCustomChange,
  handleBlur,
  onInputGroupsChange,
  onAddInputGroupsEl,
  onRemoveInputGroupsEl,
  disabled
}) => {
  const {
    firstName,
    lastName,
    middleInitial,
    currentAddress,
    homeAddress,
    birthDate,
    gender,
    phones,
    emails
  } = fields;

  return (
    <div className='personal-info'>
      <FormGroup>
        <ControlGroup fill>
          <InputGroup
            className={`input-field ${errors?.firstName && touched?.firstName ? 'error' : ''}`}
            name='firstName'
            type='text'
            placeholder='First Name'
            onChange={handleChange}
            onBlur={handleBlur}
            value={firstName}
            disabled={disabled}
          />
          <InputGroup
            className={`input-field ${errors?.lastName && touched?.lastName ? 'error' : ''}`}
            name='lastName'
            type='text'
            placeholder='Last Name'
            onChange={handleChange}
            onBlur={handleBlur}
            value={lastName}
            disabled={disabled}
          />
        </ControlGroup>
        <div className='row-3'>
          <InputGroup
            className={`input-field ${errors?.middleInitial && touched?.middleInitial ? 'error' : ''}`}
            name='middleInitial'
            type='text'
            placeholder='Middle Initial'
            onChange={handleChange}
            onBlur={handleBlur}
            value={middleInitial}
            maxLength={1}
            disabled={disabled}
          />
          <MomentDateInput
            className={`input-field ${errors?.birthDate && touched?.birthDate ? 'error' : ''}`}
            name='birthDate'
            placeholder='Date of Birth'
            onChange={(e) => handleCustomChange({ target: { value: e, name: 'birthDate' } })}
            locale='en'
            onBlur={handleBlur}
            value={birthDate}
            fill
            disabled={disabled}
          />
          <GenderSelect
            className={`input-field ${errors?.gender && touched?.gender ? 'error' : ''}`}
            name='gender'
            gender={gender}
            onItemSelect={(e) => handleCustomChange({ target: { value: e, name: 'gender' } })}
            disabled={disabled}
          />
        </div>
        <Divider />
        <div className='address'>
          <InputGroup
            className={`input-field ${errors?.currentAddress && touched?.currentAddress ? 'error' : ''}`}
            name='currentAddress'
            type='text'
            placeholder='Current Address'
            leftIcon={IconNames.MAP_MARKER}
            onChange={handleChange}
            onBlur={handleBlur}
            value={currentAddress}
            disabled={disabled}
          />
          <InputGroup
            className={`input-field ${errors?.homeAddress && touched?.homeAddress ? 'error' : ''}`}
            name='homeAddress'
            type='text'
            placeholder='Home Address'
            leftIcon={IconNames.HOME}
            onChange={handleChange}
            onBlur={handleBlur}
            value={homeAddress}
            disabled={disabled}
          />
        </div>
        <Divider />
        <div className='row-2'>
          <InputGroups
            className={`input-field ${errors?.phones && touched?.phones ? 'error' : ''}`}
            name='phone'
            fieldName='phones'
            placeholder='Phone No'
            type='tel'
            items={phones}
            leftIcon={IconNames.MOBILE_PHONE}
            onChange={onInputGroupsChange}
            onBlur={handleBlur}
            onAddEl={onAddInputGroupsEl}
            onRemoveEl={onRemoveInputGroupsEl}
            disabled={disabled}
          />
          <InputGroups
            className={`input-field ${errors?.emails && touched?.emails ? 'error' : ''}`}
            name='email'
            fieldName='emails'
            placeholder='Email'
            type='email'
            items={emails}
            leftIcon={IconNames.ENVELOPE}
            onChange={onInputGroupsChange}
            onBlur={handleBlur}
            onAddEl={onAddInputGroupsEl}
            onRemoveEl={onRemoveInputGroupsEl}
            disabled={disabled}
          />
        </div>
      </FormGroup>
    </div>
  );
};

PersonalInfoForm.propTypes = {
  fields: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    middleInitial: PropTypes.string,
    gender: PropTypes.string,
    birthDate: PropTypes.instanceOf(Date),
    currentAddress: PropTypes.string,
    homeAddress: PropTypes.string,
    phones: PropTypes.arrayOf(PropTypes.any),
    emails: PropTypes.arrayOf(PropTypes.any)
  }).isRequired,
  errors: PropTypes.shape(),
  touched: PropTypes.shape(),
  handleChange: PropTypes.func.isRequired,
  handleCustomChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  onInputGroupsChange: PropTypes.func.isRequired,
  onAddInputGroupsEl: PropTypes.func.isRequired,
  onRemoveInputGroupsEl: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default PersonalInfoForm;
