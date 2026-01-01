import { useEffect, useRef, useState } from "react";
import * as Spacekit from "spacekit.js";
import satellitesData from "../utils/countries_complete.json";

const OrbitSimulation = () => {
  const containerRef = useRef(null);
  const [sim, setSim] = useState(null);
  const [filterCountry, setFilterCountry] = useState("All");
  const [showInactive, setShowInactive] = useState(true);
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    // Attendre que le conteneur soit monté
    if (!containerRef.current) return;

    // Petite pause pour s'assurer que le DOM est prêt
    const initTimer = setTimeout(() => {
      try {
        console.log("Initializing Spacekit...");
        console.log("Container:", containerRef.current);

        // OPTION 1 : Passer directement le conteneur div (Spacekit créera le canvas)
        const simulation = new Spacekit.Simulation(containerRef.current, {
          basePath: "https://typpo.github.io/spacekit/src/",
          unitsPerAu: 0.745,
          maxNumParticles: 2 ** 16,
          camera: {
            initialPosition: [3, 2, 1],
            enableDrift: false,
          },
          startDate: new Date("2025-01-02T00:00:00Z"),
        });

        console.log("Simulation created:", simulation);

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
            try {
              const [epoch, a, e, i, om, w, ma] = sat.orbit_param;
              simulation.createObject(sat.name, {
                ephem: new Spacekit.Ephem(
                  {
                    epoch: epoch,
                    a: a,
                    e: e,
                    i: i,
                    om: om,
                    w: w,
                    ma: ma,
                  },
                  "deg"
                ),
                textureUrl: "satellite01.jpg",
                scale: [0.5, 0.5, 0.5],
                orbitPathSettings: {
                  leadDurationYears: 0.2,
                  trailDurationYears: 0.2,
                  numberSamplePoints: 120,
                },
                hideOrbit: false,
                theme: {
                  orbitColor: "#ffffff",
                  color: "blue",
                },
                labelText: sat.name,
                labelColor: sat.status === "Active" ? "green" : "red",
              });
            } catch (satError) {
              console.error(`Error adding satellite ${sat.name}:`, satError);
            }
          });
        });

        setSim(simulation);
        setIsInitialized(true);
        console.log("Spacekit initialized successfully!");
      } catch (error) {
        console.error("Error initializing Spacekit:", error);
        console.error("Error stack:", error.stack);
      }
    }, 100);

    // Cleanup
    return () => {
      clearTimeout(initTimer);
      if (sim) {
        sim.stop?.();
      }
    };
  }, []);

  // Fonctions de contrôle
  const handlePlay = () => {
    if (sim) {
      sim.start();
      console.log("Simulation started");
    }
  };

  const handlePause = () => {
    if (sim) {
      sim.stop();
      console.log("Simulation stopped");
    }
  };

  const handleReset = () => {
    if (sim) {
      sim.setDate(new Date("2025-01-02T00:00:00Z"));
      console.log("Simulation reset");
    }
  };

  const handleSpeedUp = () => {
    if (sim) {
      const currentRate = sim.getJdPerSecond?.() || 1;
      sim.setJdPerSecond?.(currentRate * 2);
      console.log("Speed increased");
    }
  };

  const handleSlowDown = () => {
    if (sim) {
      const currentRate = sim.getJdPerSecond?.() || 1;
      sim.setJdPerSecond?.(currentRate / 2);
      console.log("Speed decreased");
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black">
      {/* Container pour Spacekit - Il créera son propre canvas dedans */}
      <div 
        ref={containerRef} 
        id="spacekit-container"
        className="absolute inset-0 w-full h-full"
        style={{ 
          width: '100%', 
          height: '100%',
          position: 'absolute',
          top: 0,
          left: 0
        }}
      />

      {/* Message de chargement */}
      {!isInitialized && (
        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-xl">Loading Spacekit...</div>
        </div>
      )}

      {/* UI Controls */}
      <div className="absolute top-4 left-4 bg-white/90 font-sans p-4 rounded-md shadow-lg z-10">
        <h3 className="font-bold mb-2 text-lg">Orbit Controls</h3>
        <div className="flex flex-wrap gap-2 mb-3 font-medium">
          <button
            onClick={handlePlay}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
            disabled={!isInitialized}
          >
            Play
          </button>
          <button
            onClick={handlePause}
            className="px-3 py-1 bg-[#082F91] text-white rounded hover:bg-blue-700 transition"
            disabled={!isInitialized}
          >
            Pause
          </button>
          <button
            onClick={handleSpeedUp}
            className="px-2 py-1 bg-[#D64045] text-white rounded hover:bg-red-600 transition"
            disabled={!isInitialized}
          >
            Speed Up
          </button>
          <button
            onClick={handleSlowDown}
            className="px-2 py-1 bg-[#D64045] text-white rounded hover:bg-red-600 transition"
            disabled={!isInitialized}
          >
            Slow
          </button>
          <button
            onClick={handleReset}
            className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            disabled={!isInitialized}
          >
            Reset
          </button>
        </div>

        {/* Filters */}
        <div className="mb-2">
          <label className="flex items-center gap-2">
            <input
              type="checkbox"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
              className="w-4 h-4"
            />
            <span>Show Inactive Satellites</span>
          </label>
        </div>
        <div>
          <label className="block mb-1 font-medium text-sm">Filter by Country:</label>
          <select
            value={filterCountry}
            onChange={(e) => setFilterCountry(e.target.value)}
            className="border rounded p-2 w-full"
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
    </div>
  );
};

export default OrbitSimulation;