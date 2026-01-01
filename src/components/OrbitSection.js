import { useEffect, useRef, useState } from "react";
import * as Spacekit from "spacekit.js";
import satellitesData from "../utils/countries_complete.json";

const OrbitSection = () => {
  const simRef = useRef(null);
  const [sim, setSim] = useState(null);
  const [filterCountry, setFilterCountry] = useState("All");
  const [showInactive, setShowInactive] = useState(true);

  useEffect(() => {
    if (!simRef.current) return;

    const simulation = new Spacekit.Simulation(simRef.current, {
      basePath: "/spacekit/",
      unitsPerAu: 0.745,
      maxNumParticles: 2 ** 16,
      camera: {
        initialPosition: [3, 2, 1],
        enableDrift: false,
      },
      startDate: new Date("2025-01-02T00:00:00Z"),
    });

    simulation.createSkybox(Spacekit.SkyboxPresets.NASA_TYCHO);

    // Ajouter la Terre
    simulation.createObject("earth", Spacekit.SpaceObjectPresets.EARTH, {
      textureUrl: "earth.jpg",
      radius: 4,
      showAtmosphere: true,
      debug: {
        showAxes: false,
        showGrid: true,
        showStats: true,
      },
      rotation: {
        enable: true,
        speed: 0.5,
      },
    });
    simulation.createObject("sun", Spacekit.SpaceObjectPresets.SUN);

    // Parcourir les satellites et les ajouter à la visualisation
    satellitesData.forEach((country) => {
      country.satellites_list?.forEach((sat) => {
        const [epoch, a, e, i, om, w, ma] = sat.orbit_param;
        simulation.createObject(sat.name, {
          ephem: new Spacekit.Ephem (
            {
              // Exemple TLE ou paramètres orbitaux
              epoch: epoch,
              a: a, // semi-major axis divided by 4000
              e: e,
              i: i,
              om: om, // Right ascension of ascending node
              w: w, // Arg of periapsis,
              ma: ma, // mean_anomaly,
              // epoch: "2025-01-02T00:00:00Z",
            },
            "deg"
          ),
          textureUrl: "satellite01.jpg",
          scale: [0.5, 0.5, 0.5], // Échelle du satellite
          orbitPathSettings: {
            leadDurationYears: 0.2,
            trailDurationYears: 0.2,
            numberSamplePoints: 120,
          },
          hideOrbit: false,
          theme: {
            orbitColor: "#ffffff", // Couleur de l'orbite
            color: "blue", // Couleur du satellite
          },
          labelText: sat.name,
          labelColor: sat.status === "Active" ? "green" : "red",
        });
      });
    });

    setSim(simulation);
  }, []);

  // Fonctions de contrôle
  const handlePlay = () => sim?.start();
  const handlePause = () => sim?.stop();
  const handleReset = () => sim?.setDate(new Date("2025-01-02T00:00:00Z"));

  return (
    <div className="relative w-screen h-screen">
      {/* Simulation */}
      {/* <canvas ref={simRef} className="absolute inset-0" /> */}
      {/* <div ref={simRef} className="absolute inset-0"/> */}

      {/* UI Controls */}
      <div className="absolute top-4 left-4 bg-white/80  font-sans p-4 rounded-md shadow">
        <h3 className="font-bold mb-2">Controls</h3>
        <div className="flex gap-2 mb-2 font-medium">
          <button
            onClick={handlePlay}
            className="px-3 py-1 bg-green-500 text-white rounded"
          >
            Play
          </button>
          <button
            onClick={handlePause}
            className="px-3 py-1 bg-[#082F91] text-white rounded"
          >
            Stop
          </button>
          <button
            onClick={handleReset}
            className="px-2 py-1 bg-[#D64045] text-white rounded"
          >
            Speed Up
          </button>
          <button
            onClick={handleReset}
            className="px-2 py-1 bg-[#D64045] text-white rounded"
          >
            Slow
          </button>
          <button
            onClick={handleReset}
            className="px-2 py-1 bg-blue-600 text-white rounded"
          >
            Reset
          </button>
        </div>

        {/* Filters */}
        <div className="mb-2">
          <label>
            Remove Inactive            
            <input
              type="checkbox"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
              className="ml-2 size-4"
            />
          </label>
        </div>
        <div>
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="border rounded p-1"
          >
            <option value="All">All Countries</option>
            {satellitesData.map((c) => (
              <option key={c.country} value={c.country}>
                {c.country}
              </option>
            ))}
          </select>
        </div>
      </div>
      {/* </div> */}
      </div>
  );
};

export default OrbitSection;
