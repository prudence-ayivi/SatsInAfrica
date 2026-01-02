import { useEffect, useRef, useState } from "react";
import * as Spacekit from "spacekit.js";
import satellitesData from "../utils/countries_complete.json";

const OrbitSimulation = () => {
  const simRef = useRef(null);
  const [sim, setSim] = useState(null);
  const [filterCountry, setFilterCountry] = useState("All");
  const [showInactive, setShowInactive] = useState(true);

  useEffect(() => {
    if (!simRef.current) return;

    const simulation = new Spacekit.Simulation(simRef.current, {
      basePath: "https://typpo.github.io/spacekit/src/",
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
    simulation.createSphere("Earth", {
      textureUrl: "../spacekit/earth.jpg",
      radius: 1, // Ajustez selon vos besoins
      debug: {
        showAxes: false,
      },
      rotation: {
        enable: true,
        speed: 0.5,
      },
    });

    satellitesData.forEach((country) => {
       country.satellites_list?.forEach((sat) => {
        try {
          // CORRECTION CRITIQUE : Vérifier que orbit_param existe et est un tableau
          if (!sat.orbit_param || !Array.isArray(sat.orbit_param) || sat.orbit_param.length < 7) {
            return;
          }
          const [epoch, a, e, i, om, w, ma] = sat.orbit_param;
          // Vérifier que les valeurs sont valides
          if (epoch === undefined || a === undefined || e === undefined) {
            return;
          }

          simulation.createObject(sat.name, {
            ephem: new Spacekit.Ephem(
              {
                epoch: epoch,
                a: a, // semi-major axis
                e: e,
                i: i,
                om: om, // Right ascension of ascending node
                w: w, // Arg of periapsis
                ma: ma, // mean anomaly
              },
              "deg"
            ),
            // particleSize: 2,
            scale: [0.5, 0.5, 0.5],
            orbitPathSettings: {
              leadDurationYears: 0.2,
              trailDurationYears: 0.2,
              numberSamplePoints: 120,
            },
            hideOrbit: false,
            theme: {
              orbitColor: sat.status === "Active" ? 0x00ff00 : 0xff0000,
              color: "blue",
            },
            labelText: sat.name,
          });

        } catch (satError) {
          console.error(`Error adding satellite ${sat.name}:`, satError);
        }
      });
    });

    setSim(simulation);
  }, []);

  // Fonctions de contrôle
  const handlePlay = () => {
    if (sim) {
      sim.start();
    }
  };

  const handlePause = () => {
    if (sim) {
      sim.stop();
    }
  };

  const handleReset = () => {
    if (sim) {
      sim.setDate(new Date("2025-01-02T00:00:00Z"));
    }
  };

  const handleSpeedUp = () => {
    if (sim) {
      const currentRate = sim.getJdPerSecond?.() || 100;
      sim.setJdPerSecond?.(currentRate * 2);
    }
  };

  const handleSlowDown = () => {
    if (sim) {
      const currentRate = sim.getJdPerSecond?.() || 100;
      sim.setJdPerSecond?.(currentRate / 2);
    }
  };

  return (
    <div className="relative w-screen h-screen bg-black">
      {/* Simulation */}
      <div ref={simRef} className="absolute inset-0" />

      {/* UI Controls */}
      <div className="absolute top-4 left-4 bg-white/90 font-sans p-4 rounded-md shadow-lg">
        <h3 className="font-bold mb-2 text-lg">Orbit Controls</h3>
        <div className="flex flex-wrap gap-2 mb-3 font-medium">
          <button
            onClick={handlePlay}
            className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600 transition"
          >
            Play
          </button>
          <button
            onClick={handlePause}
            className="px-3 py-1 bg-[#082F91] text-white rounded hover:bg-blue-700 transition"
          >
            Pause
          </button>
          <button
            onClick={handleSpeedUp}
            className="px-2 py-1 bg-[#D64045] text-white rounded hover:bg-red-600 transition"
          >
            Speed Up
          </button>
          <button
            onClick={handleSlowDown}
            className="px-2 py-1 bg-[#D64045] text-white rounded hover:bg-red-600 transition"
          >
            Slow
          </button>
          <button
            onClick={handleReset}
            className="px-2 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            Reset
          </button>
        </div>

        {/* Filters */}
        <div className="mb-2">
          <label className="flex items-center gap-2">
          <span>Remove Inactive</span>
            <input
              type="checkbox"
              checked={showInactive}
              onChange={() => setShowInactive(!showInactive)}
              className="w-4 h-4"
            />            
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