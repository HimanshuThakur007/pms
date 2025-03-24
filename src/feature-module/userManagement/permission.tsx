import React, { useState, useEffect } from "react";
// import { Table, Checkbox, Card } from "antd";
import Table from "../../core/common/dataTable/index";
import type { ColumnsType } from "antd/es/table";
import CollapseHeader from "../../core/common/collapse-header";
import { useLocation, useNavigate } from "react-router";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import { Link } from "react-router-dom";
import { Toast } from "../../core/common/Toaster";

// Define the permission type
interface PermissionItem {
  id: number;
  name: string;
  mCreate: number;
  mEdit: number;
  mView: number;
  mDelete: number;
  allowAll: boolean;
}


const Permission: React.FC = () => {
  const location = useLocation();
  // const navigate = useNavigate()
  const stateData = location?.state?.data??'';
  var rights = location?.state?.right
  // console.log('stateData',location)
  // console.log('rights',rights)
  const [permissions, setPermissions] = useState<PermissionItem[]>([]);
  const [allowAllModules, setAllowAllModules] = useState(false);
  const [loading, setLoading] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const { loadTableData, handleSubmit } = useApiHandler();

      const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
      };

    useEffect(()=>{
      tableListHandler()
    },[stateData])

  // Function to check if all permissions are enabled
  const isAllChecked = (permissions: PermissionItem[]) => {
    return permissions.every((item) => item.mCreate && item.mEdit && item.mView && item.mDelete);
  };

  // Function to check if all permissions are enabled in a row
  const isRowFullyChecked = (record: PermissionItem) => {
    return record.mCreate === 1 && record.mEdit === 1 && record.mView === 1 && record.mDelete === 1;
  };

  // UseEffect to update "Allow All Modules" when permissions change
  useEffect(() => {
    setAllowAllModules(isAllChecked(permissions));
  }, [permissions]);

  // Handle individual permission check
  // const handleCheck = (id: number, field: keyof PermissionItem) => {
  //   console.log('id:=>',id,"Name:-",field)
  //   setPermissions((prev) => {
  //     return prev.map((item) => {
  //       if (item.id === id) {
  //         const newValue = item[field] === 1 ? 0 : 1;
  //         const updatedItem = { ...item, [field]: newValue };
  //         updatedItem.allowAll = isRowFullyChecked(updatedItem);
  //         return updatedItem;
  //       }
  //       return item;
  //     });
  //   });
  // };

  // const handleCheck = (id: number, field: keyof PermissionItem) => {
  //   console.log('id:=>', id, "Name:-", field);
  //   setPermissions((prev) => {
  //     return prev.map((item) => {
  //       if (item.id === id) {
  //         const newValue = item[field] === 1 ? 0 : 1;
  //         const updatedItem = { ...item, [field]: newValue };
  
  //         // If mEdit or mDelete is 1, set mView to 1
  //         if (field === "mEdit" || field === "mDelete") {
  //           updatedItem.mView = 1;
  //         }
  
  //         updatedItem.allowAll = isRowFullyChecked(updatedItem);
  //         return updatedItem;
  //       }
  //       return item;
  //     });
  //   });
  // };

  const handleCheck = (id: number, field: keyof PermissionItem) => {
    // console.log('id:=>', id, "Name:-", field);
    setPermissions((prev) => {
      return prev.map((item) => {
        if (item.id === id) {
          const newValue = item[field] === 1 ? 0 : 1;
          let updatedItem = { ...item, [field]: newValue };
  
          if (field === "mEdit" || field === "mDelete") {
            updatedItem.mView = 1;
          }
  
          if (field === "mView" && newValue === 0) {
            updatedItem.mEdit = 0;
            updatedItem.mDelete = 0;
          }
  
          updatedItem.allowAll = isRowFullyChecked(updatedItem);
          return updatedItem;
        }
        return item;
      });
    });
  };
  
  

  // Handle "Allow All" for a single row
  const handleAllowAllRow = (id: number, checked: boolean) => {
    setPermissions((prev) =>
      prev.map((item) =>
        item.id === id
          ? {
              ...item,
              role: stateData?.code,
              mCreate: checked ? 1 : 0,
              mEdit: checked ? 1 : 0,
              mView: checked ? 1 : 0,
              mDelete: checked ? 1 : 0,
              allowAll: checked,
            }
          : item
      )
    );
  };

  // Handle "Allow All Modules"
  const handleAllowAllModules = (checked: boolean) => {
    setAllowAllModules(checked);
    setPermissions((prev) =>
      prev.map((item) => ({
        ...item,
        role: stateData?.code,
        mCreate: checked ? 1 : 0,
        mEdit: checked ? 1 : 0,
        mView: checked ? 1 : 0,
        mDelete: checked ? 1 : 0,
        allowAll: checked,
      }))
    );
  };

  const tableListHandler = () => {
// console.log('urls',`/api/GetRolePermission?Role=${stateData?.code}`)
    loadTableData({
      url:`/api/GetRolePermission?Role=${stateData?.code}`,
      setState: setPermissions,
      setLoading
  });
}

