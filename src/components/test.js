import React, { useState } from 'react';
import axios from 'axios';
import Loading from './loader';

function Test() {
  const [data, setData] = useState([]);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const url = 'https://coronavirus.m.pipedream.net/';

  const handleData = async (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    setIsLoading(true); // Set loading state to true when fetching starts
    setError(null); // Clear any previous errors
    try {
      // Fetch data from the API
      const response = await axios.get(url);
      // Update state with the fetched data
      setData(response.data.rawData || []);

    } catch (error) {
      setError(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <h1 className="mb-4" style={{textAlign:"center"}}>Covid Data</h1>
      <form onSubmit={handleData} className="mb-4">
        <button type="submit" className="btn btn-primary" style={{marginLeft:"20px"}}>
          Fetch Data
        </button>
      </form>

      
      {error && <div className="alert alert-danger">{error.message}</div>}
      {isLoading && <Loading />}
      <table className="table">
        <thead>
          <tr>
            <th>Country</th>
            <th>Confirmed</th>
            <th>Deaths</th>
            <th>Territory</th>
            <th>Latitude</th>
            <th>longitude</th>
            <th>Incident Rate</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item, index) => (
            <tr key={index}>
              <td>{item.Country_Region}</td>
              <td>{item.Confirmed}</td>
              <td>{item.Deaths}</td>
              <td>{item.Combined_Key}</td>
              <td>{item.Lat}</td>
              <td>{item.Long_}</td>
              <td>{item.Incident_Rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Test;
