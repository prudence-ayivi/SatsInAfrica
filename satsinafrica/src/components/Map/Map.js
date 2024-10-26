import React from 'react'
import MapData from '../../utils/MapData' 
import { ComposableMap, Geographies, Geography } from 'react-simple-maps';


const Map = () => {
  return (
    <ComposableMap
      projection='geoMercator'
      projectionConfig={{
        scale: 350,
        center: [0, -10],
      }}
      fill='#F0F8F6'
      stroke='black'
      strokeWidth={1} 
    >
      <Geographies geography={MapData.data}>
        {(geographies) => {
          return geographies.geographies.map((geo) => {
            return <Geography key={geo.rsmKey} geography={geo} />;
          });
        }}
      </Geographies>
    </ComposableMap>
  )
}

export default Map