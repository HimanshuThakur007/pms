import React, { useState } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';

const ManageColumn = ({ columns, data, Heading, modalId, resetForm }: any) => {
  const [visibleColumns, setVisibleColumns] = useState(
    columns.reduce((acc: any, column: any) => {
      acc[column.key] = true; // Make all columns visible by default
      return acc;
    }, {})
  );

  const handleColumnToggle = (columnKey: string) => {
    setVisibleColumns((prevState: any) => ({
      ...prevState,
      [columnKey]: !prevState[columnKey],
    }));
  };

  const filteredColumns = columns
    .filter((column: any) => visibleColumns[column.key])
    .map((column: any) => ({
      ...column,
      render: (text: any) => (text ? text : '--'), 
    }));

  return (
    <div>
      {/* Manage Columns Dropdown */}
      <div className="dropdown me-2">
        <Link
          to="#"
          className="btn bg-soft-purple text-purple"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
        >
          <i className="ti ti-columns-3 me-2" />
          Manage Columns
        </Link>
        <div className="dropdown-menu dropdown-menu-md-end dropdown-md p-3">
          <h4 className="mb-2 fw-semibold">{Heading}</h4>
          <p className="mb-3">
            Please drag and drop your column to reorder your table and enable the visibility of columns.
          </p>
          <div className="border-top pt-3">
            {columns.map((column: any) => (
              <div key={column.key} className="d-flex align-items-center justify-content-between mb-3">
                <p className="mb-0 d-flex align-items-center">
                  <i className="ti ti-grip-vertical me-2" />
                  {column.title}
                </p>
                <div className="status-toggle">
                  <input
                    type="checkbox"
                    checked={visibleColumns[column.key]}
                    onChange={() => handleColumnToggle(column.key)}
                    id={`col-${column.key}`}
                    className="check"
                  />
                  <label htmlFor={`col-${column.key}`} className="checktoggle" />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Table */}
      <Table
        columns={filteredColumns}
        dataSource={data}
        pagination={false}
        rowKey="key"
      />

      {/* Modal and Reset Form */}
      <div id={modalId} className="modal">
        {/* Modal content goes here */}
        {/* You can also implement logic to reset the form by calling resetForm() */}
      </div>
    </div>
  );
};

export default ManageColumn;
