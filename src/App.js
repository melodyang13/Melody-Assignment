import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/App.css";


const LeaveTable = () => {
  const leaveData = [
    { name: "DARREN ESPIRITU", company: "TRONER ENTERPRISES INC.", leaveType: "Sick Leave", dateFiled: "11-12-2024", startDate: "12-12-2024", endDate: "12-12-2024" },
    { name: "JANE DOE", company: "GLOBAL TECH INC.", leaveType: "Vacation Leave", dateFiled: "10-11-2024", startDate: "15-11-2024", endDate: "20-11-2024" },
    { name: "JOHN SMITH", company: "ACME CORPORATION", leaveType: "Maternity Leave", dateFiled: "08-11-2024", startDate: "01-12-2024", endDate: "31-12-2024" },
    { name: "ALICE JOHNSON", company: "NEXTGEN TECH", leaveType: "Sick Leave", dateFiled: "05-10-2024", startDate: "10-10-2024", endDate: "12-10-2024" },
    { name: "ROBERT BROWN", company: "INNOVATE SOLUTIONS", leaveType: "Vacation Leave", dateFiled: "15-09-2024", startDate: "20-09-2024", endDate: "25-09-2024" },
    { name: "EMILY DAVIS", company: "SOFTTECH INC.", leaveType: "Paternity Leave", dateFiled: "01-09-2024", startDate: "05-09-2024", endDate: "10-09-2024" },
    { name: "DAVID WILSON", company: "BLUE SKY CORP", leaveType: "Sick Leave", dateFiled: "10-08-2024", startDate: "15-08-2024", endDate: "17-08-2024" },
    { name: "LINDA MARTIN", company: "TECHWAVE LTD.", leaveType: "Vacation Leave", dateFiled: "20-07-2024", startDate: "25-07-2024", endDate: "30-07-2024" },
    { name: "MICHAEL LEE", company: "FASTLANE SYSTEMS", leaveType: "Sick Leave", dateFiled: "05-07-2024", startDate: "10-07-2024", endDate: "12-07-2024" },
    { name: "SARAH CLARK", company: "VERTEX TECHNOLOGIES", leaveType: "Maternity Leave", dateFiled: "25-06-2024", startDate: "01-07-2024", endDate: "31-07-2024" },
    { name: "JAMES HARRIS", company: "UPGRADE TECH", leaveType: "Sick Leave", dateFiled: "15-06-2024", startDate: "20-06-2024", endDate: "25-06-2024" },
    { name: "PATRICIA WALKER", company: "DIGITAL SOLUTIONS", leaveType: "Vacation Leave", dateFiled: "10-05-2024", startDate: "15-05-2024", endDate: "20-05-2024" }
  ];
  
  const [searchExpanded, setSearchExpanded] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const entriesPerPage = 8;
  const filteredData = leaveData.filter((item) =>
    item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    item.company.toLowerCase().includes(searchTerm.toLowerCase())
  );
  const indexOfLastEntry = currentPage * entriesPerPage;
  const indexOfFirstEntry = indexOfLastEntry - entriesPerPage;
  const currentEntries = filteredData.slice(indexOfFirstEntry, indexOfLastEntry);
  const totalPages = Math.ceil(filteredData.length / entriesPerPage);
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  

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
      <button className="btn custom-btn rounded-5">
        <i className="bi bi-hand-thumbs-up-fill px-2"></i>APPROVE
      </button>
      <button className="btn btn-danger rounded-5">
        <i className="bi bi-hand-thumbs-down-fill px-2"></i>REJECT
      </button>
      <button className="btn btn-orange rounded-5">
        <i className="bi bi-x px-2"></i>CANCEL
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
            </tr>
          </thead>
          <tbody>
            {currentEntries.map((item, index) => (
              <tr key={index}>
                <td><input type="checkbox" /></td>
                <td>{item.name}</td>
                <td>{item.company}</td>
                <td>{item.leaveType}</td>
                <td>{item.dateFiled}</td>
                <td>{item.startDate}</td>
                <td>{item.endDate}</td>
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
