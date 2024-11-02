import React, { useRef } from 'react';
import LandingSection from "./components/LandingSection";
import MapSection from "./components/MapSection";
import Footer from './components/Footer';
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
    <LandingSection/>
    <Footer/>

    </div>
  );
}

export default App;
