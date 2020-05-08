import React from 'react';
import { InputGroup, ControlGroup, Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './input-groups.styles.scss';
import { IconButton } from 'common/components';

const InputGroups = ({ items, onChange, onAddEl, onRemoveEl, name, fieldName, disabled, ...otherProps }) => {
  const RemoveButton = (i) => (
    <IconButton
      minimal
      content='Remove Item'
      icon={IconNames.CROSS}
      onClick={() => onRemoveEl(i, fieldName)}
    />
  );

  return (
    <ControlGroup
      className={`input-groups ${name}-group`}
      vertical
      disabled={disabled}
    >
      {
        items.map((item, i) => (
          <InputGroup
            // eslint-disable-next-line react/no-array-index-key
            key={`${name || 'item'}-${i}`}
            name={`${name || 'item'}${i}`}
            className='input-field'
            rightElement={items.length > 1 ? RemoveButton(i) : null}
            value={item}
            onChange={(e) => onChange(e, i, fieldName)}
            disabled={disabled}
            {...otherProps}
          />
        ))
      }
      <Button
        fill
        type='button'
        icon={IconNames.PLUS}
        disabled={disabled}
        onClick={() => onAddEl(fieldName)}
      />
    </ControlGroup>
  );
};

InputGroups.propTypes = {
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  name: PropTypes.string.isRequired,
  fieldName: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
  onAddEl: PropTypes.func.isRequired,
  onRemoveEl: PropTypes.func.isRequired
};

export default InputGroups;
