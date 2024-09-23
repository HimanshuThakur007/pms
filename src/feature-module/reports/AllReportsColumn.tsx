import { Link } from "react-router-dom";
import { all_routes } from "../router/all_routes";
import ImageWithBasePath from "../../core/common/imageWithBasePath";
const route = all_routes

export const Leadcolumns =()=> [
    {
      title: "Lead Nunber",
      dataIndex: "leadNo",
      key: "leadNo",
      sorter: (a: any, b: any) =>
        a.leadNo.length - b.leadNo.length,
    },
    {
      title: "Sub Lead",
      dataIndex: "subLead",
      key: "subLead",
      sorter: (a: any, b: any) =>
        a.subLead.length - b.subLead.length,

    },
    {
      title: "Phone",
      dataIndex: "mobNo",
      key: "mobNo",
      sorter: (a: any, b: any) => a.mobNo.length - b.mobNo.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
      sorter: (a: any, b: any) => a.email.length - b.email.length,
    },
    {
      title: "Lead Status",
      dataIndex: "leadStatus",
      key: "leadStatus",
      sorter: (a: any, b: any) =>
        a.leadStatus.length - b.leadStatus.length,

      render: (leadStatus: string) => (
        <span
          className={`${
            leadStatus === "Close"
              ? "badge badge-pill badge-status bg-success"
              : leadStatus === "Not Contacted"
              ? "badge badge-pill badge-status bg-pending"
              : leadStatus === "Pending"
              ? "badge badge-pill badge-warning bg-warning"
              : leadStatus === "Reschedule"
              ? "badge badge-pill badge-danger bg-danger"
              : leadStatus === "Converted"
              ? "badge badge-pill badge-info bg-info"
              :''
          }`}
        >
          {leadStatus}
        </span>
      ),
    },
    {
      title: "Lead Owner",
      dataIndex: "customer",
      key: "customer",
      sorter: (a: any, b: any) => a.customer.length - b.customer.length,
    },
    {
      title: "Source",
      dataIndex: "source",
      key: "source",
      sorter: (a: any, b: any) => a.source.length - b.source.length,
    },
    {
      title: "Created Date",
      dataIndex: "leadDate",
      key: "leadDate",
      sorter: (a: any, b: any) =>
        a.leadDate.length - b.leadDate.length,
    },
  ];