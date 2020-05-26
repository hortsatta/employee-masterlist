import React, { useEffect, useState } from 'react';
import { compose } from 'redux';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { H1, H4 } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import './home-page.styles.scss';
import employeePlaceholder from 'assets/employee-placeholder.png';
import employeePlaceholder2 from 'assets/employee-placeholder-2.png';
import skate from 'assets/skate.gif';
import sparkle from 'assets/sparkle.gif';
import { WithDelay } from 'common/containers';
import { selectNewlyHiredEmployee, fetchNewlyHiredEmployeeStart, selectIsEmployeeLoading } from 'features/employee/store';
import { selectAllJobTitlesObj } from 'features/job-title/store';

const genderPictureSrc = {
  female: employeePlaceholder,
  male: employeePlaceholder2
};

const HomePage = ({
  isEmployeeLoading,
  newlyHiredEmployee,
  jobTitles,
  fetchNewlyHiredEmployeeStartDispatch,
}) => {
  const [hasAnim, setHasAnim] = useState(false);

  useEffect(() => {
    fetchNewlyHiredEmployeeStartDispatch();
  }, [fetchNewlyHiredEmployeeStartDispatch]);

  useEffect(() => {
    if (!newlyHiredEmployee || isEmployeeLoading) {
      setHasAnim(false);
      return;
    }
    setHasAnim(true);
  }, [isEmployeeLoading, newlyHiredEmployee]);

  const { personalInfo, jobTitle } = newlyHiredEmployee || {};
  const { fullName, gender, pictureUrl } = personalInfo || {};

  return (
    <div className='home-page'>
      <div className={`app-logo ${hasAnim ? 'rise' : ''}`}>
        <img src={skate} alt='gif' />
        <H1>
          Employee
          <b>Masterlist</b>
        </H1>
      </div>
      <div className={`divider ${hasAnim ? 'show' : ''}`} />
      <div className={`newly-hired ${hasAnim ? 'show' : ''}`}>
        <H4 className='award-title'>Our Latest Employee</H4>
        <div className='employee'>
          <div className='employee-picture'>
            <img className='sparkle' src={sparkle} alt='sparkle' />
            <img
              className='employee'
              src={pictureUrl || genderPictureSrc[gender?.toLowerCase() || 'female']}
              alt='employee'
            />
          </div>
          <div className='employee-details'>
            <H4>{fullName}</H4>
            <span>{jobTitles[jobTitle?.titleId.toLowerCase()]?.name}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

HomePage.propTypes = {
  isEmployeeLoading: PropTypes.bool,
  newlyHiredEmployee: PropTypes.shape(),
  jobTitles: PropTypes.shape(),
  fetchNewlyHiredEmployeeStartDispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  isEmployeeLoading: selectIsEmployeeLoading,
  newlyHiredEmployee: selectNewlyHiredEmployee,
  jobTitles: selectAllJobTitlesObj
});

const mapDispatchToProps = (dispatch) => ({
  fetchNewlyHiredEmployeeStartDispatch: () => dispatch(fetchNewlyHiredEmployeeStart())
});

export default compose(
  connect(mapStateToProps, mapDispatchToProps),
  WithDelay
)(HomePage);
