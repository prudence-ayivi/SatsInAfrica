import React, { useState, useEffect, memo } from "react";
import { MapData } from "../../utils/MapData";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import countryData from "../../utils/countries_complete.json";
import TooltipContent from "./TooltipContent";
import { Tooltip as ReactTooltip } from "react-tooltip";

// Color scale per satellites range
const satelliteColorScale = [
  { range: [1, 1], color: "#D7DFF2" },
  { range: [2, 3], color: "#B0C0E8" },
  { range: [4, 5], color: "#859FE0" },
  { range: [6, 8], color: "#2D5BD2" },
  { range: [8, 10], color: "#1F47AD" },
  { range: [10, 20], color: "#082F91" },
];

const projectInProgressColor = "#F7FF99";

const getCountryColor = (country) => {
  const hasProjectInProgress =
    country.satellites === 0 &&
    country.space_projects?.some((project) => project.status === "In progress");

  if (hasProjectInProgress) {
    return projectInProgressColor;
  } else {
    const satelliteCount = country.satellites_list.length || 0;
    for (let scale of satelliteColorScale) {
      if (
        satelliteCount >= scale.range[0] &&
        satelliteCount <= scale.range[1]
      ) {
        return scale.color;
      }
    }
  }
  return "#F0F8F6";
};

const Map = () => {
  const [tooltipContent, setTooltipContent] = useState(null);
  const [mapConfig, setMapConfig] = useState({
    scale: 240,
    width: 700,
    height: 290,
  });

  // Adjust scale for screen size
  useEffect(() => {
    const handleResize = () => {
      const screenWidth = window.innerWidth;

      if (screenWidth < 640) {
        // Mobile
        setMapConfig({
          scale: 210,
          width: 320,
          height: 220,
        });
      } else if (screenWidth < 1024) {
        // Tablet
        setMapConfig({
          scale: 320,
          width: 500,
          height: 250,
        });
      } else {
        // Desktop
        setMapConfig({
          scale: 240,
          width: 700,
          height: 290,
        });
      }
    };

    window.addEventListener("resize", handleResize);

    handleResize();

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <>
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: mapConfig.scale,
          center: [10, 2],
        }}
        width={mapConfig.width}
        height={mapConfig.height}
        data-tip=""
        onMouseLeave={() => setTooltipContent(null)}
      >
        <Geographies geography={MapData.data}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const country = countryData.find(
                (c) => c.country === geo.properties.name
              );
              const color = country ? getCountryColor(country) : "#F0F8F6";

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  stroke="black"
                  strokeWidth={0.2}
                  onMouseEnter={() => setTooltipContent(country)}
                  style={{
                    default: { fill: color },
                    hover: { fill: color },
                    pressed: { fill: color },
                  }}
                  data-tooltip-id="map-tooltip"
                />
              );
            })
          }
        </Geographies>
      </ComposableMap>

      {tooltipContent && (
        <ReactTooltip
          id="map-tooltip"
          place="top"
          effect="solid"
          style={{ backgroundColor: "#FFFAD9" }}
        >
          <TooltipContent country={tooltipContent} />
        </ReactTooltip>
      )}
    </>
  );
};

export default memo(Map);
