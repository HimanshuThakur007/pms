import React, { useEffect, useState } from "react";
import { Table, Checkbox, InputNumber, Input, Radio } from "antd";
import { Link } from "react-router-dom";

interface Attribute {
  key: string;
  label: string;
  description: string;
  checked: boolean;
  rating?: number;
  comments?: string;
}
interface FormData {
  [key: string]: any;
}
interface Rating {
  rating: number;
  label: string;
  description: string;
}

interface ReportingModalProps {
  // showModal: boolean;
  // handelClose: any;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
  modifyCode: any;
  formData: FormData;
  handleChange: (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
    fieldName: string
  ) => void;
  data: any;
  setData: any;
  expandedKeys: any;
  setExpandedKeys: any;
}

const ratingData: Rating[] = [
  {
    rating: 5,
    label: "Sets New Standards",
    description: "Consistently delivers exceptional performance.",
  },
  {
    rating: 4,
    label: "Exceeds Expectations",
    description: "Frequently exceeds performance expectations.",
  },
  {
    rating: 3,
    label: "Meets Expectations",
    description: "Consistently achieves performance standards.",
  },
  {
    rating: 2,
    label: "Below Expectations",
    description: "Occasionally falls short of performance standards.",
  },
  {
    rating: 1,
    label: "Needs Improvement",
    description: "Performance is consistently below expectations.",
  },
];

