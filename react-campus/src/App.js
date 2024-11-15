import './App.css';
import Header from './components/Header';
import Navigator from './components/Navigator';
import React, { useEffect, useState } from 'react';

function App() {
	const [route, setRoute] = useState("Home")

	useEffect(() => {
		console.log(route)
	}, [route]);

  	return (
		<div className="App">
			<Header selectedRoute={route} setSelectedRoute={setRoute}/>
			<Navigator selectedRoute={route} />
		</div>
  	);
}

export default App;
