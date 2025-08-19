/* eslint-disable react/prop-types */
/* eslint-disable react/react-in-jsx-scope */
import { useState } from "react";
import "./ViewResignModal.css";
import { concludeResignation } from "../../utils/apis.js";

const ViewResignModal = ({
  isOpen,
  onClose,
  employeeData,
  fetchResignations,
}) => {
  const token = localStorage.getItem("token");

  const [resignDate, setResignDate] = useState(employeeData.lwd);
  if (!isOpen) return null;

  const concludeResignationHandler = async (option) => {
    await concludeResignation(employeeData._id, option, resignDate, token);
    await fetchResignations();
    onClose(false);
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form
          className="modal-content-child"
          onSubmit={(e) => {
            e.preventDefault();
          }}
        >
          <h1 className="modal-heading">Resigned Form</h1>
          <label className="resign-modal-label">
            Employee Name :
            <span className="modal-reason">
              {employeeData.employeeId.username}
            </span>
          </label>
          <label className="resign-modal-label">
            Resign Date :
            <span className="modal-reason">{employeeData.lwd}</span>
          </label>

          <label className="resign-modal-label">Approved Resign Date :</label>
          <input
            type="date"
            onChange={(evt) => {
              setResignDate(evt.target.value);
            }}
            className="approved-resign-input"
            value={resignDate}
          />
          <div className="modal-buttons">
            <button className="accept-btn" onClick={() => onClose(false)}>
              Close
            </button>
            <button
              onClick={() => concludeResignationHandler(false)}
              className="accept-btn"
            >
              Reject
            </button>
            <button
              onClick={() => concludeResignationHandler(true)}
              className="accept-btn"
            >
              Accept
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ViewResignModal;
