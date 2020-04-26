import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, Button, Classes } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './sign-in.styles.scss';
import { InputButton, WithProcessing } from 'common/components';
import { signInStart } from 'features/auth/store';

const SignIn = ({ signIn, isDialog, isProcessing, doProcess }) => {
  const [fields, setFields] = useState({ email: '', password: '', showPassword: false });
  const { email, password, showPassword } = fields;

  const lockButton = (
    <InputButton
      content={`${showPassword ? 'Hide' : 'Show'} Password`}
      icon={showPassword ? IconNames.UNLOCK : IconNames.LOCK}
      onClick={() => (
        setFields((prevState) => ({ ...fields, showPassword: !prevState.showPassword })))}
    />
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFields({ ...fields, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    doProcess();
    signIn({ email, password });
  };

  return (
    <form
      className={`sign-in ${isDialog ? Classes.DIALOG_BODY : ''}`}
      onSubmit={handleSubmit}
    >
      <FormGroup disabled={isProcessing}>
        <InputGroup
          className='input-field'
          name='email'
          type='email'
          disabled={isProcessing}
          leftIcon={IconNames.ENVELOPE}
          placeholder='Email'
          value={email}
          onChange={handleChange}
          required
        />
        <InputGroup
          className='input-field'
          name='password'
          type={showPassword ? 'text' : 'password'}
          disabled={isProcessing}
          leftIcon={IconNames.KEY}
          placeholder='Password'
          rightElement={lockButton}
          value={password}
          onChange={handleChange}
          required
        />
      </FormGroup>
      <div className={isDialog ? Classes.DIALOG_FOOTER : ''}>
        <div className={isDialog ? Classes.DIALOG_FOOTER_ACTIONS : ''}>
          <Button
            className='submit-button'
            icon={IconNames.LOG_IN}
            intent='primary'
            text='Sign In'
            type='submit'
            loading={isProcessing}
            large
          />
        </div>
      </div>
    </form>
  );
};

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  isDialog: PropTypes.bool
};

const mapDispatchToProps = (dispatch) => ({
  signIn: (credentials) => dispatch(signInStart(credentials))
});

export default compose(
  connect(null, mapDispatchToProps),
  WithProcessing
)(SignIn);
