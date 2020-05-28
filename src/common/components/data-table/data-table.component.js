import React from 'react';
import { Button, Menu, MenuItem, Popover, Position, Icon } from '@blueprintjs/core';
import {
  Table,
  Column,
  ColumnHeaderCell,
  Cell,
  CopyCellsMenuItem,
  TableLoadingOption,
  RenderMode
} from '@blueprintjs/table';
import { IconNames } from '@blueprintjs/icons';
import PropTypes from 'prop-types';

import '@blueprintjs/table/lib/css/table.css';
import './data-table.styles.scss';

const menuRenderer = (i, handleSorting) => (
  <Menu>
    <MenuItem icon={IconNames.SORT_ASC} text='Asc' onClick={() => handleSorting(true)} />
    <MenuItem icon={IconNames.SORT_DESC} text='Desc' onClick={() => handleSorting(false)} />
  </Menu>
);

const menuColumnRender = (cellData) => {
  const cellRenderer = (iRow) => (
    <Cell>
      <Popover
        boundary='window'
        position={Position.RIGHT_TOP}
        content={cellData(iRow)}
      >
        <Button minimal icon={IconNames.MORE} />
      </Popover>
    </Cell>
  );

  return (<Column className='action-column' name={<Icon icon={IconNames.EDIT} />} cellRenderer={cellRenderer} />);
};

const DataTable = ({
  className,
  isLoading,
  numRows,
  columns,
  columnWidths,
  cellMenu,
  getCellData
}) => {
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
      <CopyCellsMenuItem text='Copy' icon={IconNames.DUPLICATE} getCellData={getCellData} context={context} />
    </Menu>
  );

  return (
    <Table
      loadingOptions={
        isLoading
          ? [TableLoadingOption.ROW_HEADERS, TableLoadingOption.CELLS]
          : []
      }
      renderMode={RenderMode.NONE}
      className={`data-table ${className}`}
      columnWidths={[...columnWidths, 50]}
      numRows={numRows}
      bodyContextMenuRenderer={bodyContextMenuRenderer}
      defaultRowHeight={50}
    >
      {
        columns.map((column, i) => (
          getColumn(column.name, i, column.cellData, column.handleSorting)))
      }
      {menuColumnRender(cellMenu)}
    </Table>
  );
};

DataTable.propTypes = {
  className: PropTypes.string,
  isLoading: PropTypes.bool,
  numRows: PropTypes.number,
  columns: PropTypes.arrayOf(PropTypes.shape()).isRequired,
  columnWidths: PropTypes.arrayOf(PropTypes.number),
  cellMenu: PropTypes.func,
  getCellData: PropTypes.func.isRequired
};

export default DataTable;
