import React from "react";
import { Bar } from "react-chartjs-2";

const OrbitDistributionBar = ({ data }) => {
  const orbitCount = {
    LEO: 0,
    MEO: 0,
    GEO: 0,
  };

  data.forEach((country) => {
    country.satellites_list.forEach((sat) => {
      if (orbitCount[sat.orbit_type] !== undefined) {
        orbitCount[sat.orbit_type] += 1;
      }
    });
  });

  const chartData = {
    labels: ["LEO", "MEO", "GEO"],
    datasets: [
      {
        label: "Number of Satellites",
        data: [
          orbitCount.LEO,
          orbitCount.MEO,
          orbitCount.GEO,
        ],
        backgroundColor: ["#2D5BD2", "#3A0CA3", "#859FE0"],
      },
    ],
  };

  return (
    <div className="font-bold w-full flex flex-col items-center justify-center">
      <h3>Satellite Distribution by Orbit Type</h3>
      <Bar
        data={chartData}
        options={{
          indexAxis: "y", // horizontal bar
          responsive: true,
          plugins: {
            legend: {
              display: false,
            },
          },
          scales: {
            x: {
              beginAtZero: true,
            },
          },
        }}
      />
    </div>
  );
};

export default OrbitDistributionBar;