import React, { useState } from 'react';

function Ondrag() {
    const [inputData, setInputData] = useState('');
    const [box1Data, setBox1Data] = useState([]);
    const [box2Data, setBox2Data] = useState([]);
    const [draggedItem, setDraggedItem] = useState(null);

    const handleChange = (e) => {
        setInputData(e.target.value);
    };

    const handleSubmit = () => {
        setBox1Data([...box1Data, inputData]);
        setInputData('');
    };

    const handleDragStart = (item, box) => {
        setDraggedItem({ item, box });
    };

    const handleDrop = (box) => {
        if (draggedItem) {
            const { item, box: sourceBox } = draggedItem;

            if (sourceBox === 'box1') {
                setBox1Data(box1Data.filter(i => i !== item));
            } else {
                setBox2Data(box2Data.filter(i => i !== item));
            }

            if (box === 'box1') {
                setBox1Data([...box1Data, item]);
                console.log(box1Data)
            } else {
                setBox2Data([...box2Data, item]);
                console.log(box2Data)
            }
        }

        setDraggedItem(null);
    };

    const handleDragOver = (e) => {
        e.preventDefault();
    };

    return (
        <div>
            <input type="text" value={inputData} onChange={handleChange} />
            <button onClick={handleSubmit}>Submit</button>
            <div
                onDrop={() => handleDrop('box1')}
                onDragOver={handleDragOver}
                style={{ border: '1px solid black', padding: '10px', margin: '10px', minHeight: '100px' }}
            >
                <h3>Box 1</h3>
                {box1Data.map((item, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={() => handleDragStart(item, 'box1')}
                        style={{ padding: '5px', border: '1px solid grey', margin: '5px', cursor: 'grab' }}
                    >
                        {item}
                    </div>
                ))}
            </div>
            <div
                onDrop={() => handleDrop('box2')}
                onDragOver={handleDragOver}
                style={{ border: '1px solid black', padding: '10px', margin: '10px', minHeight: '100px' }}
            >
                <h3>Box 2</h3>
                {box2Data.map((item, index) => (
                    <div
                        key={index}
                        draggable
                        onDragStart={() => handleDragStart(item, 'box2')}
                        style={{ padding: '5px', border: '1px solid grey', margin: '5px', cursor: 'grab' }}
                    >
                        {item}
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Ondrag;
