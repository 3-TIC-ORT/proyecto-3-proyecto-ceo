import './App.css';
import Header from './components/Header';
import Navigator from './components/Navigator';
import React, { useEffect, useState } from 'react';
import { LoginPopup } from './components/Utilities/Login-popup';


import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';

import { Worker } from '@react-pdf-viewer/core';


function App() {
	const [route, setRoute] = useState("Home")
	const [logged, setLogged] = useState(false)
	const [error, setError] = useState(false)

	const popupStyle = {
		width: '37.5vw',
		height: '50vh',
		backgroundColor: 'white',
		borderRadius: '20px',
		boxShadow: '0px 2px 3px rgba(0, 0, 0, 0.3)',
		opacity: logged ? '0' : '1',
		pointerEvents: logged ? 'none' : 'all'
	}	

  	return (
		<Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.js">
			<div className="App">
				<Header selectedRoute={route} setSelectedRoute={setRoute}/>
				<Navigator selectedRoute={route} setSelectedRoute={setRoute} setLogged={setLogged} logged={logged} />
				<LoginPopup show={popupStyle} setLogged={setLogged} setError={setError}/>
			</div>
		</Worker>
  	);
}

export default App;
