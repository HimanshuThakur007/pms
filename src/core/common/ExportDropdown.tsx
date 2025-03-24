import { Link } from "react-router-dom";

const ExportDropdown = ({ onExportExcel, onExportPDF }: any) => (
    <div className="dropdown me-2">
      <Link to="#" className="dropdown-toggle" data-bs-toggle="dropdown">
        <i className="ti ti-package-export me-2" />
        Export
      </Link>
      <div className="dropdown-menu dropdown-menu-end">
        <ul>
          {/* <li>
            <Link to="#" className="dropdown-item" onClick={(e)=>{onExportPDF();
              e.preventDefault()
            }}>
              <i className="ti ti-file-type-pdf text-danger me-1" />
              Export as PDF
            </Link>
          </li> */}
          <li>
            <Link to="#" className="dropdown-item" onClick={(e)=>{
              e.preventDefault()
              onExportExcel();
              }}>
              <i className="ti ti-file-type-xls text-green me-1" />
              Export as Excel
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );
  
  export default ExportDropdown;