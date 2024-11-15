import React from 'react';
import { Bar } from 'react-chartjs-2';

const SatelliteLaunchesChart = ({ data }) => {
  // Préparez les données des lancements par année
  const yearLaunches = data.reduce((acc, country) => {
    // Assurez-vous que satellites_list existe avant de parcourir
    if (country.satellites_list) {
      country.satellites_list.forEach(launch => {
        const launchYear = new Date(launch.launch_date).getFullYear(); // Extraire l'année de lancement
        acc[launchYear] = (acc[launchYear] || 0) + 1;
      });
    }
    return acc;
  }, {});

  // Structurez les données pour le graphique
  const chartData = {
    labels: Object.keys(yearLaunches),
    datasets: [{
      label: 'Number of launches',
      data: Object.values(yearLaunches),
      backgroundColor: 'rgba(75, 192, 192, 0.6)',
    }]
  };

  return (
    <div className='font-bold w-full h-full flex flex-col items-center justify-center p-[5px]'>
      <h3>Satellites lunch per year</h3>
      <Bar 
      data={chartData}
      options={{
          responsive: true,
          maintainAspectRatio: true,
        }}
      />
    </div>
  );
};

export default SatelliteLaunchesChart;