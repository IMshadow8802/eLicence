import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const EditLicense = () => {
  const [data, setData] = useState([]);
  const [selectedId, setSelectedId] = useState(null);
  const [license, setLicense] = useState("");

  const loadData = async () => {
    const response = await axios.get(
      "http://localhost:5000/api/get/tblLicence"
    );
    setData(response.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const handleEdit = (id, license) => {
    setSelectedId(id);
    setLicense(license);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/update/tblLicence/${selectedId}`,
        {
          Licence: license,
        }
      );
      toast.success("License updated successfully");
      setSelectedId(null);
      setLicense("");
      loadData();
    } catch (error) {
      console.log(error);
      toast.error("Error updating license");
    }
  };

  return (
    <div style={{ marginTop: "50px" }}>
      <Link to="/">
        <button className="btn btn-contact">Back to Home</button>
      </Link>
      <h2>Change Number of Licences</h2>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>Sno.</th>
            <th style={{ textAlign: "center" }}>Company</th>
            <th style={{ textAlign: "center" }}>Licence</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => {
            return (
              <tr key={item.Id}>
                <td>{index + 1}</td>
                <td>{item.Company}</td>
                <td>
                  {selectedId === item.Id ? (
                    <form onSubmit={handleSubmit}>
                      <input
                        type="text"
                        value={license}
                        onChange={(event) => setLicense(event.target.value)}
                      />
                      <button className="btn btn-edit" type="submit">
                        Save
                      </button>
                    </form>
                  ) : (
                    item.Licence
                  )}
                </td>
                <td>
                  <button
                    className="btn btn-edit"
                    onClick={() => handleEdit(item.Id, item.Licence)}
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

export default EditLicense;

// import React, { useState, useEffect } from "react";
// import { Link } from "react-router-dom";
// import { toast } from "react-toastify";
// import axios from "axios";
// import "./EditLicence.css";

// const EditLicense = () => {
//   const [data, setData] = useState([]);
//   const [selectedId, setSelectedId] = useState(null);
//   const [license, setLicense] = useState("");

//   const loadData = async () => {
//     const response = await axios.get(
//       "http://localhost:5000/api/get/tblLicence"
//     );
//     setData(response.data);
//   };

//   useEffect(() => {
//     loadData();
//   }, []);

//   const handleEdit = (id, license) => {
//     setSelectedId(id);
//     setLicense(license);
//   };

//   const handleSubmit = async (event) => {
//     event.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:5000/api/update/tblLicence/${selectedId}`,
//         {
//           Licence: license,
//         }
//       );
//       toast.success("License updated successfully");
//       setSelectedId(null);
//       setLicense("");
//       loadData();
//     } catch (error) {
//       console.log(error);
//       toast.error("Error updating license");
//     }
//   };

//   return (
//     <div style={{ marginTop: "100px" }}>
//       <h2>Change Number of Licences</h2>
//       <table className="styled-table">
//         <thead>
//           <tr>
//             <th style={{ textAlign: "center" }}>SNo</th>
//             <th style={{ textAlign: "center" }}>Company</th>
//             <th style={{ textAlign: "center" }}>Licence</th>
//             <th style={{ textAlign: "center" }}>Action</th>
//           </tr>
//         </thead>
//         <tbody>
//           {data.map((item, index) => {
//             return (
//               <tr key={item.Id}>
//                 <td>{index + 1}</td>
//                 <td>{item.Company}</td>
//                 <td>
//                   {selectedId === item.Id ? (
//                     <form onSubmit={handleSubmit}>
//                       <input
//                         type="text"
//                         value={license}
//                         onChange={(event) => setLicense(event.target.value)}
//                       />
//                       <button className="btn btn-edit" type="submit">
//                         Save
//                       </button>
//                     </form>
//                   ) : (
//                     item.Licence
//                   )}
//                 </td>
//                 <td>
//                   <button
//                     className="btn btn-edit"
//                     onClick={() => handleEdit(item.Id, item.Licence)}
//                   >
//                     Edit
//                   </button>
//                 </td>
//               </tr>
//             );
//           })}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default EditLicense;
