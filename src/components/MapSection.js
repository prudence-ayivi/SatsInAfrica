import React from 'react';
import Sidebar from "./Sidebar";
import Map from './Map/Map';

const MapSection = React.forwardRef((props, ref) => {
  return (
    <div id="map-section" className='flex flex-row bg-sky-300'> 
    <Sidebar/>
    <Map/>
    </div>
  );
});

export default MapSection;