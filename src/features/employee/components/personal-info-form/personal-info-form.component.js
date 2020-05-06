import React from 'react';
import { FormGroup, ControlGroup, InputGroup, Divider } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './personal-info-form.styles.scss';
import { MomentDateInput, InputGroups } from 'common/components';
import GenderSelect from '../gender-select/gender-select.component';

const PersonalInfoForm = ({
  fields,
  onChange,
  onInputGroupsChange,
  onAddInputGroupsEl,
  onRemoveInputGroupsEl
}) => {
  const {
    firstName,
    lastName,
    middleInitial,
    currentAddress,
    homeAddress,
    birthDate,
    phones,
    emails
  } = fields;

  return (
    <form className='personal-info'>
      <FormGroup>
        <ControlGroup fill>
          <InputGroup
            className='input-field'
            name='firstName'
            type='text'
            placeholder='First Name'
            onChange={onChange}
            value={firstName}
            required
          />
          <InputGroup
            className='input-field'
            name='lastName'
            type='text'
            placeholder='Last Name'
            onChange={onChange}
            value={lastName}
            required
          />
        </ControlGroup>
        <div className='row-3'>
          <InputGroup
            className='input-field'
            name='middleInitial'
            type='text'
            placeholder='Middle Initial'
            onChange={onChange}
            value={middleInitial}
            maxLength={1}
            required
          />
          <MomentDateInput
            placeholder='Date of Birth'
            onChange={(e) => onChange({ target: { value: e, name: 'birthDate' } })}
            locale='en'
            value={birthDate}
            fill
          />
          <GenderSelect
            gender={fields.gender}
            onItemSelect={(e) => onChange({ target: { value: e, name: 'gender' } })}
          />
        </div>
        <Divider />
        <div className='address'>
          <InputGroup
            className='input-field'
            name='currentAddress'
            type='text'
            placeholder='Current Address'
            leftIcon={IconNames.MAP_MARKER}
            onChange={onChange}
            value={currentAddress}
            required
          />
          <InputGroup
            className='input-field'
            name='homeAddress'
            type='text'
            placeholder='Home Address'
            leftIcon={IconNames.HOME}
            onChange={onChange}
            value={homeAddress}
            required
          />
        </div>
        <Divider />
        <div className='row-2'>
          <InputGroups
            items={phones}
            name='phone'
            fieldName='phones'
            placeholder='Phone No'
            type='tel'
            leftIcon={IconNames.MOBILE_PHONE}
            onChange={onInputGroupsChange}
            onAddEl={onAddInputGroupsEl}
            onRemoveEl={onRemoveInputGroupsEl}
          />
          <InputGroups
            items={emails}
            name='email'
            fieldName='emails'
            placeholder='Email'
            type='email'
            leftIcon={IconNames.ENVELOPE}
            onChange={onInputGroupsChange}
            onAddEl={onAddInputGroupsEl}
            onRemoveEl={onRemoveInputGroupsEl}
          />
        </div>
      </FormGroup>
    </form>
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
  onChange: PropTypes.func.isRequired,
  onInputGroupsChange: PropTypes.func.isRequired,
  onAddInputGroupsEl: PropTypes.func.isRequired,
  onRemoveInputGroupsEl: PropTypes.func.isRequired
};

export default PersonalInfoForm;
