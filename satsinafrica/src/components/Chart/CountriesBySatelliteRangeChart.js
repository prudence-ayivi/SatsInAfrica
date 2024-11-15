import React from 'react';
import { Pie } from 'react-chartjs-2';

const CountriesBySatelliteRangeChart = ({ data }) => {
  // Définition des plages en fonction de `satelliteColorScale`
  const ranges = {
    "1": 0,
    "2-3": 0,
    "4-5": 0,
    "6-8": 0,
    "9-10": 0,
    "11-20": 0,
  };

  // Calcul du nombre de pays dans chaque intervalle
  data.forEach(country => {
    const sats = country.satellites;
    if (sats === 1) ranges["1"] += 1;
    else if (sats >= 2 && sats <= 3) ranges["2-3"] += 1;
    else if (sats >= 4 && sats <= 5) ranges["4-5"] += 1;
    else if (sats >= 6 && sats <= 8) ranges["6-8"] += 1;
    else if (sats >= 9 && sats <= 10) ranges["9-10"] += 1;
    else if (sats >= 11 && sats <= 20) ranges["11-20"] += 1;
  });

  // Données du graphique avec couleurs de `satelliteColorScale`
  const chartData = {
    labels: Object.keys(ranges),
    datasets: [{
      label: 'Countries by number of satellites',
      data: Object.values(ranges),
      backgroundColor: [
        '#D7DFF2',
        '#B0C0E8',
        '#859FE0',
        '#2D5BD2',
        '#1F47AD',
        '#082F91',
      ],
    }]
  };

  return (
    <div className="font-bold w-full h-full flex flex-col items-center justify-center">
      <h3>Countries by number of satellites</h3>
      <div>
        <Pie
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
          }}
        />
      </div>
    </div>
  );
};

export default CountriesBySatelliteRangeChart;
