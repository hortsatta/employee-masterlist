import React, { useState } from 'react';
import { connect } from 'react-redux';
import { FormGroup, InputGroup, Button, Classes } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './sign-in.styles.scss';
import { InputButton } from 'common/components';
import { signInStart } from 'features/auth/store';

const SignIn = ({ signIn, isDialog }) => {
  const [fields, setFields] = useState({ username: '', password: '', showPassword: false });
  const { username, password, showPassword } = fields;

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
    signIn({ username, password });
  };

  return (
    <form
      className={`sign-in ${isDialog ? Classes.DIALOG_BODY : ''}`}
      onSubmit={handleSubmit}
    >
      <FormGroup>
        <InputGroup
          className='input-field'
          name='username'
          leftIcon={IconNames.PERSON}
          placeholder='Username'
          value={username}
          onChange={handleChange}
          required
        />
        <InputGroup
          className='input-field'
          name='password'
          leftIcon={IconNames.KEY}
          placeholder='Password'
          rightElement={lockButton}
          value={password}
          onChange={handleChange}
          type={showPassword ? 'text' : 'password'}
          required
        />
      </FormGroup>
      <div className={isDialog ? Classes.DIALOG_FOOTER : ''}>
        <div className={isDialog ? Classes.DIALOG_FOOTER_ACTIONS: ''}>
          <Button
            className='submit-button'
            icon={IconNames.LOG_IN}
            intent='primary'
            text='Sign In'
            type='submit'
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
  signIn: () => dispatch(signInStart())
});

export default connect(
  null,
  mapDispatchToProps
)(SignIn);
