import React, { useState } from "react";
import { Table, Checkbox, InputNumber, Input } from "antd";
import { Modal, Button } from "react-bootstrap";

interface Attribute {
  key: string;
  label: string;
  description: string;
  checked: boolean;
  rating?: number;
  comments?: string;
}

interface Rating {
  rating: number;
  label: string;
  description: string;
}

interface ReportingModalProps {
  showModal: boolean;
  handelClose: any;
}

const attributes: Attribute[] = [
    { key: '1', label: 'Job Knowledge & Functional Skills', description: 'Demonstrates expertise in their area of work, effectively applying technical and functional knowledge to achieve results.', checked: false },
    { key: '2', label: 'Innovation & Continuous Improvement', description: 'Thinks creatively, challenges the status quo, and actively seeks better solutions to enhance processes, products, or performance.', checked: false },
    { key: '3', label: 'Results Orientation', description: 'Drives performance by setting goals, staying focused, and consistently delivering high-quality outcomes efficiently.', checked: false },
    { key: '4', label: 'Process & Quality Orientation', description: 'Follows structured processes, maintains attention to detail, and emphasizes quality to ensure consistent and accurate outputs.', checked: false },
    { key: '5', label: 'Teamwork & Collaboration', description: 'Works effectively with others, values diverse perspectives, builds positive relationships, and contributes to achieving collective goals.', checked: false },
    { key: '6', label: 'Problem-Solving & Critical Thinking', description: 'Analyses situations objectively, evaluates alternatives, and makes sound decisions to resolve issues efficiently.', checked: false },
    { key: '7', label: 'Adaptability & Flexibility', description: 'Adjusts quickly to changing demands, remains effective under pressure, and thrives in dynamic environments.', checked: false },
    { key: '8', label: 'Time Management & Prioritization', description: 'Efficiently organizes tasks, balances multiple responsibilities, and meets deadlines without compromising quality.', checked: false },
    { key: '9', label: 'Professionalism, Ethical Conduct & Respect for Others', description: 'Demonstrates integrity, accountability, and professionalism; consistently treats colleagues, peers, and teams with respect and dignity.', checked: false },
    { key: '10', label: 'Dependability, Reliability & Discipline', description: 'Upholds a disciplined approach to tasks, meeting work commitments, ensuring reliability and accountability in all responsibilities.', checked: false }
  ];

const ratingData: Rating[] = [
  { rating: 5, label: "Sets New Standards", description: "Consistently delivers exceptional performance." },
  { rating: 4, label: "Exceeds Expectations", description: "Frequently exceeds performance expectations." },
  { rating: 3, label: "Meets Expectations", description: "Consistently achieves performance standards." },
  { rating: 2, label: "Below Expectations", description: "Occasionally falls short of performance standards." },
  { rating: 1, label: "Needs Improvement", description: "Performance is consistently below expectations." },
];

const ReportingModal = ({ showModal, handelClose }: ReportingModalProps) => {
  const [data, setData] = useState<Attribute[]>(attributes);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const handleCheckboxChange = (key: string, checked: boolean) => {
    setData((prev) => prev.map((attr) => (attr.key === key ? { ...attr, checked } : attr)));
    setExpandedKeys(checked ? [...expandedKeys, key] : expandedKeys.filter((k) => k !== key));
  };

  const handleRatingChange = (key: string, value?: number) => {
    setData((prev) => prev.map((attr) => (attr.key === key ? { ...attr, rating: value } : attr)));
  };

  const handleCommentsChange = (key: string, value: string) => {
    setData((prev) => prev.map((attr) => (attr.key === key ? { ...attr, comments: value } : attr)));
  };

  const columns = [
    {
      title: "Select",
      dataIndex: "checked",
      render: (_: any, record: Attribute) => (
        <Checkbox checked={record.checked} onChange={(e) => handleCheckboxChange(record.key, e.target.checked)} />
      ),
    },
    { title: "Label", dataIndex: "label" },
    { title: "Description", dataIndex: "description" },
  ];

  return (
    <Modal  show={showModal} onHide={handelClose} 
    // fullscreen
    size="xl" 
    // dialogClassName="modal-90w"
    >
    
      <Modal.Header closeButton>
        <Modal.Title>SECTION B – Behavioral Attribute Review</Modal.Title>
      </Modal.Header>
    
      <Modal.Body>
      <span className='mt-1'>
            <h6 className='mb-1'>
              This section defines the key behavioral attributes that are
              essential to the achievement of organization’s goals.
            </h6>
           <p className='mb-1'> Rate the behavioral attributes on a scale of 1 to 5, where 1
            represents the lowest and 5 represents the highest. </p>
            <p className='mb-1'>Here’s a detailed 5-point scale to review behavioural attributes:</p>
          </span>
        <Table
          dataSource={ratingData}
          columns={[
            { title: "Rating", dataIndex: "rating" },
            { title: "Label", dataIndex: "label" },
            { title: "Description", dataIndex: "description" },
          ]}
          pagination={false}
          rowKey="rating"
        />
        <h5 className="mt-3">Behavioral Attributes</h5>
        <Table
          columns={columns}
          dataSource={data}
          expandable={{
            expandedRowKeys: expandedKeys,
            onExpand: (expanded, record) => {
              setExpandedKeys(expanded ? [...expandedKeys, record.key] : expandedKeys.filter((k) => k !== record.key));
            },
            rowExpandable: (record) => record.checked,
            expandedRowRender: (record) => (
              <div>
                <label>Rating (1-5): </label>
                <InputNumber min={1} max={5} value={record.rating} onChange={(value: any) => handleRatingChange(record.key, value)} />
                <br />
                <label>Comments:</label>
                <Input.TextArea rows={2} value={record.comments} onChange={(e) => handleCommentsChange(record.key, e.target.value)} />
              </div>
            ),
          }}
          pagination={false}
          rowKey="key"
        />
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handelClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default ReportingModal;
