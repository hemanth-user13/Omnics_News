import React, { useState } from "react";
import axios from "axios";
import Loading from "./loader";

function Covid() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);

  const url = "https://api.covid19api.com/summary"; // Add your API endpoint here

  const handleData = async (e) => {
    e.preventDefault();
    setIsLoaded(true);
    setError(null);
    try {
      const response = await axios.get(url);
      const fetchedData = response.data.Countries; // Assuming the API returns an array of countries under 'Countries'
      setData(fetchedData.slice(0, 20)); // Limit to first 20 records
      console.log(fetchedData);
    } catch (error) {
      setError(error);
    }
    setIsLoaded(false);
  };

  return (
    <div className="container mt-5">
      <h1 className="mb-4">Covid Data</h1>
      <form onSubmit={handleData} className="mb-4">
        <button type="submit" className="btn btn-primary">
          Fetch Data
        </button>
      </form>

      {isLoaded && <Loading />}
      {error && <div className="alert alert-danger">{error.message}</div>}

      {Array.isArray(data) && data.length > 0 ? (
        <table className="table table-bordered table-striped">
          <thead className="thead-dark">
            <tr>
              <th>Country Region</th>
              <th>Cases Confirmed</th>
              <th>Deaths</th>
              <th>Recovered</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.Country}</td>
                <td>{item.TotalConfirmed}</td>
                <td>{item.TotalDeaths}</td>
                <td>{item.TotalRecovered}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No data available</p>
      )}
    </div>
  );
}

export default Covid;
