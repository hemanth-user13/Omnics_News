import React, { useState } from 'react'

function practice_props() {
  return (
    <div>
        <SendData name="hemanth " age={23}/>
        <Counter/>
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



export default practice_props
