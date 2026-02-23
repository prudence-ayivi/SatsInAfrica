import React from 'react';
import LandingSection from "./components/LandingSection";
import MapSection from "./components/MapSection";
import OrbitSimulation from './components/OrbitSimulation';
import Footer from './components/Footer'; 
import ChartSection from './components/ChartSection'
import './App.css';
import { Analytics } from "@vercel/analytics/react"


function App() {
  
  return (
    <div className="App"> 
    <Analytics/>
    <LandingSection/>
    <MapSection/>
    <ChartSection/>
    <OrbitSimulation/>
    <Footer/>
    </div>
  );
}

export default App;
