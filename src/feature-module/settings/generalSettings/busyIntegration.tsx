import React, { useState, useEffect } from "react";
import ImageWithBasePath from "../../../core/common/imageWithBasePath";
import { Link, useLocation } from "react-router-dom";
import { all_routes } from "../../router/all_routes";
import CollapseHeader from "../../../core/common/collapse-header";
import SiderNav from "./SiderNav";
import { useApiHandler } from "../../../core/common/utils/customfunctions";
import SwitchComponent from "../../../core/common/Switch";
import { busyField } from "./inputs";
import { InputField } from "../../../core/common/InputField";
import InputSelect from "../../../core/common/InputSelect";
import Table from "../../../core/common/dataTable/index";
import { Toast } from "../../../core/common/Toaster";
const route = all_routes;
interface Fields {
busyIntegration: boolean;
locationIntegration: boolean;
  oF?: any;
  loading?: boolean;
}

const BusyIntegration = () => {
  const { handleSubmit, modifyDataHandler, loadTableData } = useApiHandler();
  const location = useLocation()
  var rights = location?.state?.sidebarData
  const [loading, setLoading] = useState(false)
  const [formData, setFormData] = useState<Fields>({
    busyIntegration: false,
    locationIntegration: false,
    oF: null,
    loading: false,
  });
  const [rowData, setRowData] = useState<any[]>([]);
  const defaultSelectedRowKeys = rowData
    .filter((row) => row.compSelect === 1)
    .map((row) => row.compCode);
  const [selectedRowKeys, setSelectedRowKeys] = useState(
    defaultSelectedRowKeys
  );
  useEffect(() => {
    tableHandler();
    handleModify()
  }, []);
  useEffect(() => {
    const updatedDefaultSelectedRowKeys = rowData
      .filter((row) => row.compSelect === 1)
      .map((row) => row.compCode);

    setSelectedRowKeys(updatedDefaultSelectedRowKeys);
  }, [rowData]);
  const selectHandler = (selectedOption: any, selectName: string) => {
    console.log("Selected:==>", selectedOption, selectName);
    setFormData((prev) => ({ ...prev, [selectName]: selectedOption }));
  };

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => {
    setFormData((prev) => ({ ...prev, [fieldName]: e.target.checked }));
  };

  const tableHandler = () => {
    loadTableData({
      url: `/api/getCompDetails`,
      setState: setRowData,
      setLoading
    //   setLoading: (loading: boolean) =>
    //     setFormData((prevState) => ({ ...prevState, loading:false })),
    });
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const updatedRowsData = rowData.map((row) => ({
        ...row,
        compSelect: selectedRowKeys.includes(row.compCode) ? 1 : 0,
      }));
    const selectedRows = updatedRowsData.filter((row) => row.compSelect === 1);
    const selectedData = selectedRows.map((selectedRow) => ({
        compCode: selectedRow.compCode,
        compDB: selectedRow.compDB,
        fy: selectedRow.fy,
        compSelect: selectedRow.compSelect,
        CompName: selectedRow.compName,
      }));
    const jsonData = {
        Code: formData?.oF?.value,
        Name: formData?.oF?.label,
        BusyIntegration: formData?.busyIntegration ? 1 : 0,
        LocationIntegration: formData?.locationIntegration ? 1 : 0,
        CompConfig: selectedData,
    };
    console.log("user Data", JSON.stringify(jsonData));
    handleSubmit({
      url: "/api/SaveOFConfig?",
      method: "POST",
      data: jsonData,
      setLoading: () => setFormData((prev) => ({ ...prev, loading: false })),
      // refreshList: tableListHandler(url),
      //   navigateTo
      // resetForm: resetForm,
      onSuccess: (response) => {
        console.log("Success:", response);
        handleModify()
      },
      onError: (error) => console.error("Error:", error),
    });
  };

  const handleModify = async () => {
    const url = `/api/GetConfigDet`;

    await modifyDataHandler({
      url,
      setLoading: () => setFormData((prev) => ({ ...prev, loading: false })),
      onSuccess: (response:any) => {
        console.log("Data successfully modified:", response);
        const data = response[0]
        console.log('data', data)
        // setFormData(data)
        setFormData({
            busyIntegration: data?.busyIntegration === 1 ? true : false,
            locationIntegration: data?.locationIntegration === 1 ? true : false,
            oF: {value: data?.code, label: data?.name},
            // loading: false,
        })
      },
      onError: (status:any, message:string) => {
        console.error("Error occurred:", message);
      },
    });
  };

  const onSelectChange = (selectedKeys: any, selectedRows: any) => {
    // Update selectedRowKeys state
    setSelectedRowKeys(selectedKeys);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: onSelectChange,
  };

  const columns = [
    {
      title: "Company Name",
      dataIndex: "compName",
      key: "compName",
      width: "316px",
      sorter: (a: any, b: any) => a.compName.length - b.compName.length,
    },
    {
      title: "Company Code",
      dataIndex: "compCode",
      key: "compCode",
      width: "316px",
      sorter: (a: any, b: any) => a.compCode.length - b.compCode.length,
    },
    {
      title: "Financial Year",
      dataIndex: "fy",
      key: "fy",
      width: "316px",
      sorter: (a: any, b: any) => a.fy.length - b.fy.length,
    },
  ];
  return (
    <div className="page-wrapper">
        <Toast/>
      <div className="content">
        <div className="row">
          <div className="col-md-12">
            {/* Page Header */}
            <div className="page-header">
              <div className="row align-items-center">
                <div className="col-sm-4">
                  <h4 className="page-title">Settings</h4>
                </div>
                <div className="col-sm-8 text-sm-end">
                  <div className="head-icons">
                    <CollapseHeader />
                  </div>
                </div>
              </div>
            </div>
            {/* /Page Header */}

            <div className="row">
              {/* <div className="col-xl-3 col-lg-12 theiaStickySidebar">
                <SiderNav />
              </div> */}
              <div className="col-xl-12 col-lg-12">
                {/* Settings Info */}
                <div className="card">
                  <div className="card-body">
                    <h4 className="fw-semibold mb-3">Busy Integration</h4>
                    <form onSubmit={handleFormSubmit}>
                      <div className="border-bottom mb-3">
                        <div className="row">
                          {busyField.map((field: any, idx) => (
                            <div className="col-md-4 mb-3" key={idx}>
                              {(() => {
                                switch (field.type) {
                                  case "checkbox":
                                    return (
                                      <SwitchComponent
                                        id={field.fieldName}
                                        label={field.label}
                                        checked={Boolean(
                                          formData[
                                            field.fieldName as keyof Fields
                                          ]
                                        )}
                                        onChange={(e) =>
                                          handleCheckboxChange(
                                            e,
                                            field.fieldName
                                          )
                                        }
                                      />
                                    );
                                  case "select":
                                    return (
                                      <InputSelect
                                        selectName={field.label}
                                        star="*"
                                        options={field.options || []}
                                        value={
                                          formData[
                                            field.fieldName as keyof Fields
                                          ]
                                        }
                                        // value={field.options.find((option:any) => option.value === formData[field.fieldName as keyof Fields]?.value) || null}
                                        onChange={(option: any) =>
                                          selectHandler(option, field.fieldName)
                                        }
                                        // required={field.required}
                                      />
                                    );
                                  default:
                                    return null;
                                }
                              })()}
                            </div>
                          ))}
                        </div>
                        <Table
                          rowSelection={rowSelection}
                          columns={columns}
                          dataSource={rowData}
                          rowKey={(record: any) => record.compCode}
                          loading={loading}
                          rights={rights?.mView}
                        />
                      </div>

                      <div>
                        <Link to="#" className="btn btn-light me-2">
                          Cancel
                        </Link>
                        <button type="submit" className="btn btn-primary">
                          Save Changes
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                {/* /Settings Info */}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BusyIntegration;
