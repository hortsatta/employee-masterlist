import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Callout } from '@blueprintjs/core';
import PropTypes from 'prop-types';

import './employee-list-table.styles.scss';
import employeePlaceholder from 'assets/employee-placeholder.png';
import employeePlaceholder2 from 'assets/employee-placeholder-2.png';
import { PAGE_KEYS } from 'config/system.config';
import { DataTable, DataTableFooter } from 'common/components';
import {
  setCurrentPageKey,
  fetchInitialPageEmployeesStart,
  fetchNextPageEmployeesStart,
  fetchPreviousPageEmployeesStart,
  selectCurrentPage,
  selectIsLoading
} from '../../store';

const EmployeeListTable = ({
  isLoading,
  currentPage,
  numRows,
  dataSource,
  setCurrentPageKeyDispatch,
  fetchInitialPageEmployeesStartDispatch,
  fetchPreviousPageEmployeesStartDispatch,
  fetchNextPageEmployeesStartDispatch
}) => {
  const [sortBy, setSortBy] = useState('asc');

  const handleSorting = (isAsc, pageKey) => {
    const sort = isAsc ? 'asc' : 'desc';
    setSortBy(sort);
    setCurrentPageKeyDispatch(pageKey);
    fetchInitialPageEmployeesStartDispatch(true, sort);
  };

  const generateImgSrc = (index) => {
    const { gender, thumb } = dataSource[index].personalInfo;
    if (thumb) { return thumb; }
    return gender.toLowerCase() === 'male' ? employeePlaceholder2 : employeePlaceholder;
  };

  const columns = [
    {
      name: '',
      cellData: (rowIndex) => (
        <img
          className={dataSource[rowIndex].personalInfo.thumb ? '' : 'placeholder'}
          src={generateImgSrc(rowIndex)}
          alt='employe-thumb'
        />
      )
    }, {
      name: 'Name',
      cellData: (rowIndex) => dataSource[rowIndex].personalInfo.fullName,
      handleSorting: (isAsc) => handleSorting(isAsc, PAGE_KEYS.fullName)
    }, {
      name: 'Title',
      cellData: (rowIndex) => dataSource[rowIndex].jobTitle.name
    }, {
      name: 'Department',
      cellData: (rowIndex) => dataSource[rowIndex].department.alias
    }, {
      name: 'Date Hired',
      cellData: (rowIndex) => dataSource[rowIndex].hireDate.date,
      handleSorting: (isAsc) => handleSorting(isAsc, PAGE_KEYS.hireDate)
    }
  ];

  return (
    <Callout className='employee-list-wrapper'>
      <DataTable
        className='employee-list-table'
        isLoading={isLoading}
        numRows={numRows}
        columns={columns}
        columnWidths={[50, 350, 250, 350, 150]}
      />
      <DataTableFooter
        isPage
        isLoading={isLoading}
        currentPage={currentPage}
        handleRefreshClick={() => fetchInitialPageEmployeesStartDispatch(true, sortBy)}
        handlePreviousPageClick={() => fetchPreviousPageEmployeesStartDispatch(true, sortBy)}
        handleNextPageClick={() => fetchNextPageEmployeesStartDispatch(true, sortBy)}
      />
    </Callout>
  );
};

EmployeeListTable.propTypes = {
  isLoading: PropTypes.bool,
  currentPage: PropTypes.shape({ index: PropTypes.number, isLast: PropTypes.bool }),
  numRows: PropTypes.number,
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  setCurrentPageKeyDispatch: PropTypes.func.isRequired,
  fetchInitialPageEmployeesStartDispatch: PropTypes.func.isRequired,
  fetchPreviousPageEmployeesStartDispatch: PropTypes.func.isRequired,
  fetchNextPageEmployeesStartDispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading,
  currentPage: selectCurrentPage()
});

const mapDispatchToProps = (dispatch) => ({
  setCurrentPageKeyDispatch: (pageKey) => dispatch(setCurrentPageKey(pageKey)),
  fetchInitialPageEmployeesStartDispatch: (isActive, sortBy) => (
    dispatch(fetchInitialPageEmployeesStart(isActive, sortBy))),
  fetchPreviousPageEmployeesStartDispatch: (isActive, sortBy) => (
    dispatch(fetchPreviousPageEmployeesStart(isActive, sortBy))),
  fetchNextPageEmployeesStartDispatch: (isActive, sortBy) => (
    dispatch(fetchNextPageEmployeesStart(isActive, sortBy))
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeListTable);
