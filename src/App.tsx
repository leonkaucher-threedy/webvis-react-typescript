import { Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

import Webvis from './Webvis';
import './App.css';
import AddModelButton from './AddModelButton';
import { useState } from 'react';

export default function App(): JSX.Element {
  const hub_url = process.env.REACT_APP_URL_HUB;
  const { pathname } = useLocation();
  const [context, setContext] = useState<webvis.ContextAPI | undefined>(undefined);

  const handleWebvisReady = (ctx: webvis.ContextAPI) => {
    console.log('webvis context ready');
    setContext(ctx);
  };

  const handleWebvisError = (error: string) => {
    alert(`Initializing webvis failed due to '${error}'`);
  };

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
          contextName="myContext"
          onWebvisReady={handleWebvisReady}
          onWebvisError={handleWebvisError}
        />

        <div className='overlay-button'>
          {context? <AddModelButton label='Engine' modelURI='urn:x-i3d:examples:x3d:v8' context={context} /> : null}
        </div>

      </div>
    </>
  );
}
