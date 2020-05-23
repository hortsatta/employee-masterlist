import React from 'react';

import './personal-info-view.styles.scss';
import employeePlaceholder from 'assets/employee-placeholder.png';
import employeePlaceholder2 from 'assets/employee-placeholder-2.png';
import { TextField } from 'common/components';

const genderPictureSrc = {
  female: employeePlaceholder,
  male: employeePlaceholder2
};

const PersonalInfoView = ({ employee }) => {
  const { personalInfo } = employee || {};
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
      <div className='profile-picture'>
        <img src={picture || genderPictureSrc[gender?.toLowerCase()]} alt='employee-profile' />
      </div>
      <div className='fields'>
        <TextField className='row-2' label='First Name'>{firstName}</TextField>
        <TextField className='row-2' label='Last Name'>{lastName}</TextField>
        <TextField className='row-3' label='Middle Initial'>{middleInitial}</TextField>
        <TextField className='row-3' label='Gender'>{gender}</TextField>
        <TextField className='row-3' label='Birthday'>{birthDate?.date}</TextField>
        <TextField label='Current Address'>{currentAddress}</TextField>
        <TextField label='Home Address'>{homeAddress}</TextField>
        <TextField label='Phones'>
          {phones && phones.map((phone, i) => (
            <div key={`phone-${i}`}>{phone}</div>))}
        </TextField>
        <TextField label='Emails'>
          {emails && emails.map((email, i) => (
            <div key={`email-${i}`}>{email}</div>))}
        </TextField>
      </div>
    </div>
  );
};

export default PersonalInfoView;
