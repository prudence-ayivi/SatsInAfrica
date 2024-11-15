import React, { useRef } from 'react';
import LandingSection from "./components/LandingSection";
import MapSection from "./components/MapSection";
import Footer from './components/Footer'; 
import ChartSection from './components/ChartSection'
import './App.css';

function App() {
  const mapSectionRef = useRef(null);

  const scrollToMapSection = () => {
    if (mapSectionRef.current) {
      mapSectionRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  };


  return (
    <div className="App"> 
    <LandingSection scrollToMapSection={scrollToMapSection} />
    <MapSection ref={mapSectionRef} />
    <ChartSection/>
    <Footer/>

    </div>
  );
}

export default App;
