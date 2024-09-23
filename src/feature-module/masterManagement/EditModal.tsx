import React from 'react';
import { Link } from 'react-router-dom';
import { saveHandler } from './modifyForm';
import useFetch from '../../core/Hooks/useFetch';

interface EditModalProps {
  Header: string;
  inputValue: { [key: string]: string };
  handleInputField: (event: React.ChangeEvent<HTMLInputElement>) => void;
  paramId: any;
  setLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setInputValue: React.Dispatch<React.SetStateAction<{ [key: string]: string }>>;
  RecallFunctionHandler:any
}

const EditModal: React.FC<EditModalProps> = ({ Header, inputValue, handleInputField, paramId, setLoading, setInputValue, RecallFunctionHandler }) => {
  let callFetch = useFetch();

  const getValueKey = (id: string) => {
    switch (id) {
      case "10":
        return { valueKey: 'userType', masterType: 17 };
      case "9":
        return { valueKey: 'source', masterType: 16 };
      case "4":
        return { valueKey: 'purpose', masterType: 6 };
      case "6":
        return { valueKey: 'typeTrade', masterType: 7 };
      case "8":
        return { valueKey: 'location', masterType: 15 };
      default:
        return { valueKey: '', masterType: 0 };
    }
  };

  const { valueKey, masterType } = getValueKey(paramId);
  const inputValueForKey = inputValue[valueKey] || '';

  return (
    <div className="modal fade" id="edit_role" role="dialog">
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Edit</h5>
            <button
              className="btn-close custom-btn-close border p-1 me-0 text-dark"
              data-bs-dismiss="modal"
              aria-label="Close"
            >
              <i className="ti ti-x" />
            </button>
          </div>
          <form onSubmit={(e) => saveHandler(e, valueKey, inputValueForKey, masterType, callFetch, setLoading, setInputValue, RecallFunctionHandler, paramId)}>
            <div className="modal-body">
              <div className="mb-0">
                <label className="col-form-label">
                  {Header} Name <span className="text-danger">*</span>
                </label>
                <input
                  name={valueKey}
                  type="text"
                  className="form-control"
                  value={inputValueForKey}
                  onChange={handleInputField}
                />
              </div>
            </div>
            <div className="modal-footer">
              <div className="d-flex align-items-center justify-content-end m-0">
                <Link
                  to="#"
                  className="btn btn-light me-2"
                  data-bs-dismiss="modal"
                >
                  Cancel
                </Link>
                <button type="submit" className="btn btn-primary">
                  Save Changes
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditModal;
