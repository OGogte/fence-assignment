import { useState } from 'react';
import './App.css';
import Draggable from './components/Draggable';

function App() {

  const [parentsNum, setParentsNum] = useState(1); //Manage number of Draggable Components to show
  const [showAlert, setShowAlert] = useState(true); //Flag to decide whether to show alert  
  
  //function to handle adding a new parent component
  const handleAddingParent = () => {
    setParentsNum(parentsNum + 1)
    //check if we need to show alert
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
         <Draggable root={true} id={parentsNum} ind={1} handleDefault={handleDefault} parentsNum={parentsNum} />
      </div>
    </div>
  );
}

export default App;
