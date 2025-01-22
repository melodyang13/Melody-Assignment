import React, { useState , useEffect} from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/App.css";
import { useDispatch, useSelector } from 'react-redux';
import { fetchLeaveData } from './features/leaveSlice';
import { approveLeave, rejectLeave, cancelLeave } from './features/leaveSlice';

const LeaveTable = () => {
  const dispatch = useDispatch();
  const leaveData = useSelector((state) => state.leave.data);
  const status = useSelector((state) => state.leave.status);
  const error = useSelector((state) => state.leave.error);

  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 8;
  const [selectedRows, setSelectedRows] = useState([]); 
  const filteredData = leaveData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);



   const handleCheckboxChange = (leaveId) => {
    if (selectedRows.includes(leaveId)) {
      setSelectedRows(selectedRows.filter((id) => id !== leaveId)); // Uncheck
    } else {
      setSelectedRows([...selectedRows, leaveId]); // Check
    }
  };
  
  const handleApprove = () => {
    selectedRows.forEach((leaveId) => {
      dispatch(approveLeave(leaveId));
    });
    setSelectedRows([]); 
  };

  const handleReject = () => {
    selectedRows.forEach((leaveId) => {
      dispatch(rejectLeave(leaveId));
    });
    setSelectedRows([]); 
  };

  const handleCancel = () => {
    selectedRows.forEach((leaveId) => {
      dispatch(cancelLeave(leaveId));
    });
    setSelectedRows([]); 
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success'; 
      case 'Rejected':
        return 'danger'; 
      case 'Canceled':
        return 'warning'; 
      default:
        return 'light'; 
    }
  };

  useEffect(() => {
    dispatch(fetchLeaveData());
  }, [dispatch]);

  if (status === 'loading') {
    return <div>Loading...</div>;
  }

  if (status === 'failed') {
    return <div>Error: {error}</div>;
  }

  
  return (
    <div className="container mt-5 border rounded-5 border-mute p-2">
    
    <div className="hdr-container d-flex align-items-center flex-wrap ">
      <div>
        <h4 className="fw-bold">Leave Report</h4>
        <p>View Leave Report</p>
      </div>
     
      <div className="d-flex align-items-center gap-3 flex-wrap">
        <div className={`search-container d-flex align-items-center ${searchExpanded ? "expanded" : ""}`}>
          <button
            className="btn search-btn btn-light border-gradient-primary mx-2"
            onClick={() => setSearchExpanded(!searchExpanded)}
          >
            <i className="bi bi-search"></i>
          </button>
          {searchExpanded && (
            <input
              type="text"
              className="form-control search-input"
              placeholder="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          )}
        </div>
        <button className="btn custom-btn"><i className="bi bi-plus"></i></button>
        <button className="btn btn-light border-secondary">
          <i className="bi bi-grid-3x3-gap px-2"></i>SHOW MORE
        </button>
      </div>
    </div>
    
  
    <div className="action-container d-flex gap-2 flex-wrap mb-3">
      <button className="btn custom-btn rounded-5" onClick={handleApprove}>
        <i className="bi bi-hand-thumbs-up-fill px-2"></i>APPROVE
      </button>
      <button className="btn btn-danger rounded-5" onClick={handleReject}>
        <i className="bi bi-hand-thumbs-down-fill px-2"></i>REJECT
      </button>
      <button className="btn btn-orange rounded-5" onClick={handleCancel}>
        <i className="bi bi-sx px-2"></i>CANCEL
      </button>
    </div>
  
  
      <div className="table-responsive custom-scrollbar">
        <table className="table">
          <thead className="thead custom-th">
            <tr>
              <th><input type="checkbox" /></th>
              <th>Name</th>
              <th>COMPANY</th>
              <th>LEAVE TYPE</th>
              <th>DATE FILED</th>
              <th>START DATE</th>
              <th>END DATE</th>
              <th>STATUS</th>
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((item, index) => (
              <tr key={item.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedRows.includes(item.id)}
                    onChange={() => handleCheckboxChange(item.id)}
                  />
                </td>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>{item.leaveType}</td>
                <td>{item.dateFiled}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
                <td> <span className={`badge rounded-pill text-bg-${getStatusColor(item.status)}`}>
                {!item.status ? "Pending" : item.status}
        </span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="pagination-bd my-4 rounded-pill">
        <div className="d-flex justify-content-between align-items-center bg-white rounded-pill p-3 flex-wrap">
          <div>
            Showing {currentPage} of {totalPages} pages
          </div>
          <nav>
            <ul className="pagination mb-0 d-flex justify-content-between gap-2">
              <li className={`page-item ${currentPage === 1 ? "disabled" : ""}`}>
                <button className="page-link rounded-end-5" onClick={() => paginate(currentPage - 1)}>
                  <i className="bi bi-chevron-left text-info"></i> Previous
                </button>
              </li>
              {Array.from({ length: totalPages }, (_, i) => (
                <li key={i} className={`page-item ${currentPage === i + 1 ? "active" : ""}`}>
                  <button className="page-link rounded-circle" onClick={() => paginate(i + 1)}>{i + 1}</button>
                </li>
              ))}
              <li className={`page-item ${currentPage === totalPages ? "disabled" : ""}`}>
                <button className="page-link rounded-start-5" onClick={() => paginate(currentPage + 1)}>
                  Next <i className="bi bi-chevron-right"></i>
                </button>
              </li>
            </ul>
          </nav>
        </div>
      </div>
    </div>
  );
};

export default LeaveTable;
