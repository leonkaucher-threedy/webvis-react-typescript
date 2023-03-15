import { Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

import Webvis from './Webvis';
import './App.css';
import { setGlobalWebvisContext } from './WebvisContext';

// handleWebvisReady: it handles the actions after loading webvis
const handleWebvisReady = async (ctx: webvis.ContextAPI) => {
  // setting the context as aglobal one to use it
  setGlobalWebvisContext(ctx);
  console.debug('Initialize webvis setup...');
  // add new cube model to the scene
  let nodeId = ctx.add('urn:x-i3d:shape:box');
  // enable the model to be visible on the scene
  await ctx.setProperty(nodeId, webvis.Property.ENABLED, true);
  console.debug('added cube');
};

function App() {
  const { pathname } = useLocation();
  // getting the hub url from the env variables
  const hub_url = process.env.REACT_APP_URl_HUB;

  return (
    <div>
      <nav>
        <Link to='/'>Home</Link>
        <Link to='/about'>About</Link>
      </nav>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/about' element={<About />} />
      </Routes>
      {/* hide webvis instance when user leaves main page */}
      <div className={pathname === '/' ? 'viewer' : 'viewer --hidden'}>
        <Webvis
          webvisJS={hub_url ? hub_url : ''}
          onWebvisReady={handleWebvisReady}
        />
      </div>
    </div>
  );
}

export default App;
