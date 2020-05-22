import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Callout, Menu, MenuItem, MenuDivider, Intent, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './employee-list-table.styles.scss';
import employeePlaceholder from 'assets/employee-placeholder.png';
import employeePlaceholder2 from 'assets/employee-placeholder-2.png';
import { pageKeys } from 'config/system.config';
import { navigateToUpdateEmployee } from 'common/services';
import { DataTable, DataTableFooter } from 'common/components';
import { selectAllDepartmentsObj } from 'features/department/store';
import { selectAllJobTitlesObj } from 'features/job-title/store';
import {
  fetchInitialPageEmployeesStart,
  fetchNextPageEmployeesStart,
  fetchPreviousPageEmployeesStart,
  selectCurrentPage,
  selectIsPageLoading
} from '../../store';

const EmployeeListTable = ({
  isPageLoading,
  departments,
  jobTitles,
  currentPage,
  numRows,
  dataSource,
  fetchInitialPageEmployeesStartDispatch,
  fetchPreviousPageEmployeesStartDispatch,
  fetchNextPageEmployeesStartDispatch,
  onViewClick
}) => {
  const [sortBy, setSortBy] = useState('asc');
  const [currentPageKey, setPageKey] = useState(pageKeys.employees.fullName);

  const cellMenuRender = (i) => (
    <Menu>
      <MenuItem text='View' icon={IconNames.ZOOM_IN} onClick={() => onViewClick(dataSource[i].id)}/>
      <MenuItem text='Update' icon={IconNames.HIGHLIGHT} onClick={() => navigateToUpdateEmployee(dataSource[i].id)} />
      <MenuDivider />
      <MenuItem text='Remove' intent={Intent.DANGER} icon={IconNames.TRASH} />
    </Menu>
  );

  const handleSorting = (isAsc, pageKey) => {
    const sort = isAsc ? 'asc' : 'desc';
    setSortBy(sort);
    setPageKey(pageKey);
    fetchInitialPageEmployeesStartDispatch(pageKey, true, sort);
  };

  const generateImgSrc = (index) => {
    const { gender, thumb } = dataSource[index].personalInfo;
    if (thumb) { return thumb; }
    return gender.toLowerCase() === 'male' ? employeePlaceholder2 : employeePlaceholder;
  };

  const columns = [
    {
      name: (<Icon icon={IconNames.MUGSHOT} />),
      cellData: (rowIndex) => (
        <img
          className={dataSource[rowIndex].personalInfo.thumb ? '' : 'placeholder'}
          src={generateImgSrc(rowIndex)}
          alt='employee-thumb'
        />
      )
    }, {
      name: 'Name',
      cellData: (rowIndex) => dataSource[rowIndex].personalInfo.fullName,
      handleSorting: (isAsc) => handleSorting(isAsc, pageKeys.employees.fullName)
    }, {
      name: 'Title',
      cellData: (rowIndex) => jobTitles[dataSource[rowIndex].jobTitle.titleId.toLowerCase()]?.name
    }, {
      name: 'Department',
      cellData: (rowIndex) => (
        departments[dataSource[rowIndex].department.departmentId.toLowerCase()]?.alias
      )
    }, {
      name: 'Date Hired',
      cellData: (rowIndex) => dataSource[rowIndex].hireDate.date,
      handleSorting: (isAsc) => handleSorting(isAsc, pageKeys.employees.hireDate)
    }
  ];

  return (
    <Callout className='employee-list-wrapper'>
      <DataTable
        className='employee-list-table'
        isLoading={isPageLoading}
        numRows={numRows}
        columns={columns}
        columnWidths={[50, 330, 250, 250, 120]}
        cellMenu={cellMenuRender}
      />
      <DataTableFooter
        isPage
        isLoading={isPageLoading}
        currentPage={currentPage}
        handleRefreshClick={() => (
          fetchInitialPageEmployeesStartDispatch(currentPageKey, true, sortBy))}
        handlePreviousPageClick={() => (
          fetchPreviousPageEmployeesStartDispatch(currentPageKey, true, sortBy))}
        handleNextPageClick={() => (
          fetchNextPageEmployeesStartDispatch(currentPageKey, true, sortBy))}
      />
    </Callout>
  );
};

EmployeeListTable.propTypes = {
  isPageLoading: PropTypes.bool,
  departments: PropTypes.shape().isRequired,
  jobTitles: PropTypes.shape().isRequired,
  currentPage: PropTypes.shape({ index: PropTypes.number, isLast: PropTypes.bool }),
  numRows: PropTypes.number,
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  fetchInitialPageEmployeesStartDispatch: PropTypes.func.isRequired,
  fetchPreviousPageEmployeesStartDispatch: PropTypes.func.isRequired,
  fetchNextPageEmployeesStartDispatch: PropTypes.func.isRequired,
  onViewClick: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isPageLoading: selectIsPageLoading,
  departments: selectAllDepartmentsObj,
  jobTitles: selectAllJobTitlesObj,
  currentPage: selectCurrentPage()
});

const mapDispatchToProps = (dispatch) => ({
  fetchInitialPageEmployeesStartDispatch: (pageKey, isActive, sortBy) => (
    dispatch(fetchInitialPageEmployeesStart(pageKey, isActive, sortBy))),
  fetchPreviousPageEmployeesStartDispatch: (pageKey, isActive, sortBy) => (
    dispatch(fetchPreviousPageEmployeesStart(pageKey, isActive, sortBy))),
  fetchNextPageEmployeesStartDispatch: (pageKey, isActive, sortBy) => (
    dispatch(fetchNextPageEmployeesStart(pageKey, isActive, sortBy))
  )
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeListTable);
