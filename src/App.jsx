import React, { useState } from 'react';
import './App.css';
import Draggable from './components/Draggable';

function App() {

  const [parentsNum, setParentsNum] = useState(0);

  const handleAddingParent = () => {
    setParentsNum(parentsNum + 1)
  }

  const handleDefault = (e) => {
    e.preventDefault()
  }

  return (
    <div onDragEnter={handleDefault} onDragOver={handleDefault} className="App">
      <div>
        <button onClick={handleAddingParent}>Add Parent</button>
      </div>
      <div>
        {parentsNum > 0 && <Draggable root={true} id={parentsNum} ind={1} handleDefault={handleDefault} parentsNum={parentsNum} />}
      </div>
    </div>
  );
}

export default App;
