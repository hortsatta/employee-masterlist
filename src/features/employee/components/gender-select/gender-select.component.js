import React from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

const GENDERS = ['Male', 'Female'];

const renderGender = (gender, { handleClick }) => (
  <MenuItem
    key={gender}
    onClick={handleClick}
    text={gender}
  />
);

const GenderSelect = ({ gender, ...otherProps }) => (
  <Select
    fill
    filterable={false}
    items={GENDERS}
    itemRenderer={renderGender}
    {...otherProps}
  >
    <Button
      fill
      icon={IconNames.DELTA}
      rightIcon={IconNames.CARET_DOWN}
      text={gender || 'Gender'}
    />
  </Select>
);

GenderSelect.propTypes = {
  gender: PropTypes.string
};

export default GenderSelect;
