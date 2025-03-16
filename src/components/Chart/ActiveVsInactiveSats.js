import React from 'react'
import { Pie } from 'react-chartjs-2';


const ActiveVsInactiveSats = ({data}) => {
    const satelliteStatus = {
        Active: 0,
        Inactive: 0,
      };
    
      // Parcourir la liste des satellites pour compter les actifs et inactifs
      data.forEach((sat) => {
        if (sat.status === 'Active') {
          satelliteStatus.Active += 1;
        } else if (sat.status === 'Inactive') {
          satelliteStatus.Inactive += 1;
        }
      });

      const totalSatellites = satelliteStatus.Active + satelliteStatus.Inactive;
    
      // Configuration des données pour le graphique
      const chartData = {
        labels: ['Active Satellites', 'Inactive Satellites'],
        datasets: [
          {
            label: 'Satellites Status',
            data: [satelliteStatus.Active, satelliteStatus.Inactive],
            backgroundColor: ['#082F91', '#F7FF99'], 
            borderWidth: 1,
          },
        ],
      };

    const chartOptions = {
    responsive: true,
    maintainAspectRatio: true,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            const count = tooltipItem.raw; // Nombre de satellites
            const percentage = ((count / totalSatellites) * 100).toFixed(2); // Pourcentage
            return `${tooltipItem.label}: ${count} (${percentage}%)`;
          },
        },
      },
    },
      }
    
    
  return (
    <div className="font-bold w-full h-full flex flex-col items-center justify-center">
    <h3>Active vs Inactive Satellites</h3>
    <div>
      <Pie
        data={chartData}
        options={chartOptions}
      />
    </div>
  </div>
  )
}

export default ActiveVsInactiveSats