const saveHandler = (e:any) =>{
  e.preventDefault()
  const jsonData={
    role: stateData?.code,
    rolePermission: permissions
  }
  handleSubmit({
    url: `/api/SaveRolePermission?`,
    method: "POST",
    data: jsonData,
    setLoading,
    // refreshList: tableListHandler(),
    // resetForm: resetForm,
    onSuccess: (response) => {
      console.log("Success:", response);
      tableListHandler();
   
    },
    onError: (error) => console.error("Error:", error),
  });
}
  const columns: ColumnsType<PermissionItem> = [
    {
      title: "Module",
      dataIndex: "name",
      key: "name",
      width: "316px",
      sorter: (a: any, b: any) => a.name.length - b.name.length,
    },
    {
      title: "Create",
      dataIndex: "mCreate",
      render: (_, record) => (
        <label className="checkboxs">
        <input
          type="checkbox"
          checked={record.mCreate === 1}
          onChange={() => handleCheck(record.id, "mCreate")}
        />
        <span className="checkmarks"></span>
        </label>
      ),
    },
    {
      title: "Edit",
      dataIndex: "mEdit",
      render: (_, record) => (
        <label className="checkboxs">
        <input
          type="checkbox"
          checked={record.mEdit === 1}
          onChange={() => handleCheck(record.id, "mEdit")}
        />
         <span className="checkmarks"></span>
        </label>
      ),
    },
    {
      title: "View",
      dataIndex: "mView",
      render: (_, record) => (
        <label className="checkboxs">
        <input
          type="checkbox"
          checked={record.mView === 1}
          onChange={() => handleCheck(record.id, "mView")}
        />
         <span className="checkmarks"></span>
         </label>
      ),
    },
    {
      title: "Delete",
      dataIndex: "mDelete",
      render: (_, record) => (
        <label className="checkboxs">
        <input
          type="checkbox"
          checked={record.mDelete === 1}
          onChange={() => handleCheck(record.id, "mDelete")}
        />
         <span className="checkmarks"></span>
         </label>
      ),
    },
    {
      title: "Allow All",
      dataIndex: "allowAll",
      render: (_, record) => (
        <label className="checkboxs">
        <input
          type="checkbox"
          checked={record.allowAll}
          onChange={(e) => handleAllowAllRow(record.id, e.target.checked)}
        />
        <span className="checkmarks"></span>
        </label>
      ),
    },
  ];

  const filteredData = permissions.filter((item: any) => {
    return columns.some((column: any) => {
      const value = item[column.dataIndex];
      return (
        value &&
        value.toString().toLowerCase().includes(searchQuery.toLowerCase())
      );
    });
  });


  return (
    <div className="page-wrapper">
       <Toast />
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-8">
                  <h4 className="page-title">Permission  <span className="count-title">{filteredData?.length}</span></h4>
                  <h6 className="page-title">Role Name: <span className="text-danger ">{stateData.name}</span></h6>
                </div>
                <div className="col-4 text-end">
                  <div className="head-icons">
                    <CollapseHeader />
                  </div>
                </div>
              </div>
            </div>
            {/* /Page Header */}
            <div className="card">
              <div className="card-header">
                <div className="row">
                  <div className="col-md-5 col-sm-4">
                    <div className="mb-3 mb-sm-0">
                      {/* <h4>
                        Role Name : <span className="text-danger ">{stateData.name}</span>
                      </h4> */}
                      <div className="icon-form mb-3 mb-sm-0">
                      <span className="form-icon">
                        <i className="ti ti-search" />
                      </span>
                      <input
                        type="text"
                        className="form-control"
                        placeholder={`Search Module..`}
                        value={searchQuery}
                        onChange={handleSearchChange}
                      />
                    </div>

                    </div>
                  </div>
                  <div className="col-md-7 col-sm-8 d-flex align-items-center">
                   
                    <div className="col-md-8 col-sm-12"></div>
                    <div className="col-md-4 col-sm-12 text-sm-end">
                      <label className="checkboxs d-flex align-items-center justify-content-sm-end">
                        <input type="checkbox" checked={allowAllModules}
                        onChange={(e) =>
                          handleAllowAllModules(e.target.checked)
                        }/>
                        <span className="checkmarks position-relative d-flex me-2" />
                        Allow All Modules
                      </label>
                    </div>
                  </div>
                </div>
              </div>
              <div className="card-body">
                {/* Roles List */}
                <div className="table-responsive custom-table mb-3">
                <Table
                  columns={columns}
                  dataSource={filteredData}
                  rowKey="id"
                  rights={rights?.mView}
                />

                </div>
               
                <div className="d-flex align-items-center justify-content-end">
                <Link
                  to='/dashboard/deals-dashboard'
                  className="btn btn-light me-2"
                 
                >
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary" onClick={saveHandler}>
                  Create
                </button>
              </div>
                {/* /Roles List */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Permission;
