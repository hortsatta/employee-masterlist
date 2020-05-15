import React from 'react';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { Button, ButtonGroup } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import './data-table-footer.styles.scss';
import { selectDarkMode } from 'features/core/store';

const DataTableFooter = ({
  isLoading,
  darkMode,
  currentPage,
  isPage,
  handleRefreshClick,
  handlePreviousPageClick,
  handleNextPageClick
}) => (
  <div className={`data-table-footer ${darkMode ? 'bp3-dark' : ''}`}>
    <ButtonGroup disabled={isLoading}>
      <Button
        minimal
        disabled={isLoading}
        text='Refresh'
        icon={IconNames.REFRESH}
        onClick={handleRefreshClick}
      />
    </ButtonGroup>
    {
      isPage && (
        <ButtonGroup disabled={isLoading}>
          <Button
            minimal
            text='Prev'
            disabled={(!currentPage || currentPage.index <= 1) || isLoading}
            onClick={handlePreviousPageClick}
          />
          <span className='current-page'>{currentPage.index}</span>
          <Button
            minimal
            text='Next'
            disabled={(!currentPage || currentPage.isLast) || isLoading}
            onClick={handleNextPageClick}
          />
        </ButtonGroup>
      )
    }
  </div>
);

DataTableFooter.propTypes = {
  isLoading: PropTypes.bool,
  darkMode: PropTypes.bool,
  currentPage: PropTypes.shape({ index: PropTypes.number, isLast: PropTypes.bool }),
  isPage: PropTypes.bool,
  handleRefreshClick: PropTypes.func,
  handleNextPageClick: PropTypes.func,
  handlePreviousPageClick: PropTypes.func
};

const mapStateToProps = createStructuredSelector({
  darkMode: selectDarkMode
});

export default connect(mapStateToProps)(DataTableFooter);
