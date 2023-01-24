import React, { useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css'
import {
  Dropdown,
  DropdownItem,
  DropdownMenu,
  DropdownToggle,
} from "reactstrap";


function App() {
  const [dropDown, setDropDown] = useState(false);
  const [numPersonas, setNumPersonas] = useState(0);

  function handleDropDown(){
    setDropDown(!dropDown);
  }

  return (
    <div className="flex flex-row container justify-center bg-amber-100">
      <div className="mr-10">calendario</div>

      <Dropdown isOpen={dropDown} toggle={handleDropDown} className="ml-10 mr-10">
        <DropdownToggle className="bg-white text-black"> {numPersonas} - adultos </DropdownToggle>
        <DropdownMenu>
          <DropdownItem onClick={() => setNumPersonas(1)}> 1 persona </DropdownItem>
          <DropdownItem onClick={() => setNumPersonas(2)}> 2 persona </DropdownItem>
          <DropdownItem onClick={() => setNumPersonas(3)}> 3 persona </DropdownItem>
          <DropdownItem onClick={() => setNumPersonas(4)}> 4 persona </DropdownItem>
        </DropdownMenu>
      </Dropdown>

      <button className="ml-10 p-2 border border-black bg-green-600">Buscar</button>
   
    </div>
  );
}

export default App;
