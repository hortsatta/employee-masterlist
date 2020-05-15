import React from 'react';
import { Menu, MenuItem } from '@blueprintjs/core';
import { Table, Column, ColumnHeaderCell, Cell, CopyCellsMenuItem, TableLoadingOption } from '@blueprintjs/table';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import '@blueprintjs/table/lib/css/table.css';

const menuRenderer = (i, handleSorting) => (
  <Menu>
    <MenuItem icon={IconNames.SORT_ASC} text='Asc' onClick={() => handleSorting(true)} />
    <MenuItem icon={IconNames.SORT_DESC} text='Desc' onClick={() => handleSorting(false)} />
  </Menu>
);

const DataTable = ({ className, isLoading, numRows, columns, columnWidths }) => {
  const getColumn = (name, i, cellData, handleSorting) => {
    const cellRenderer = (iRow) => (
      <Cell>{cellData(iRow)}</Cell>
    );

    const columnHeaderCellRenderer = () => (
      <ColumnHeaderCell
        name={name}
        menuRenderer={handleSorting ? ((iCol) => menuRenderer(iCol, handleSorting)) : ''}
      />
    );

    return (
      <Column
        cellRenderer={cellRenderer}
        columnHeaderCellRenderer={columnHeaderCellRenderer}
        key={`${name}-${i}`}
        name={name}
      />
    );
  };

  const bodyContextMenuRenderer = (context) => (
    <Menu>
      <CopyCellsMenuItem context={context} text='Copy' />
    </Menu>
  );

  return (
    <Table
      loadingOptions={
        isLoading
          ? [TableLoadingOption.ROW_HEADERS, TableLoadingOption.CELLS]
          : []
      }
      className={className}
      columnWidths={columnWidths}
      numRows={numRows}
      bodyContextMenuRenderer={bodyContextMenuRenderer}
      defaultRowHeight={50}
    >
      {
        columns.map((column, i) => (
          getColumn(column.name, i, column.cellData, column.handleSorting)))
      }
    </Table>
  );
};

DataTable.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  numRows: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  columnWidths: PropTypes.arrayOf(PropTypes.number)
};

export default DataTable;
