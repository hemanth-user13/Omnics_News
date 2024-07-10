import React, { useEffect, useState } from 'react';
import SimpleLoader from './loader';
import '../styles/headline.css'

function Headlines() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [fetching, setFetching] = useState(false); // Track fetching state
  const articlesPerPage = 9;

  const url = `https://newsapi.org/v2/top-headlines?country=us&apiKey=1549a131bccd4b8db0522952b3401db0`;

  async function getNewData(page) {
    try {
      const response = await fetch(`${url}&page=${page}`);
      const newData = await response.json();
      if (page === 1) {
        setData(newData);
      } else {
        setData((prevData) => ({
          ...prevData,
          articles: [...prevData.articles, ...newData.articles],
        }));
      }
      setLoading(false);
      setFetching(false); // Reset fetching state
    } catch (error) {
      console.log("Error fetching data:", error);
      setLoading(false);
      setFetching(false); // Reset fetching state
    }
  }

  useEffect(() => {
    getNewData(currentPage);
  }, [currentPage]); // Reload data when currentPage changes

  const formatDate = (dateString) => {
    const options = { year: 'numeric', month: 'long', day: 'numeric' };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  const handleNextPage = () => {
    setCurrentPage(currentPage + 1);
    setFetching(true); // Set fetching state when clicking "Next"
  };

  const handlePrevPage = () => {
    setCurrentPage(currentPage - 1);
    setFetching(true); // Set fetching state when clicking "Previous"
  };

  const startIndex = (currentPage - 1) * articlesPerPage;
  const endIndex = startIndex + articlesPerPage;

  return (
    <div className="container mt-4">
      <h1 style={{ textAlign: "center", fontFamily: 'Old newspaper font, sans-serif' }}>Today's News</h1>
      {loading ? (
        <SimpleLoader fullLoader={true} height="400px" isBackground={false} />
      ) : (
        <div>
          <h2 style={{ color: "rgb(48, 27, 238)", textAlign: "center" }}>Headlines of The Day</h2>
          <div className="text-center mt-4">
            {currentPage > 1 && (
              <button className="btn btn-primary mr-2" onClick={handlePrevPage} disabled={fetching}>Previous</button>
            )}
            {data && data.articles.length > endIndex && (
              <button className="btn btn-primary mr-3" onClick={handleNextPage} disabled={fetching}>Next</button>
            )}
          </div>
          <div className="row">
            {data && data.articles.slice(startIndex, endIndex).map((item, index) => (
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
          {/* <div className="text-center mt-4">
            {currentPage > 1 && (
              <button className="btn btn-primary mr-2" onClick={handlePrevPage} disabled={fetching}>Previous</button>
            )}
            {data && data.articles.length > endIndex && (
              <button className="btn btn-primary" onClick={handleNextPage} disabled={fetching}>Next</button>
            )}
          </div> */}
          {fetching && (
            <div className="text-center mt-4">
              <SimpleLoader height="100px" isBackground={false} />
            </div>
          )}
        </div>
      )}
    </div>
  );
}

export default Headlines;
