import React from 'react';
import { Bar } from 'react-chartjs-2';

const LaunchDateVsAgencyCreationChart = ({ data }) => {
  const chartData = {
    labels: [], 
    datasets: [
      {
        label: 'Years from Agency Creation and First Launch',
        data: [], 
        backgroundColor: '#D64045',
      },
    ],
  };

  data.forEach((country) => {
    const agencyCreationYear = parseInt(country.space_agency?.creation_date, 10); 
    const firstLaunchYear = parseInt(country.first_launch_year, 10); 

    if (!isNaN(agencyCreationYear) && !isNaN(firstLaunchYear)) {
      const yearsDifference = firstLaunchYear - agencyCreationYear;

      if (yearsDifference >= 0) {
        chartData.labels.push(country.country); 
        chartData.datasets[0].data.push(yearsDifference); 
      }
    }
  });

  return (
    <div className="font-bold w-full h-full flex flex-col items-center justify-center">
      <h3>Years Between Agency Creation and First Launch</h3>
      <div>
        <Bar
          data={chartData}
          options={{
            responsive: true,
            maintainAspectRatio: true,
            scales: {
              y: {
                beginAtZero: true,
                title: {
                  display: true,
                  text: 'Years',
                },
              },
              x: {
                title: {
                  display: true,
                  text: 'Countries',
                },
              },
            },
          }}
        />
      </div>
    </div>
  );
};

export default LaunchDateVsAgencyCreationChart;
