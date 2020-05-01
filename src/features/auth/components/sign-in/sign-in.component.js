import React, { useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { FormGroup, InputGroup, Button, Classes } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './sign-in.styles.scss';
import { IconButton, WithProcessing } from 'common/components';
import { signInStart, selectIsLoading } from 'features/auth/store';

const SignIn = ({ signIn, isDialog, isLoading, isProcessing, doProcess }) => {
  const [fields, setFields] = useState({ email: '', password: '', showPassword: false });
  const { email, password, showPassword } = fields;

  const lockButton = (
    <IconButton
      minimal
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
      <FormGroup disabled={isProcessing || isLoading}>
        <InputGroup
          className='input-field'
          name='email'
          type='email'
          disabled={isProcessing || isLoading}
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
          disabled={isProcessing || isLoading}
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
            loading={isProcessing || isLoading}
            large
          />
        </div>
      </div>
    </form>
  );
};

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  isDialog: PropTypes.bool,
  isLoading: PropTypes.bool,
  isProcessing: PropTypes.bool,
  doProcess: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading
});

const mapDispatchToProps = (dispatch) => ({
  signIn: (credentials) => dispatch(signInStart(credentials))
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithProcessing
)(SignIn);
