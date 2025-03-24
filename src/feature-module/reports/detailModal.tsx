import Table from "../../core/common/dataTable/index";
import { detailColumn } from "./reportColumn";

const DetailModal = ({data}:any) => {
    let columns = detailColumn
  return (
    <div
      className="offcanvas offcanvas-end offcanvas-large"
      tabIndex={-1}
      id="detail_add"
    >
      <div className="offcanvas-header border-bottom">
        <h5 className="fw-semibold">Task Details</h5>
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
        <form>
       <Table dataSource={data} columns={columns}/>
        </form>
      </div>
    </div>
  );
};

export default DetailModal;
