import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Callout, Menu, MenuItem, MenuDivider, Intent, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './employee-list-table.styles.scss';
import employeePlaceholder from 'assets/employee-placeholder.png';
import employeePlaceholder2 from 'assets/employee-placeholder-2.png';
import { PAGE_KEYS } from 'config/system.config';
import { DataTable, DataTableFooter } from 'common/components';
import {
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
  fetchInitialPageEmployeesStartDispatch,
  fetchPreviousPageEmployeesStartDispatch,
  fetchNextPageEmployeesStartDispatch
}) => {
  const history = useHistory();
  const [sortBy, setSortBy] = useState('asc');
  const [currentPageKey, setPageKey] = useState(PAGE_KEYS.employees.fullName);

  const cellMenuRender = (i) => (
    <Menu>
      <MenuItem text='View' icon={IconNames.ZOOM_IN} />
      <MenuItem text='Edit' icon={IconNames.HIGHLIGHT} onClick={() => history.push(`/employees/${dataSource[i].id}/edit`)} />
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
          alt='employe-thumb'
        />
      )
    }, {
      name: 'Name',
      cellData: (rowIndex) => dataSource[rowIndex].personalInfo.fullName,
      handleSorting: (isAsc) => handleSorting(isAsc, PAGE_KEYS.employees.fullName)
    }, {
      name: 'Title',
      cellData: (rowIndex) => dataSource[rowIndex].jobTitle.name
    }, {
      name: 'Department',
      cellData: (rowIndex) => dataSource[rowIndex].department.alias
    }, {
      name: 'Date Hired',
      cellData: (rowIndex) => dataSource[rowIndex].hireDate.date,
      handleSorting: (isAsc) => handleSorting(isAsc, PAGE_KEYS.employees.hireDate)
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
        cellMenu={cellMenuRender}
      />
      <DataTableFooter
        isPage
        isLoading={isLoading}
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
  isLoading: PropTypes.bool,
  currentPage: PropTypes.shape({ index: PropTypes.number, isLast: PropTypes.bool }),
  numRows: PropTypes.number,
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  fetchInitialPageEmployeesStartDispatch: PropTypes.func.isRequired,
  fetchPreviousPageEmployeesStartDispatch: PropTypes.func.isRequired,
  fetchNextPageEmployeesStartDispatch: PropTypes.func.isRequired
};

const mapStateToProps = createStructuredSelector({
  isLoading: selectIsLoading,
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
