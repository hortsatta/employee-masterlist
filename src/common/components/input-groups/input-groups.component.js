import React from 'react';
import { InputGroup, Button } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import { InputButton } from 'common/components';

const InputGroups = ({ items, onChange, onAddEl, onRemoveEl, name, fieldName, ...otherProps }) => {
  const RemoveButton = (i) => (
    <InputButton
      content='Remove Item'
      icon={IconNames.CROSS}
      onClick={() => onRemoveEl(i, fieldName)}
    />
  );

  return (
    <div className={`input-groups ${name}-group`}>
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
            {...otherProps}
          />
        ))
      }
      <Button
        fill
        type='button'
        icon={IconNames.PLUS}
        onClick={() => onAddEl(fieldName)}
      />
    </div>
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
