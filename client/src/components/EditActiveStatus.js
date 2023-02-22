import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./EditActive.css";

const EditActiveStatus = () => {
  const [data, setData] = useState([]);
  const loadData = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/get/tblCompany"
    );
    setData(response.data);
  };

  const handleEditClick = async (id, isActive) => {
    try {
      const response = await axios.put(
        `http://localhost:5000/api/update/tblCompany/${id}`,
        {
          IsActive: !isActive, // Invert the current value of IsActive
        }
      );
      loadData();
      toast.success("Updated successfully!");
    } catch (error) {
      toast.error(`Failed to update ${error.message}`);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div style={{ marginTop: "50px" }}>
      <Link to="/">
        <button className="btn btn-view">Back to Home</button>
      </Link>
      <h2>Change Licence Activation Status</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>SNo.</th>
            <th style={{ textAlign: "center" }}>Company</th>
            <th style={{ textAlign: "center" }}>LastLogin</th>
            <th style={{ textAlign: "center" }}>IsActive</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.id}>
                <td>{index + 1}</td>
                {/* <td>{item.id}</td> */}
                <td>{item.Company}</td>
                <td>{item.LastLogin}</td>
                <td>{JSON.parse(item.IsActive) ? "Active" : "Inactive"}</td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() =>
                      handleEditClick(item.id, JSON.parse(item.IsActive))
                    }
                  >
                    Edit
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default EditActiveStatus;

{
  /* <td>
                  <button className="btn btn-edit">Edit</button>
                </td> */
}

{
  /* <Link to="/addContact">
        <button className="btn btn-contact">Add Contact</button>
      </Link> */
}

// const deleteContact = (id) => {
//   if (window.confirm("Are you sure you want to delete this contact ?")) {
//     axios.delete(`http://localhost:5000/api/remove/${id}`);
//     toast.success("Contact Deleted Succesfully");
//     setTimeout(() => loadData(), 500);
//   }
// };

{
  /* <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </button> */
}

{
  /* <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link> */
}
