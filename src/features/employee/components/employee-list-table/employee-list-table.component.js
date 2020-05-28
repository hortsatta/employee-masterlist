import React, { useState } from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Callout, Menu, MenuItem, MenuDivider, Intent, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './employee-list-table.styles.scss';
import employeePlaceholder from 'assets/employee-placeholder.png';
import employeePlaceholder2 from 'assets/employee-placeholder-2.png';
import { employees as rbacEmployees } from 'config/rbac/rbac.types';
import { pageKeys } from 'config/system.config';
import { navigateToUpdateEmployee } from 'common/services';
import { CanActivate } from 'common/guards';
import { DataTable, DataTableHeader, DataTableFooter, IconButton } from 'common/components';
import { selectCurrentUser } from 'features/auth/store';
import { selectAllDepartmentsObj } from 'features/department/store';
import { selectAllJobTitlesObj } from 'features/job-title/store';
import {
  fetchInitialPageEmployeesStart,
  fetchNextPageEmployeesStart,
  fetchPreviousPageEmployeesStart,
  selectCurrentPage,
  selectIsPageLoading,
  fetchEmployeesByKeywordStart
} from '../../store';

const infoButton = (
  <IconButton
    popoverClassName='search-tooltip'
    minimal
    content='Due to firestore&#39;s nature, searching is strict and limited to first name only;
      And results are stored on a single page (data table&#39;s pagination is disabled).'
    contentIntent={Intent.WARNING}
    icon={IconNames.ISSUE}
    intent={Intent.WARNING}
  />
);

const EmployeeListTable = ({
  isPageLoading,
  departments,
  jobTitles,
  currentUser,
  currentPage,
  numRows,
  dataSource,
  fetchEmployeesByKeywordStartDispatch,
  fetchInitialPageEmployeesStartDispatch,
  fetchPreviousPageEmployeesStartDispatch,
  fetchNextPageEmployeesStartDispatch,
  onViewClick
}) => {
  const [sortBy, setSortBy] = useState('asc');
  const [currentPageKey, setPageKey] = useState(pageKeys.employees.fullName);
  const [searchKeyword, setSearchKeyword] = useState('');

  const cellMenuRender = (i) => (
    <Menu>
      <MenuItem text='View' icon={IconNames.ZOOM_IN} onClick={() => onViewClick(dataSource[i].id)}/>
      <CanActivate
        userRole={currentUser?.userRole}
        actions={[rbacEmployees.UPDATE]}
        yes={() => (
          <MenuItem text='Update' icon={IconNames.HIGHLIGHT} onClick={() => navigateToUpdateEmployee(dataSource[i].id)} />
        )}
      />
      <CanActivate
        userRole={currentUser?.userRole}
        actions={[rbacEmployees.DELETE]}
        yes={() => (
          <>
            <MenuDivider />
            <MenuItem text='Remove' intent={Intent.DANGER} icon={IconNames.TRASH} />
          </>
        )}
      />
    </Menu>
  );

  const generateImgSrc = (index) => {
    const { gender, thumb } = dataSource[index].personalInfo;
    if (thumb) { return thumb; }
    return gender.toLowerCase() === 'male' ? employeePlaceholder2 : employeePlaceholder;
  };

  const handleSorting = (isAsc, pageKey) => {
    const sort = isAsc ? 'asc' : 'desc';
    setSortBy(sort);
    setPageKey(pageKey);
    fetchInitialPageEmployeesStartDispatch(pageKey, true, sort);
  };

  const handleSearchChange = (keyword) => {
    setSearchKeyword(keyword);
    fetchEmployeesByKeywordStartDispatch(keyword, currentPageKey, true, sortBy);
  };

  const handleRefresh = () => {
    if (searchKeyword.length) {
      fetchEmployeesByKeywordStartDispatch(searchKeyword, currentPageKey, true, sortBy);
      return;
    }

    fetchInitialPageEmployeesStartDispatch(currentPageKey, true, sortBy);
  };

  const columns = [
    {
      name: (<Icon icon={IconNames.MUGSHOT} />),
      cellData: (rowIndex) => (
        <img
          className={dataSource[rowIndex].personalInfo?.thumb ? '' : 'placeholder'}
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
      cellData: (rowIndex) => jobTitles[dataSource[rowIndex].jobTitle?.titleId?.toLowerCase()]?.name
    }, {
      name: 'Department',
      cellData: (rowIndex) => (
        departments[dataSource[rowIndex].department?.departmentId?.toLowerCase()]?.alias
      )
    }, {
      name: 'Date Hired',
      cellData: (rowIndex) => dataSource[rowIndex].hireDate?.date,
      handleSorting: (isAsc) => handleSorting(isAsc, pageKeys.employees.hireDate)
    }
  ];

  const getCellData = (rowIndex, colIndex) => {
    switch (colIndex) {
      case 0:
        return dataSource[rowIndex].personalInfo.thumb;
      case 1:
        return dataSource[rowIndex].personalInfo.fullName;
      case 2:
        const titleId = dataSource[rowIndex].jobTitle.titleId;
        return jobTitles[titleId.toLowerCase()].name;
      case 3:
        const departmentId = dataSource[rowIndex].department.departmentId;
        return departments[departmentId.toLowerCase()].alias;
      case 4:
        return dataSource[rowIndex].hireDate.date;
      default:
        break;
    }
  }

  return (
    <Callout className='employee-list-wrapper'>
      <DataTableHeader
        rightElement={infoButton}
        onSearchChange={(keyword) => handleSearchChange(keyword)}
      />
      <DataTable
        className='employee-list-table'
        isLoading={isPageLoading}
        numRows={numRows}
        columns={columns}
        columnWidths={[50, 330, 250, 250, 120]}
        cellMenu={cellMenuRender}
        getCellData={getCellData}
      />
      <DataTableFooter
        isPage
        isLoading={isPageLoading}
        currentPage={currentPage}
        handleRefreshClick={handleRefresh}
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
  currentUser: PropTypes.shape(),
  currentPage: PropTypes.shape({ index: PropTypes.number, isLast: PropTypes.bool }),
  numRows: PropTypes.number,
  dataSource: PropTypes.arrayOf(PropTypes.shape()),
  fetchEmployeesByKeywordStartDispatch: PropTypes.func.isRequired,
  fetchInitialPageEmployeesStartDispatch: PropTypes.func.isRequired,
  fetchPreviousPageEmployeesStartDispatch: PropTypes.func.isRequired,
  fetchNextPageEmployeesStartDispatch: PropTypes.func.isRequired,
  onViewClick: PropTypes.func.isRequired,
};

const mapStateToProps = createStructuredSelector({
  isPageLoading: selectIsPageLoading,
  departments: selectAllDepartmentsObj,
  jobTitles: selectAllJobTitlesObj,
  currentUser: selectCurrentUser,
  currentPage: selectCurrentPage()
});

const mapDispatchToProps = (dispatch) => ({
  fetchEmployeesByKeywordStartDispatch: (keyword, pageKey, isActive, sortBy) =>
    (dispatch(fetchEmployeesByKeywordStart(keyword, pageKey, isActive, sortBy))),
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
