import React, { useState } from 'react';

function Main() {
  const [isActive, setIsActive] = useState(false);

  const handleClick = () => {
    setIsActive(!isActive);
  };

  return (
    <div>
      {/* <h1>Welcome to the Main Page</h1>
      <button id="displayButton" onClick={handleClick}>
        {isActive ? 'Hide Data' : 'Display Data'}
      </button>
      <div id="dataDiv">
        {isActive && "This is the data displayed after button click."}
      </div> */}
    </div>
  );
}

export default Main;
