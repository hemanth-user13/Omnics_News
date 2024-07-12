import React, { useState } from 'react'

function practice_props() {
  return (
    <div>
        <SendData name="hemanth " age={23}/>
        <Counter/>
        <Fetchphotos/>
    </div>
  )
}



function SendData({name,age}){
    return (
        <h1>hello {name}, how are you and your age is {age} right!!</h1>
    )

}



const Counter=()=>{
    const [count,setCount]=useState(0);
    const incrment=()=>{
        setCount(count+1);
    }
    const decrment=()=>{
        if(count>0){
            setCount(count-1)
        }
    }
    return (
        <div>
            <h1>Counter {count}</h1>
            <button onClick={incrment}>+</button>
            <button onClick={decrment}>-</button>
        </div>
    )
}

const Fetchphotos = async () => {
    const url = 'https://maps-data.p.rapidapi.com/photos.php?business_id=0x47e66e2964e34e2d%3A0x8ddca9ee380ef7e0&lang=en&country=us';
    
    const options = {
        method: 'GET',
        headers: {
            'X-Rapidapi-Key': '1e63ab5ec4msh5d1e28ab5953857p150d29jsn814412a49142',
            'X-Rapidapi-Host': 'maps-data.p.rapidapi.com'
        }
    };
    
    try {
        const response = await fetch(url, options);
        const data = await response.json();
        console.log(data);
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};


Fetchphotos();


export default practice_props
