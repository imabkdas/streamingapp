import React from 'react';
import './App.css';
import WebSocketClient from './components/WebSocketClient.tsx';
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom';
import LandingPage from './components/LandingPage.tsx';

function App() {

	
	return (
		<Router>
			<Routes>
				<Route path='/' element={<LandingPage />} />
				<Route path='/chat' element={<WebSocketClient />} />
			</Routes>
		</Router>
	);
}

export default App;
