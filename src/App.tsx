import { Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

import Webvis from './Webvis';
import './App.css';

let myContext: webvis.ContextAPI;
let isWebvisReady = false;

// handleWebvisReady: it handles the actions after loading webvis
const handleWebvisReady = async (ctx: webvis.ContextAPI) => {
  if (!isWebvisReady) {
    console.log('Initialize webvis setup...');
    myContext = ctx;
    isWebvisReady = true;
    const btn = document.getElementById('addCubeBtn') as HTMLButtonElement;
    btn.disabled = false;
  }
};

const addCube = async () => {
  // add new cube model to the scene
  console.log('adding cube');

  let nodeId = myContext.add('urn:x-i3d:shape:box');
  // enable the model to be visible on the scene
  await myContext.setProperty(nodeId, webvis.Property.ENABLED, true);
  const btn = document.getElementById('addCubeBtn') as HTMLButtonElement;
  btn.disabled = true;
};

function App() {
  const { pathname } = useLocation();
  // getting the hub url from the env variables
  const hub_url = process.env.REACT_APP_URl_HUB;

  return (
    <>
      <div>
        <nav>
          <Link to='/'>Home</Link>
          <Link to='/about'>About</Link>
        </nav>

        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/about' element={<About />} />
        </Routes>
      </div>
      {/* hide webvis instance when user leaves main page */}
      <div className={pathname === '/' ? 'viewer' : 'viewer --hidden'}>
        <Webvis
          webvisJS={hub_url ? hub_url : ''}
          onWebvisReady={handleWebvisReady}
        />
        <button id='addCubeBtn' onClick={addCube}>
          add cube
        </button>
      </div>
    </>
  );
}

export default App;
