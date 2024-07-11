import React, { useState } from "react";
import axios from "axios";
import Loading from "./loader";

function PostalData() {
  const [pincode, setPincode] = useState("");
  const [postalData, setPostalData] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e) => {
    setPincode(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await axios.get(
        `https://api.postalpincode.in/pincode/${pincode}`
      );
      const data = response.data[0];
      if (data.Status === "Success") {
        setPostalData(data.PostOffice);
      } else {
        setError("Invalid Pincode");
        setPostalData([]);
      }
    } catch (error) {
      setError("An error occurred while fetching data");
      setPostalData([]);
    }

    setLoading(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Search Postal Data</h1>
      <form onSubmit={handleSubmit} className="mb-4">
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            value={pincode}
            onChange={handleInputChange}
            placeholder="Enter Pincode"
            required
          />
          <button type="submit" className="btn btn-primary">
            Submit
          </button>
        </div>
      </form>

      {loading && <Loading />}
      {error && <div className="alert alert-danger">{error}</div>}

      {postalData.length > 0 && (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Name</th>
              <th>BranchType</th>
              <th>DeliveryStatus</th>
              <th>Circle</th>
              <th>District</th>
              <th>Division</th>
              <th>Region</th>
              <th>Block</th>
              <th>State</th>
              <th>Country</th>
              <th>Pincode</th>
            </tr>
          </thead>
          <tbody>
            {postalData.map((postOffice, index) => (
              <tr key={index}>
                <td>{postOffice.Name}</td>
                <td>{postOffice.BranchType}</td>
                <td>{postOffice.DeliveryStatus}</td>
                <td>{postOffice.Circle}</td>
                <td>{postOffice.District}</td>
                <td>{postOffice.Division}</td>
                <td>{postOffice.Region}</td>
                <td>{postOffice.Block}</td>
                <td>{postOffice.State}</td>
                <td>{postOffice.Country}</td>
                <td>{postOffice.Pincode}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}

export default PostalData;