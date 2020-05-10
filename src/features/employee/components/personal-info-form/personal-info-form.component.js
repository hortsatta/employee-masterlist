import React, { useState, useRef, useCallback } from 'react';
import { Spinner, Button, FormGroup, FileInput, ControlGroup, InputGroup, Divider, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import Jimp from 'jimp';
import dotProp from 'dot-prop';
import PropTypes from 'prop-types';

import './personal-info-form.styles.scss';
import employeePlaceholder from 'assets/employee-placeholder.png';
import { MomentDateInput, InputGroups } from 'common/components';
import GenderSelect from '../gender-select/gender-select.component';


const PersonalInfoForm = ({
  fields,
  errors,
  touched,
  handleChange,
  handleCustomChange,
  handleBlur,
  onInputGroupsChange,
  onAddInputGroupsEl,
  onRemoveInputGroupsEl,
  disabled
}) => {
  const fileInputEl = useRef(null);
  const [isFetchingImage, setIsFetchingImage] = useState(false);

  const {
    firstName,
    lastName,
    middleInitial,
    currentAddress,
    homeAddress,
    birthDate,
    gender,
    phones,
    emails,
    picture,
    imageURL
  } = fields;

  const generateJimp = async (fileURL) => {
    const size = 360;
    // Convert to jimp, and set desired jimp settings to image,
    // get image base64, and return it in jimp object
    const jimp = await Jimp.read(fileURL);
    const value = jimp.bitmap.width >= jimp.bitmap.height
      ? jimp.cover(size, size).quality(75)
      : jimp.resize(size, Jimp.AUTO).crop(0, 0, size, size).quality(75);
    const base64 = await value.getBase64Async(Jimp.MIME_JPEG);
    return { ...value, base64 };
  };

  // For file input image select
  const handleInputChange = useCallback(async (e) => { 
    try {
      setIsFetchingImage(true);
      const file = e.target.files[0];
      // Generate image url from selected file
      const fileURL = URL.createObjectURL(file);
      const value = await generateJimp(fileURL);
      const picture = {
        target: {
          name: 'picture',
          value: { ...value, filename: file.name }
        }
      };
      handleCustomChange(picture);
    } catch (error) {
      handleCustomChange({ target: { name: 'picture', value: null } });
    } finally {
      setIsFetchingImage(false);
      // Clear value to enable same file selection,
      // useful if current selection has been remove via img tag click
      fileInputEl.current.value = '';
    }
   
  }, [handleCustomChange]);

  // For fetching image URL via 'fetch' button
  const handleURLClick = async () => {
    if (!imageURL) { return; }
    try {
      setIsFetchingImage(true);
      const value = await generateJimp(imageURL);
      const picture = {
        target: {
          name: 'picture',
          value: { ...value }
        }
      }
      handleCustomChange(picture);
    } catch (error) { }
    finally { setIsFetchingImage(false); }
  };

  return (
    <div className='personal-info'>
      <FormGroup>
        <div className='employee-picture-wrapper'>
          <div className='employee-picture'>
            <div className={`status ${isFetchingImage ? 'show' : ''}`}>
              {
                isFetchingImage
                  ? (<Spinner size={Spinner.SIZE_LARGE} />)
                  : (picture
                    ? <Icon type='button' icon={IconNames.CROSS} iconSize={100} onClick={() => { handleCustomChange({ target: { name: 'picture', value: null } }); }} />
                    : <Icon type='button' icon={IconNames.IMPORT} iconSize={100} onClick={() => { fileInputEl.current.click() }} />
                  )
              }
            </div>
            <img src={picture ? picture.base64 : employeePlaceholder} alt='employee' />
          </div>
          <div className='picture-controls'>
            <InputGroup
              fill
              name='imageURL'
              type='text'
              placeholder='Paste image URL here...'
              value={imageURL}
              onChange={handleChange}
              disabled={disabled || isFetchingImage}
              rightElement={
                <Button
                  className='image-url-button'
                  disabled={disabled || isFetchingImage}
                  type='button'
                  text='Obtain'
                  onClick={handleURLClick}
                />
              }
            />
            <small>or</small>
            <FileInput
              fill
              disabled={disabled || isFetchingImage}
              text={dotProp.get(picture, 'filename', 'Select image...')}
              inputProps={{ ref: fileInputEl, accept: 'image/*' }}
              onInputChange={handleInputChange}
            />
          </div>
        </div>
        <Divider />
        <ControlGroup fill>
          <InputGroup
            className={`input-field ${errors?.firstName && touched?.firstName ? 'error' : ''}`}
            name='firstName'
            type='text'
            placeholder='First Name'
            onChange={handleChange}
            onBlur={handleBlur}
            value={firstName}
            disabled={disabled}
          />
          <InputGroup
            className={`input-field ${errors?.lastName && touched?.lastName ? 'error' : ''}`}
            name='lastName'
            type='text'
            placeholder='Last Name'
            onChange={handleChange}
            onBlur={handleBlur}
            value={lastName}
            disabled={disabled}
          />
        </ControlGroup>
        <div className='row-3'>
          <InputGroup
            className={`input-field ${errors?.middleInitial && touched?.middleInitial ? 'error' : ''}`}
            name='middleInitial'
            type='text'
            placeholder='Middle Initial'
            onChange={handleChange}
            onBlur={handleBlur}
            value={middleInitial}
            maxLength={1}
            disabled={disabled}
          />
          <MomentDateInput
            className={`input-field ${errors?.birthDate && touched?.birthDate ? 'error' : ''}`}
            name='birthDate'
            placeholder='Date of Birth'
            onChange={(e) => handleCustomChange({ target: { value: e, name: 'birthDate' } })}
            locale='en'
            onBlur={handleBlur}
            value={birthDate}
            fill
            disabled={disabled}
          />
          <GenderSelect
            className={`input-field ${errors?.gender && touched?.gender ? 'error' : ''}`}
            name='gender'
            gender={gender}
            onItemSelect={(e) => handleCustomChange({ target: { value: e, name: 'gender' } })}
            disabled={disabled}
          />
        </div>
        <Divider />
        <div className='address'>
          <InputGroup
            className={`input-field ${errors?.currentAddress && touched?.currentAddress ? 'error' : ''}`}
            name='currentAddress'
            type='text'
            placeholder='Current Address'
            leftIcon={IconNames.MAP_MARKER}
            onChange={handleChange}
            onBlur={handleBlur}
            value={currentAddress}
            disabled={disabled}
          />
          <InputGroup
            className={`input-field ${errors?.homeAddress && touched?.homeAddress ? 'error' : ''}`}
            name='homeAddress'
            type='text'
            placeholder='Home Address'
            leftIcon={IconNames.HOME}
            onChange={handleChange}
            onBlur={handleBlur}
            value={homeAddress}
            disabled={disabled}
          />
        </div>
        <Divider />
        <div className='row-2'>
          <InputGroups
            className={`input-field ${errors?.phones && touched?.phones ? 'error' : ''}`}
            name='phone'
            fieldName='phones'
            placeholder='Phone No'
            type='tel'
            items={phones}
            leftIcon={IconNames.MOBILE_PHONE}
            onChange={onInputGroupsChange}
            onBlur={handleBlur}
            onAddEl={onAddInputGroupsEl}
            onRemoveEl={onRemoveInputGroupsEl}
            disabled={disabled}
          />
          <InputGroups
            className={`input-field ${errors?.emails && touched?.emails ? 'error' : ''}`}
            name='email'
            fieldName='emails'
            placeholder='Email'
            type='email'
            items={emails}
            leftIcon={IconNames.ENVELOPE}
            onChange={onInputGroupsChange}
            onBlur={handleBlur}
            onAddEl={onAddInputGroupsEl}
            onRemoveEl={onRemoveInputGroupsEl}
            disabled={disabled}
          />
        </div>
      </FormGroup>
    </div>
  );
};

PersonalInfoForm.propTypes = {
  fields: PropTypes.shape({
    firstName: PropTypes.string,
    lastName: PropTypes.string,
    middleInitial: PropTypes.string,
    gender: PropTypes.string,
    birthDate: PropTypes.instanceOf(Date),
    currentAddress: PropTypes.string,
    homeAddress: PropTypes.string,
    phones: PropTypes.arrayOf(PropTypes.any),
    emails: PropTypes.arrayOf(PropTypes.any)
  }).isRequired,
  errors: PropTypes.shape(),
  touched: PropTypes.shape(),
  handleChange: PropTypes.func.isRequired,
  handleCustomChange: PropTypes.func.isRequired,
  handleBlur: PropTypes.func.isRequired,
  onInputGroupsChange: PropTypes.func.isRequired,
  onAddInputGroupsEl: PropTypes.func.isRequired,
  onRemoveInputGroupsEl: PropTypes.func.isRequired,
  disabled: PropTypes.bool
};

export default PersonalInfoForm;
