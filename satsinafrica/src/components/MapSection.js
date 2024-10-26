import React from 'react';
import Sidebar from "./Sidebar";
import Map from './Map/Map';

const MapSection = React.forwardRef((props, ref) => {
  return (
    <div className='flex flex-row bg-sky-300 w-full overflow-y-auto'> 
    <Sidebar/>
    <Map/>
    </div>
  );
});

export default MapSection;