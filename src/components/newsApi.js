import React, { useEffect, useState } from 'react';
import SimpleLoader from './loader'; // Assuming 'loader' is the correct path to your SimpleLoader component
import '../styles/newsapi.css';

function NewsApi() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true); // State to manage loading state

  const url = 'https://newsapi.org/v2/everything?q=bitcoin&apiKey=1549a131bccd4b8db0522952b3401db0';

  async function getData() {
    try {
      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const data = await response.json();
      setData(data);
      console.log(data);
    } catch (error) {
      console.error('Error fetching data:', error);
    //   setLoading(false); // Ensure loading is set to false on error as well
    }finally{
        setLoading(false);
        console.log("data")
    }
  }

  useEffect(() => {
    getData();
  }, []);

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="container mt-4">
      <h1 style={{ textAlign: "center", fontFamily: 'Old newspaper font, sans-serif' }}>Today's News</h1>
      {loading ? (
        <SimpleLoader fullLoader={true} height="400px" isBackground={false} /> // Adjust height and background as needed
      ) : (
        <div className="row">
          {data && data.articles.map((item, index) => (
            <div key={index} className="col-md-4 mb-4">
              <div className="card h-100 animate__animated animate__fadeIn">
                <img className="card-img-top mx-auto mt-3" src={item.urlToImage} alt="Card image cap" style={{ width: '75%', height: 'auto', maxHeight: '200px' }} />
                <div className="card-body">
                  <h5 className="card-title">{item.title}</h5>
                  <p className="card-text">{item.description}</p>
                  <p className='card-text'><strong>Published At:</strong> {formatDate(item.publishedAt)}</p>
                  <a href={item.url} className="btn btn-primary" target="_blank" rel="noopener noreferrer">Read more</a>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default NewsApi;
