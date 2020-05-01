import React from 'react';
import { Button, MenuItem } from '@blueprintjs/core';
import { Select } from '@blueprintjs/select';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

const GENDERS = ['Male', 'Female'];

const GenderSelect = ({ gender, ...otherProps }) => {
  const genderRender = (item, { handleClick }) => (
    <MenuItem
      className={gender && gender === item && 'active'}
      key={`item-${item}`}
      onClick={handleClick}
      text={item}
    />
  );

  return (
    <Select
      fill
      filterable={false}
      items={GENDERS}
      itemRenderer={genderRender}
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
};

GenderSelect.propTypes = {
  gender: PropTypes.string
};

export default GenderSelect;
