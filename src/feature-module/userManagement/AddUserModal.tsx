import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { InputField } from "../../core/common/InputField";
import InputSelect from "../../core/common/InputSelect";
import { FormDataType, MasterDataType } from "./type";
import { useApiHandler } from "../../core/common/utils/customfunctions";
import { useAuthContext } from "../../core/common/AuthContext";
import Loader from "../../core/common/loader";

const Block_List = [
  { label: "Yes", value: 1 },
  { label: "No", value: 0 },
];

const AddUserModal = ({
  tableListHandler,
  modifyCode,
  sendResetForm,
  setModifyCode,
  url,
  displayName,
}: any) => {
  const { state } = useAuthContext();
  const { UserID, Name } = state.decryptedData;
  let userId = UserID;
  const { loadDropdownOptions, handleSubmit, modifyDataHandler } =
    useApiHandler();
  const [loading, setLoading] = useState(false);
  const [masterData, setMasterData] = useState<MasterDataType>({});
  const [formData, setFormData] = useState<FormDataType>({
    name: "",
    mobile: "",
    email: "",
    password: "",
    repeatPassword: "",
    site: [],
    role: null,
    reporting: false,
    manager: [],
    block_list: null,
    master_101: null,
    master_102: null,
    master_104: null,
    master_109: null,
    master_0: null,
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeatPassword, setShowRepeatPassword] = useState(false);
// console.log("data-url from save",url)
  useEffect(() => {
    if (displayName === "User") {
      loadMultipleMasters();
      sendResetForm(resetForm);
    }
  }, [displayName]);

  useEffect(() => {
    if (modifyCode != 0 && displayName === "User") {
      handleModify();
    }
  }, [modifyCode]);

  const selectHandler = (selectedOption: any, selectName: string) => {
    // console.log("Selected:==>", selectedOption, selectName);
    setFormData((prev) => ({ ...prev, [selectName]: selectedOption }));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => setFormData((prev) => ({ ...prev, [fieldName]: e.target.value }));

  const handleCheckboxChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    fieldName: string
  ) => setFormData((prev) => ({ ...prev, [fieldName]: e.target.checked }));

  const loadMultipleMasters = async () => {
    const masterTypes = [101, 104, 109, 102, 0];
    setLoading(true);
    try {
      await Promise.all(
        masterTypes.map(async (type) => {
          const url =
            type === 0
              ? `/api/GetUMaster?Mastertype=${type}&code=${userId}`
              : `/api/GetMaster1?Mastertype=${type}`;
          await loadDropdownOptions({
            url,
            setState: setMasterData,
            setLoading,
            stateKey: `master_${type}`,
          });
        })
      );
    } catch (error) {
      console.error("Error loading master data:", error);
    } finally {
      setLoading(false);
    }
  };
  const resetForm = () => {
    setFormData({
      name: "",
      mobile: "",
      email: "",
      password: "",
      repeatPassword: "",
      site: [],
      role: null,
      reporting: false,
      manager: [],
      block_list: null,
      master_101: null,
      master_102: null,
      master_104: null,
      master_109: null,
      master_0: null,
    });
    setModifyCode(0);
  };

  const handleFormSubmit = (e: any) => {
    e.preventDefault();
    const site = formData?.site?.map((item: any) => ({
      code: item.value || 0,
      // name: item.label||''
    }));
    const reportingManager = formData?.manager?.map((item: any) => ({
      code: item.value || 0,
      // name: item.label ||''
    }));

    const jsonData = {
      Code: modifyCode || 0,
      Name: formData?.name || "",
      Mobile: formData?.mobile,
      Email: formData?.email || "",
      Password: formData?.password || "",
      Block: formData?.block_list?.value,
      Designation: formData?.master_102?.value,
      Department: formData?.master_101?.value,
      Site: 0,
      Role: formData?.master_109?.value,
      reportingTo: formData?.reporting === true ? 1 : 0,
      tuser: reportingManager,
      sUser: site,
    };
    // console.log("user Data", JSON.stringify(jsonData));
    handleSubmit({
      url: "/api/SaveUserMaster?",
      method: "POST",
      data: jsonData,
      setLoading,
      // refreshList: tableListHandler(url),
      //   navigateTo
      resetForm: resetForm,
      onSuccess: (response) => {
        tableListHandler(url);
        console.log("Success:", response);
      },
      onError: (error) => console.error("Error:", error),
    });
  };

  const handleModify = async () => {
    const url = `/api/GetUserList?UserCode=${modifyCode}`;

    await modifyDataHandler({
      url,
      setLoading,
      onSuccess: (response: any) => {
        // console.log("Data successfully modified:", response);
        const data = response[0];
        console.log('data-modified',data)
        const manager = data?.tUser?.map((item: any) => ({
          value: item.code,
          label: item.name,
        }));
        const site = data?.sUser?.map((item: any) => ({
          value: item.code,
          label: item.name,
        }));

        const blockLabel = Block_List.find(
          (item) => item.value === data.block
        )?.label;
        setFormData({
          name: data.name,
          mobile: data.mobile,
          email: data.email,
          password: data.password,
          repeatPassword: data.password,
          site: site,
          role: null,
          reporting: data?.reportingTo === 1 ? true : false,
          manager: manager,
          block_list: { value: data?.block, label: blockLabel },
          master_101: { value: data?.department, label: data?.departmentName },
          master_102: {
            value: data?.designation,
            label: data?.designationName,
          },
          master_104: null,
          master_109: { value: data?.role, label: data?.roleName },
          master_0: null,
        });
      },
      onError: (status: any, message: string) => {
        console.error("Error occurred:", message);
      },
    });
  };

  return (
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="offcanvas_add"
    >
      {loading && <Loader isSaving={loading} />}
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">{`${
          modifyCode === 0 ? "Add New" : "Edit"
        } User`}</h5>
        <button
          type="button"
          className="btn-close custom-btn-close border p-1 me-0 d-flex align-items-center justify-content-center rounded-circle"
          data-bs-dismiss="offcanvas"
          aria-label="Close"
        >
          <i className="ti ti-x" />
        </button>
      </div>
      <div className="offcanvas-body">
        <form onSubmit={handleFormSubmit}>
          <div className="row">
            {["name", "mobile", "email"].map((field, idx) => (
              <div className="col-md-6" key={idx}>
                <InputField
                  name={field}
                  labelName={field.charAt(0).toUpperCase() + field.slice(1)}
                  type={field === "email" ? "email" : "text"}
                  required
                  value={formData[field]}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    handleChange(e, field)
                  }
                />
              </div>
            ))}

            {[
              {
                name: "Department",
                options: masterData.master_101,
                fieldName: "master_101",
              },
              { name: "Block", options: Block_List, fieldName: "block_list" },
              {
                name: "Designation",
                options: masterData.master_102,
                fieldName: "master_102",
              },
              {
                name: "Site",
                options: masterData.master_104,
                isMulti: true,
                fieldName: "site",
              },
              {
                name: "Role",
                options: masterData.master_109,
                fieldName: "master_109",
              },
            ].map((select, idx) => (
              <div className="col-md-6" key={idx}>
                <InputSelect
                  selectName={select.name}
                  star="*"
                  options={select.options || []}
                  //   value={
                  //     formData[fieldName]
                  //     // formData[`master_${idx + 101}`] ||
                  //     // formData[select.name.toLowerCase().replace(" ", "_")]
                  //   }
                  value={formData[select.fieldName]}
                  onChange={(option: any) =>
                    selectHandler(
                      option,
                      select.fieldName
                      //   select.name.toLowerCase().replace(" ", "_")
                    )
                  }
                  required
                  isMulti={select.isMulti}
                />
              </div>
            ))}

            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Password <span className="text-danger">*</span>
                </label>
                <div className="icon-form-end">
                  <span
                    className="form-icon"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    <i
                      className={`ti ${showPassword ? "ti-eye" : "ti-eye-off"}`}
                    />
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    className="form-control"
                    value={formData.password}
                    onChange={(e) => handleChange(e, "password")}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="mb-3">
                <label className="col-form-label">
                  Repeat Password <span className="text-danger">*</span>
                </label>
                <div className="icon-form-end">
                  <span
                    className="form-icon"
                    onClick={() => setShowRepeatPassword(!showRepeatPassword)}
                  >
                    <i
                      className={`ti ${
                        showRepeatPassword ? "ti-eye" : "ti-eye-off"
                      }`}
                    />
                  </span>
                  <input
                    type={showRepeatPassword ? "text" : "password"}
                    className="form-control"
                    value={formData.repeatPassword}
                    onChange={(e) => handleChange(e, "repeatPassword")}
                  />
                </div>
              </div>
            </div>

            <div className="col-md-6">
              <div className="form-check form-switch">
                <input
                  className="form-check-input"
                  type="checkbox"
                  role="switch"
                  id="flexSwitchCheckDefault"
                  checked={formData.reporting}
                  onChange={(e) => handleCheckboxChange(e, "reporting")}
                />
                <label
                  className="form-check-label"
                  htmlFor="flexSwitchCheckDefault"
                >
                  Reporting Manager
                </label>
              </div>
            </div>

            {formData.reporting && (
              <div className="col-md-6">
                <InputSelect
                  selectName="Manager"
                  star="*"
                  options={masterData.master_0 || []}
                  value={formData.manager}
                  onChange={(option: any) => selectHandler(option, "manager")}
                  required
                  isMulti={true}
                />
              </div>
            )}
          </div>

          <div className="d-flex align-items-center justify-content-end">
            <Link
              to="#"
              className="btn btn-light me-2"
              data-bs-dismiss="offcanvas"
            >
              Cancel
            </Link>
            <button
              type="submit"
              className="btn btn-primary"
              // onClick={handleFormSubmit}
            >
              Create
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddUserModal;
