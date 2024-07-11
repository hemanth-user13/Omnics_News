import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Loading from './loader';

function Practice() {
    const [data, setData] = useState([]);
    const [error, setError] = useState(null);
    const [isloading, setLoading] = useState(false);

    const url = "https://reqres.in/api/users?page=2";

    useEffect(() => {
        handleData(); // Fetch data when component mounts
    }, []);

    const handleData = async () => {
        setLoading(true);
        setError(null);
        try {
            const response = await axios.get(url);
            setData(response.data.data);
        } catch (error) {
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    const deleteData = (id) => {
        console.log(id);
        const updatedData = data.filter((user) => user.id !== id);
        setData(updatedData);
    };

    return (
        <div>
            <form onSubmit={handleData} className="mb-4">
                <button type="submit" className="btn btn-primary" style={{ marginLeft: "20px" }}>
                    Get Data
                </button>
            </form>
            {error && <div className="alert alert-danger">{error.message}</div>}
            {isloading && <Loading />}
            <table className="table" border="10">
                <thead>
                    <tr>
                        <th>id</th>
                        <th>email</th>
                        <th>first name</th>
                        <th>last name</th>
                        <th>image</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    {data.map((item, index) => (
                        <tr key={index}>
                            <td>{item.id}</td>
                            <td>{item.email}</td>
                            <td>{item.first_name}</td>
                            <td>{item.last_name}</td>
                            <td><img src={item.avatar} alt="avatar" /></td>
                            <td>
                                <button onClick={() => deleteData(item.id)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Practice;
