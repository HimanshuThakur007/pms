// index.tsx
import React, { useState } from "react";
import { Table, Spin } from "antd";
import { DatatableProps } from "../../data/interface"; // Ensure correct path

const Datatable: React.FC<DatatableProps> = ({ columns, dataSource,loading,rowKey,rowSelection,rights }) => {
  // const [selectedRowKeys, setSelectedRowKeys] = useState<any[]>([]);

  // const onSelectChange = (newSelectedRowKeys: any[]) => {
  //   setSelectedRowKeys(newSelectedRowKeys);
  // };

  // const rowSelection = {
  //   selectedRowKeys,
  //   onChange: onSelectChange,
  // };

  return (
    <Table
      className="table datanew dataTable no-footer"
      // rowSelection={rowSelection}
      // columns={columns}
      // dataSource={dataSource}
      rowSelection={rights === 1 ? rowSelection : undefined}
      columns={rights === 1 ? columns : []}
      dataSource={rights === 1 ? dataSource : []}
      loading={loading ? { spinning: loading, indicator: <Spin size="small" /> } : false}
      rowKey={rowKey}
      pagination={rights === 1 ? {
        total: dataSource.length,
        showTotal: (total, range) =>
          ` ${range[0]} to ${range[1]} of ${total} items`,
        showSizeChanger: true,
        onShowSizeChange: onShowSizeChange,
      }:{}}
      locale={
        rights !== 1
          ? { emptyText: "You have no rights to access the table data." }
          : undefined
      }
    />
  );
};

export default Datatable;


export function itemRender({current, type, originalElement}:any) {
    if (type === "prev") {
      return <a>Previous</a>;
    }
    if (type === "next") {
      return <a>Next</a>;
    }
    return originalElement;
  }

  export function onShowSizeChange({current, pageSize}:any) {
    // console.log(current, pageSize);
  }
