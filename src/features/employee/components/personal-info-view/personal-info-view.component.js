import React from 'react';
import { Divider, Spinner } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import './personal-info-view.styles.scss';
import employeePlaceholder from 'assets/employee-placeholder.png';
import employeePlaceholder2 from 'assets/employee-placeholder-2.png';
import { TextField } from 'common/components';

const genderPictureSrc = {
  female: employeePlaceholder,
  male: employeePlaceholder2
};

const PersonalInfoView = ({ isLoading, employee = {} }) => {
  const { personalInfo } = employee;
  const {
    firstName,
    middleInitial,
    lastName,
    gender,
    birthDate,
    currentAddress,
    homeAddress,
    phones,
    emails,
    picture
  } = personalInfo || {};

  return (
    <div className='personal-info-view'>
      <div className={`profile-picture ${isLoading ? 'loading' : ''}`}>
        {isLoading && <Spinner size={Spinner.SIZE_LARGE} />}
        <img src={picture || genderPictureSrc[gender?.toLowerCase() || 'female']} alt='employee-profile' />
      </div>
      <Divider />
      <div className='fields'>
        <TextField loading={isLoading} className='row-2' label='First Name'>
          {firstName}
        </TextField>
        <TextField loading={isLoading} className='row-2' label='Last Name'>
          {lastName}
        </TextField>
        <TextField loading={isLoading} className='row-3' label='Middle Initial'>
          {middleInitial}
          </TextField>
        <TextField loading={isLoading} className='row-3' label='Gender'>
          {gender}
        </TextField>
        <TextField loading={isLoading} className='row-3' label='Birthday'>
          {birthDate?.date}
        </TextField>
        <TextField loading={isLoading} label='Current Address'>
          {currentAddress}
        </TextField>
        <TextField loading={isLoading} label='Home Address'>
          {homeAddress}
        </TextField>
        <TextField loading={isLoading} label={phones && phones.length > 1 ? 'Phones' : 'Phone'}>
          {phones && phones.map((phone, i) => (
            <div key={`phone-${i}`}>{phone}</div>))}
        </TextField>
        <TextField loading={isLoading} label={emails && emails.length > 1 ? 'Emails' : 'Email'}>
          {emails && emails.map((email, i) => (
            <div key={`email-${i}`}>{email}</div>))}
        </TextField>
      </div>
    </div>
  );
};

PersonalInfoView.propTypes = {
  isLoading: PropTypes.bool,
  employee: PropTypes.shape()
};

export default PersonalInfoView;
