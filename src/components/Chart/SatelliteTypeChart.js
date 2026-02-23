import React from "react";
import { Doughnut } from "react-chartjs-2";

const SatelliteTypeDonut = ({ data }) => {
  const typeCount = {
    Nanosat: 0,
    Microsat: 0,
    Minisat: 0,
    Mediumsat: 0,
    Largesat: 0,
    Unknown: 0,
  };

  data.forEach((country) => {
    if (!country.satellites_list) return;

    country.satellites_list.forEach((sat) => {
      if (!sat || !sat.satellite_type) {
        typeCount.Unknown += 1;
        return;
      }

      const type = sat.satellite_type.toLowerCase();

      if (type.includes("nano")) typeCount.Nanosat += 1;
      else if (type.includes("micro")) typeCount.Microsat += 1;
      else if (type.includes("mini")) typeCount.Minisat += 1;
      else if (type.includes("medium")) typeCount.Mediumsat += 1;
      else if (type.includes("large")) typeCount.Largesat += 1;
      else typeCount.Unknown += 1;
    });
  });
  
  const totalCount = typeCount.Nanosat + typeCount.Microsat + typeCount.Minisat + typeCount.Mediumsat + typeCount.Largesat + typeCount.Unknown;

  const chartData = {
    labels: Object.keys(typeCount),
    datasets: [
      {
        data: Object.values(typeCount),
        backgroundColor: [
          "#082F91",
          "#2D5BD2",
          "#859FE0",
          "#F7FF99",
          "#D64045",
          "#9E9E9E",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div className="font-bold w-full flex flex-col items-center justify-center">
      <h3>Satellite Size Distribution</h3>

      <div className="w-90">
        <Doughnut
          data={chartData}
          options={{
            responsive: true,
            plugins: {
              legend: {
                position: "bottom",
              },
              tooltip: {
                callbacks: {
                  label: (tooltipItem) => {                    
                    const value = tooltipItem.raw;
                    const percentage = ((value / totalCount) * 100).toFixed(2);
                    return `${tooltipItem.label}: ${value} (${percentage}%)`;
                  },
                },
              },
            },
          }}
        />
      </div>

      {/* LEGEND EXPLANATION */}
      <div className="text-sm font-thin mt-2 text-center mx-2">
        <p>
          <span>Nanosat (Cubesat) : 1–10 kg </span> |
          <span> Microsat: 10–100 kg </span> |
          <span> Minisat (SmallSats) : 100–500 kg </span> |
          <span> Mediumsat : 500–1000 kg </span> |
          <span> Largesat &gt; 1000 kg </span>
        </p>
      </div>
    </div>
  );
};

export default SatelliteTypeDonut;
