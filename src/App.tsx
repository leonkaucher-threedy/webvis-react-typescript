import { Routes, Route, Link, useLocation } from 'react-router-dom';

import Home from './pages/Home';
import About from './pages/About';

import Webvis from './Webvis';
import './App.css';
import AddModelButton from './AddModelButton';
import { useState } from 'react';

function App(): JSX.Element {
  const hub_url = process.env.REACT_APP_URL_HUB;
  const { pathname } = useLocation();
  const [context, setContext] = useState<webvis.ContextAPI | undefined>(undefined);

  const handleWebvisReady = (ctx: webvis.ContextAPI) => {
    console.log('webvis context ready');
    setContext(ctx);
  };

  let button: JSX.Element;
  if (context) {
    button = <AddModelButton label='Engine' modelURI='urn:x-i3d:examples:x3d:v8' context={context} />;
  } else {
    button = <div></div>;
  }

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
        />

        <div className='overlayButton'>
          {button}
        </div>

      </div>
    </>
  );
}

export default App;
