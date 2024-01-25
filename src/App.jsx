import React, { useState } from 'react';
import './App.css';
import Draggable from './components/Draggable';

function App() {

  const [parentsNum, setParentsNum] = useState(0);
  const [showAlert, setShowAlert] = useState(true);
  const handleAddingParent = () => {
    setParentsNum(parentsNum + 1)
    if (showAlert && ((parentsNum + 1) * 100 > window.innerWidth || (parentsNum + 1) * 100 > window.innerHeight)) {
      alert('The box dimensions will be reduced to help them fit better inside the window. This might affect how the box looks.')
      setShowAlert(false);
    }
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
