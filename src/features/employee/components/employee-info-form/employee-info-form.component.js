import React from 'react';
import { FormGroup } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import { MomentDateInput } from 'common/components';

const EmployeeInfoForm = ({ fields, onChange }) => (
  <form className='employee-info'>
    <FormGroup>
      <MomentDateInput
        placeholder='Hire Date'
        onChange={(e) => onChange({ target: { value: e, name: 'hireDate' } })}
        locale='en'
        fill
      />
    </FormGroup>
  </form>
);

EmployeeInfoForm.propTypes = {
  fields: PropTypes.shape({
    hireDate: PropTypes.instanceOf(Date)
  }).isRequired,
  onChange: PropTypes.func.isRequired
};

export default EmployeeInfoForm;
