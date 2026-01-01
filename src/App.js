import React from 'react';
import LandingSection from "./components/LandingSection";
import MapSection from "./components/MapSection";
import OrbitSimTest from './components/OrbitSimTest';
import Footer from './components/Footer'; 
import ChartSection from './components/ChartSection'
import './App.css';

function App() {
  
  return (
    <div className="App"> 
    <LandingSection/>
    <MapSection/>
    <ChartSection/>
    <OrbitSimTest/>
    <Footer/>
    </div>
  );
}

export default App;
