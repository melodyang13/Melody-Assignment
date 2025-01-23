import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { createNewLeave } from "../features/leaveSlice";
import { ToastContainer, toast } from "react-toastify";
import "../App.css";

const NewLeaveModal = () => {
  const dispatch = useDispatch();
  const [newLeave, setNewLeave] = useState({
    name: "",
    company: "",
    leaveType: "",
    dateFiled: "", 
    startDate: "",
    endDate: "",
  });

  const handleFormSubmit = (e) => {
    e.preventDefault();
    const currentDate = new Date().toISOString().split("T")[0]; 

    const updatedLeave = {
      ...newLeave,
      dateFiled: currentDate, 
    };

    dispatch(createNewLeave(updatedLeave));

    toast.success("Leave request submitted successfully!", {
      position: "top-center",
      autoClose: 1000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose: () => {
        const modal = document.getElementById("createLeaveModal");
        const bootstrapModal = window.bootstrap.Modal.getInstance(modal);
        bootstrapModal.hide();
      },
    });

    setNewLeave({
      name: "",
      company: "",
      leaveType: "",
      dateFiled: "",
      startDate: "",
      endDate: "",
    });
  };

  return (
    <div
      className="modal fade"
      id="createLeaveModal"
      tabIndex="-1"
      aria-labelledby="createLeaveModalLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog modal-dialog-centered modal-dialog-scrollable">
        <div className="modal-content">
          <div className="modal-header custom-bg text-white">
            <h5 className="modal-title" id="createLeaveModalLabel">
              Create New Leave
            </h5>
            <button
              type="button"
              className="btn-close btn-close-white"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <form onSubmit={handleFormSubmit}>
              <div className="mb-3">
                <label htmlFor="name" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  value={newLeave.name}
                  onChange={(e) =>
                    setNewLeave({ ...newLeave, name: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="company" className="form-label">
                  Company
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="company"
                  value={newLeave.company}
                  onChange={(e) =>
                    setNewLeave({ ...newLeave, company: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="leaveType" className="form-label">
                  Leave Type
                </label>
                <select
                  className="form-select"
                  id="leaveType"
                  value={newLeave.leaveType}
                  onChange={(e) =>
                    setNewLeave({ ...newLeave, leaveType: e.target.value })
                  }
                  required
                >
                  <option value="">Select Leave Type</option>
                  <option value="Sick Leave">Sick Leave</option>
                  <option value="Vacation Leave">Vacation Leave</option>
                  <option value="Emergency Leave">Emergency Leave</option>
                  <option value="Maternity Leave">Maternity Leave</option>
                  <option value="Paternity Leave">Paternity Leave</option>
                </select>
              </div>
              <div className="mb-3">
                <label htmlFor="startDate" className="form-label">
                  Start Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="startDate"
                  value={newLeave.startDate}
                  onChange={(e) =>
                    setNewLeave({ ...newLeave, startDate: e.target.value })
                  }
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="endDate" className="form-label">
                  End Date
                </label>
                <input
                  type="date"
                  className="form-control"
                  id="endDate"
                  value={newLeave.endDate}
                  onChange={(e) =>
                    setNewLeave({ ...newLeave, endDate: e.target.value })
                  }
                  required
                />
              </div>
              <button type="submit" className="btn  custom-btn w-100">
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default NewLeaveModal;