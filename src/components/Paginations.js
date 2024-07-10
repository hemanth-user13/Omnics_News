import React, { useEffect, useState } from 'react';
import SimpleLoader from './loader';
import '../styles/pagination.css';
import PaginationControlled from './page'; // Ensure this is the correct path

function Paginations() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [articlesPerPage, setArticlesPerPage] = useState(10);
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
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        getData();
    }, []);

    const handlePageChange = (event, value) => {
        setCurrentPage(value);
        console.log(value)
    };

    const handleRecordsPerPageChange = (value) => {
        setArticlesPerPage(Number(value));
        setCurrentPage(1); 
    };

    const startIndex = (currentPage - 1) * articlesPerPage;
    const endIndex = startIndex + articlesPerPage;
    const totalPages = data ? Math.ceil(data.articles.length / articlesPerPage) : 0;

    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="container mt-4">
            <h1 style={{ textAlign: "center", fontFamily: 'Old newspaper font, sans-serif' }}>Try Pagination</h1>
            <div className="d-flex justify-content-between align-items-center mb-3">
                <div className="dropdown">
                    <button className="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
                        Records per page
                    </button>
                    <ul className="dropdown-menu">
                        <li><button className="dropdown-item" type="button" onClick={() => handleRecordsPerPageChange(10)}>10 records</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => handleRecordsPerPageChange(20)}>20 records</button></li>
                        <li><button className="dropdown-item" type="button" onClick={() => handleRecordsPerPageChange(30)}>30 records</button></li>
                    </ul>
                </div>
                <PaginationControlled count={totalPages} page={currentPage} onChange={handlePageChange} />
            </div>
            {loading ? (
                <SimpleLoader fullLoader={true} height="400px" isBackground={false} />
            ) : (
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
            )}
        </div>
    );
}

export default Paginations;