const SectionB: React.FC<ReportingModalProps> = ({
  formData,
  setFormData,
  handleChange,
  modifyCode,
  data,
  setData,
  expandedKeys,
  setExpandedKeys,
}) => {
  const [errors, setErrors] = useState<{
    [key: string]: { rating?: string; comments?: string };
  }>({});

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setData((prev: any) =>
      prev.map((attr: any) => (attr.key === key ? { ...attr, checked } : attr))
    );
    setExpandedKeys(
      checked
        ? [...expandedKeys, key]
        : expandedKeys.filter((k: any) => k !== key)
    );
  };

  // const handleRatingChange = (key: string, value?: number) => {
  //   setData((prev:any) =>
  //     prev.map((attr:any) => (attr.key === key ? { ...attr, rating: value } : attr))
  //   );
  // };
  const handleRatingChange = (key: string, value?: number) => {
    setData((prev: any) =>
      prev.map((attr: any) =>
        attr.key === key ? { ...attr, rating: value } : attr
      )
    );

    setErrors((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        rating: value ? "" : "Rating is required",
      },
    }));
  };

  // const handleCommentsChange = (key: string, value: string) => {
  //   setData((prev:any) =>
  //     prev.map((attr:any) =>
  //       attr.key === key ? { ...attr, comments: value } : attr
  //     )
  //   );
  // };
  const handleCommentsChange = (key: string, value: string) => {
    setData((prev: any) =>
      prev.map((attr: any) =>
        attr.key === key ? { ...attr, comments: value } : attr
      )
    );

    setErrors((prev) => ({
      ...prev,
      [key]: {
        ...prev[key],
        comments: value.trim() ? "" : "Comments are required",
      },
    }));
  };

  useEffect(() => {
    const filteredData = data?.filter(
      (attr: any) => attr.rating !== undefined && attr.rating > 0
    );
    const totalB = filteredData.reduce(
      (sum: any, attr: any) => sum + (attr.rating || 0),
      0
    );

    const sectionATotal = Number(formData?.sectionAtotal || 0);

    const overallScore = sectionATotal + totalB * 0.15;

    setFormData((prev: any) => ({
      ...prev,
      reportingData: filteredData,
      sectionBtotal: (totalB * 0.15)?.toFixed(2),
      totalScore: overallScore.toFixed(2),
    }));
  }, [data]);

  const columns = [
    {
      title: "Select",
      dataIndex: "checked",
      render: (_: boolean, record: Attribute) => (
        <Checkbox
          checked={record.checked}
          onChange={(e) => handleCheckboxChange(record.key, e.target.checked)}
        />
      ),
    },
    {
      title: "Label",
      dataIndex: "label",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  ];

  const ratingColumn = [
    {
      title: "Rating",
      dataIndex: "rating",
    },
    {
      title: "Label",
      dataIndex: "label",
    },
    {
      title: "Description",
      dataIndex: "description",
    },
  ];
  const handleRadioChange = (e: any) => {
    setFormData((prev: any) => ({
      ...prev,
      appraiser: e.target.value,
    }));
  };

  return (
    <div className="accordion-item border-top rounded mb-3">
      <div className="accordion-header">
        <Link
          to="#"
          className="accordion-button accordion-custom-button rounded bg-blue fw-medium text-dark"
          data-bs-toggle="collapse"
          data-bs-target="#address"
          style={{ backgroundColor: "blue" }}
        >
          <span className="avatar avatar-md rounded text-dark border me-2">
            <i className="ti ti-map-pin-cog fs-20" />
          </span>
          <span className="text-white">
            SECTION B – Behavioral Attribute Review 2024
          </span>
        </Link>
      </div>
      <div
        className="accordion-collapse collapse"
        id="address"
        data-bs-parent="#main_accordion"
      >
        <div className="accordion-body border-top">
          <span className="mt-1">
            <h6 className="mb-1">
              This section defines the key behavioral attributes that are
              essential to the achievement of organization’s goals.
            </h6>
            {/* <p className="mb-1">
              {" "}
               The behavioral attributes on a scale of 1 to 5, where 1
              represents the lowest and 5 represents.{" "}
            </p> */}
            <p className="mb-1">
              Here’s a detailed 5-point scale to review behavioural attributes:
            </p>
          </span>
          <div className="mb-4 mt-1">
            <Table
              dataSource={ratingData}
              columns={ratingColumn}
              pagination={false}
            />
          </div>
          <h5 className="mb-2">Behavioral Attributes</h5>
          <div className="mt-2">
            <Table
              columns={columns}
              dataSource={data}
              expandable={{
                expandedRowKeys: expandedKeys,
                onExpand: (expanded, record) => {
                  setExpandedKeys(
                    expanded
                      ? [...expandedKeys, record.key]
                      : expandedKeys.filter((k: any) => k !== record.key)
                  );
                },
                rowExpandable: (record) => record.checked,
                expandedRowRender: (record) => (
                  <div style={{ paddingLeft: 50 }}>
                    <label>Rating (1-5): </label>
                    <InputNumber
                      min={1}
                      max={5}
                      value={record.rating}
                      onChange={(value) =>
                        handleRatingChange(record.key, value as number)
                      }
                    />
                    {errors[record.key]?.rating && (
                      <div className="text-danger">
                        {errors[record.key].rating}
                      </div>
                    )}
                    <br />
                    <br />
                    <label>Comments:</label>
                    <Input.TextArea
                      rows={2}
                      value={record.comments}
                      onChange={(e) =>
                        handleCommentsChange(record.key, e.target.value)
                      }
                    />
                    {errors[record.key]?.comments && (
                      <div className="text-danger">
                        {errors[record.key].comments}
                      </div>
                    )}
                  </div>
                ),
              }}
              pagination={false}
              rowKey="key"
            />
          </div>
          <div className="mb-3">
            <h6>Section B Total (Out of 15%): {formData?.sectionBtotal}</h6>
          </div>

          <div className="accordion-header ">
            <Link
              to="#"
              className="accordion-button bg-blue rounded fw-medium text-dark"
            >
              <span className="text-white ">
                {" "}
                Total Score (Section A 85% + Section B 15%):{" "}
                {Number(formData?.totalScore || 0).toFixed(2)}
              </span>
            </Link>
          </div>

          {/* Total Score (Section A + Section B) */}
          {/* <div className="mb-3">
            <h6>
              Total Score (Section A 85% + Section B 15%):{" "}
              {Number(formData?.totalScore || 0).toFixed(2)}
            </h6>
          </div> */}

          {/* Radio Buttons */}
          <div className="mb-3">
            <label className="fw-bold">Promotion Guidelines</label>

            <li>
              While recommending promotion, please ensure that person has
              completed at least 2 years in the organization.
            </li>
            <li>
              Promotion reason should be justified and aligned with employee
              performance and potential.
            </li>
            <li>
              {" "}
              For Promotion Eligibility overall performance score should be &lt;
              70%
            </li>

            <li>
            When recommending an employee for promotion, it is essential for HOD/ Manager to ensure a fair and
impartial evaluation among all team members.
            </li>
            <label className="fw-bold">Recommendation for Promotion</label>
            <Radio.Group
              onChange={handleRadioChange}
              value={formData?.appraiser}
            >
              <Radio value={1}>
                Yes - Please give Justification to support promotion
                recommendation along with new role / added responsibilities
                proposed in view of promotion.
              </Radio>
              <Radio value={0}>No</Radio>
            </Radio.Group>
            {formData?.appraiser === 1 && (
              <>
                <div className="col-md-6 mt-2">
                  <label>Upload Documents</label>
                  <input
                    name="excel2"
                    // labelName="Upload Documents"
                    type="file"
                    // required={
                    //   formData?.highestQualification != null &&
                    //   formData?.highestQualification?.value != "NA" &&
                    //   true
                    // }
                    // value={formData.excel2 || ""}
                    onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                      handleChange(e, "excel3")
                    }
                    // dangerTag="*"
                    // disabled={modifyCode?.code > 0}
                  />
                </div>
              </>
            )}
          </div>

          {formData?.appraiser === 1 && (
            <div className="mb-3">
              <label className="fw-bold mt-1">
                Appraiser Comments / Remarks{" "}
              </label>
              <textarea
                className="form-control"
                name="remark"
                value={formData.remark ?? ""}
                onChange={(e: any) => handleChange(e, "remark")}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SectionB;
